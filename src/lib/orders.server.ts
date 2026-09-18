import { packages } from "@/data/site";
import { createLead, updateLead } from "@/lib/contact.server";
import {
  getPackageOrderModel,
  type PackageOrder,
  type PackageOrderStatus,
} from "@/lib/models/package-order.server";
import { getRazorpayClient, getRazorpayKeyId } from "@/lib/razorpay.server";

export type PackageOrderRecord = {
  id: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  state: string;
  pincode: string;
  packageName: string;
  amountPaise: number;
  currency: string;
  status: PackageOrderStatus;
  razorpayOrderId?: string | undefined;
  razorpayPaymentId?: string | undefined;
  razorpaySignature?: string | undefined;
  contactLeadId?: string | undefined;
  pageUrl?: string | undefined;
  utmSource?: string | undefined;
  utmMedium?: string | undefined;
  utmCampaign?: string | undefined;
  createdAt: string;
  updatedAt: string;
};

type CheckoutCustomerInput = {
  packageName: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  state: string;
  pincode: string;
  pageUrl?: string | undefined;
  utmSource?: string | undefined;
  utmMedium?: string | undefined;
  utmCampaign?: string | undefined;
};

const EDITABLE_STATUSES: PackageOrderStatus[] = ["created", "pending", "failed"];

export function getPackageAmountPaise(packageName: string): number {
  const pkg = packages.find((item) => item.name === packageName);
  if (!pkg?.amountInr) {
    throw new Error(`Unknown package: ${packageName}`);
  }
  return pkg.amountInr * 100;
}

