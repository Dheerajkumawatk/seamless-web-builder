import { NextResponse } from "next/server";
import { z } from "zod";
import { saveCheckoutDraft } from "@/lib/orders.server";

const draftSchema = z.object({
  orderId: z.string().uuid().optional(),
  packageName: z.string().min(1).max(120),
  name: z.string().min(2).max(80),
  phone: z.string().min(8).max(20),
  email: z.string().email().max(120),
  city: z.string().min(2).max(80),
  state: z.string().min(2).max(80),
  pincode: z.string().min(4).max(12),
  pageUrl: z.string().max(500).optional().or(z.literal("")),
  utmSource: z.string().max(80).optional().or(z.literal("")),
  utmMedium: z.string().max(80).optional().or(z.literal("")),
  utmCampaign: z.string().max(120).optional().or(z.literal("")),
});

export async function POST(request: Request) {
  try {
    const data = draftSchema.parse(await request.json());
    const result = await saveCheckoutDraft({
      orderId: data.orderId,
      packageName: data.packageName,
      name: data.name,
      phone: data.phone,
      email: data.email,
      city: data.city,
      state: data.state,
      pincode: data.pincode,
      pageUrl: data.pageUrl || undefined,
      utmSource: data.utmSource || undefined,
      utmMedium: data.utmMedium || undefined,
      utmCampaign: data.utmCampaign || undefined,
    });

    return NextResponse.json({
      ok: true,
      orderId: result.order.id,
      amount: result.amount,
      currency: result.currency,
      packageName: result.order.packageName,
      status: result.order.status,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Draft save failed";
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }
}