function toRecord(row: PackageOrder): PackageOrderRecord {
  return {
    id: row.id,
    name: row.name,
    phone: row.phone,
    email: row.email,
    city: row.city,
    state: row.state,
    pincode: row.pincode,
    packageName: row.packageName,
    amountPaise: row.amountPaise,
    currency: row.currency,
    status: row.status,
    razorpayOrderId: row.razorpayOrderId ?? undefined,
    razorpayPaymentId: row.razorpayPaymentId ?? undefined,
    razorpaySignature: row.razorpaySignature ?? undefined,
    contactLeadId: row.contactLeadId ?? undefined,
    pageUrl: row.pageUrl ?? undefined,
    utmSource: row.utmSource ?? undefined,
    utmMedium: row.utmMedium ?? undefined,
    utmCampaign: row.utmCampaign ?? undefined,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

function buildLeadMessage(input: {
  packageName: string;
  orderId: string;
  amountPaise: number;
  city: string;
  state: string;
  pincode: string;
  leadStatus: string;
  razorpayOrderId?: string | undefined;
  pageUrl?: string | undefined;
  utmSource?: string | undefined;
  utmMedium?: string | undefined;
  utmCampaign?: string | undefined;
}) {
  return [
    "Package Checkout",
    `Package: ${input.packageName}`,
    `Order ID: ${input.orderId}`,
    input.razorpayOrderId ? `Razorpay Order: ${input.razorpayOrderId}` : null,
    `Amount (paise): ${input.amountPaise}`,
    `City: ${input.city}`,
    `State: ${input.state}`,
    `Pincode: ${input.pincode}`,
    `Lead Status: ${input.leadStatus}`,
    "Source: Package Checkout",
    `Page URL: ${input.pageUrl || "Not captured"}`,
    `UTM Source: ${input.utmSource || "Not captured"}`,
    `UTM Medium: ${input.utmMedium || "Not captured"}`,
    `UTM Campaign: ${input.utmCampaign || "Not captured"}`,
  ]
    .filter(Boolean)
    .join("\n");
}

async function syncLeadForOrder(row: PackageOrder, leadStatus: string): Promise<void> {
  if (!row.contactLeadId) return;

  await updateLead(row.contactLeadId, {
    name: row.name,
    phone: row.phone,
    email: row.email,
    post: "Package Query",
    source: "Package Form",
    state: row.state,
    city: row.city,
    message: buildLeadMessage({
      packageName: row.packageName,
      orderId: row.id,
      amountPaise: row.amountPaise,
      city: row.city,
      state: row.state,
      pincode: row.pincode,
      leadStatus,
      razorpayOrderId: row.razorpayOrderId ?? undefined,
      pageUrl: row.pageUrl ?? undefined,
      utmSource: row.utmSource ?? undefined,
      utmMedium: row.utmMedium ?? undefined,
      utmCampaign: row.utmCampaign ?? undefined,
    }),
  });
}

export async function saveCheckoutDraft(
  input: CheckoutCustomerInput & { orderId?: string | undefined },
): Promise<{
  order: PackageOrderRecord;
  amount: number;
  currency: string;
}> {
  const amountPaise = getPackageAmountPaise(input.packageName);
  const Model = await getPackageOrderModel();

  if (input.orderId) {
    const row = await Model.findByPk(input.orderId);
    if (!row) {
      throw new Error("Order not found");
    }
    if (row.status === "paid") {
      throw new Error("Paid order cannot be edited");
    }
    if (!EDITABLE_STATUSES.includes(row.status)) {
      throw new Error(`Order status ${row.status} cannot be edited`);
    }

    row.name = input.name;
    row.phone = input.phone;
    row.email = input.email;
    row.city = input.city;
    row.state = input.state;
    row.pincode = input.pincode;
    row.packageName = input.packageName;
    row.amountPaise = amountPaise;
    row.pageUrl = input.pageUrl || null;
    row.utmSource = input.utmSource || null;
    row.utmMedium = input.utmMedium || null;
    row.utmCampaign = input.utmCampaign || null;
    await row.save();

    await syncLeadForOrder(row, "AWAITING_PAYMENT");

    return {
      order: toRecord(row),
      amount: amountPaise,
      currency: row.currency || "INR",
    };
  }

  const row = await Model.create({
    name: input.name,
    phone: input.phone,
    email: input.email,
    city: input.city,
    state: input.state,
    pincode: input.pincode,
    packageName: input.packageName,
    amountPaise,
    currency: "INR",
    status: "created",
    pageUrl: input.pageUrl || null,
    utmSource: input.utmSource || null,
    utmMedium: input.utmMedium || null,
    utmCampaign: input.utmCampaign || null,
  });

  const lead = await createLead({
    name: input.name,
    phone: input.phone,
    email: input.email,
    post: "Package Query",
    source: "Package Form",
    state: input.state,
    city: input.city,
    message: buildLeadMessage({
      packageName: input.packageName,
      orderId: row.id,
      amountPaise,
      city: input.city,
      state: input.state,
      pincode: input.pincode,
      leadStatus: "AWAITING_PAYMENT",
      pageUrl: input.pageUrl,
      utmSource: input.utmSource,
      utmMedium: input.utmMedium,
      utmCampaign: input.utmCampaign,
    }),
  });

  row.contactLeadId = lead.id;
  await row.save();

  return {
    order: toRecord(row),
    amount: amountPaise,
    currency: "INR",
  };
}

export async function startCheckoutPayment(orderId: string): Promise<{
  order: PackageOrderRecord;
  razorpayOrderId: string;
  amount: number;
  currency: string;
  keyId: string;
}> {
  const Model = await getPackageOrderModel();
  const row = await Model.findByPk(orderId);
  if (!row) {
    throw new Error("Order not found");
  }
  if (row.status === "paid") {
    throw new Error("Order is already paid");
  }

  const amountPaise = row.amountPaise;
  const razorpay = getRazorpayClient();
  const razorpayOrder = await razorpay.orders.create({
    amount: amountPaise,
    currency: row.currency || "INR",
    receipt: row.id.replace(/-/g, "").slice(0, 40),
    notes: {
      packageName: row.packageName,
      orderId: row.id,
      customerName: row.name,
      customerEmail: row.email,
      customerPhone: row.phone,
    },
  });

  row.razorpayOrderId = razorpayOrder.id;
  row.status = "pending";
  await row.save();

  await syncLeadForOrder(row, "PAYMENT_PENDING");

  return {
    order: toRecord(row),
    razorpayOrderId: razorpayOrder.id,
    amount: amountPaise,
    currency: row.currency || "INR",
    keyId: getRazorpayKeyId(),
  };
}

export async function findOrderById(id: string): Promise<PackageOrderRecord | null> {
  const Model = await getPackageOrderModel();
  const row = await Model.findByPk(id);
  return row ? toRecord(row) : null;
}

export async function findOrderByRazorpayOrderId(
  razorpayOrderId: string,
): Promise<PackageOrderRecord | null> {
  const Model = await getPackageOrderModel();
  const row = await Model.findOne({ where: { razorpayOrderId } });
  return row ? toRecord(row) : null;
}

export async function markOrderPaid(input: {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature?: string | undefined;
}): Promise<PackageOrderRecord> {
  const Model = await getPackageOrderModel();
  const row = await Model.findOne({ where: { razorpayOrderId: input.razorpayOrderId } });
  if (!row) {
    throw new Error(`Order not found for Razorpay order ${input.razorpayOrderId}`);
  }

  if (row.status === "paid") {
    return toRecord(row);
  }

  row.status = "paid";
  row.razorpayPaymentId = input.razorpayPaymentId;
  if (input.razorpaySignature) {
    row.razorpaySignature = input.razorpaySignature;
  }
  await row.save();
  await syncLeadForOrder(row, "PAID");
  return toRecord(row);
}

export async function markOrderFailed(input: {
  razorpayOrderId: string;
  razorpayPaymentId?: string | undefined;
}): Promise<PackageOrderRecord> {
  const Model = await getPackageOrderModel();
  const row = await Model.findOne({ where: { razorpayOrderId: input.razorpayOrderId } });
  if (!row) {
    throw new Error(`Order not found for Razorpay order ${input.razorpayOrderId}`);
  }

  if (row.status === "paid") {
    return toRecord(row);
  }

  row.status = "failed";
  if (input.razorpayPaymentId) {
    row.razorpayPaymentId = input.razorpayPaymentId;
  }
  await row.save();
  await syncLeadForOrder(row, "PAYMENT_FAILED");
  return toRecord(row);
}

export async function listPackageOrders(limit = 50): Promise<PackageOrderRecord[]> {
  const Model = await getPackageOrderModel();
  const rows = await Model.findAll({
    order: [["created_at", "DESC"]],
    limit,
  });
  return rows.map(toRecord);
}
