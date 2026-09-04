import { NextResponse } from "next/server";
import { z } from "zod";
import { isAdminRequest } from "@/lib/admin-auth";
import { listLeads, updateLead } from "@/lib/contact.server";
import { listPlanQueries, updatePlanQuery } from "@/lib/plan-query.server";
import { listVikasMitraProfiles, updateVikasMitraProfile } from "@/lib/vikas-mitra.server";
import { buildVikasMitraApprovalEmail, sendEmail } from "@/lib/email.server";

const vikasSchema = z.object({
  type: z.literal("vikas"),
  id: z.string().uuid(),
  notify: z.boolean().optional(),
  data: z.object({
    name: z.string().min(2).max(80).optional(),
    phone: z.string().min(8).max(20).optional(),
    email: z.string().email().max(120).optional().or(z.literal("")),
    district: z.string().min(2).max(80).optional(),
    tehsil: z.string().min(2).max(80).optional(),
    village: z.string().min(2).max(80).optional(),
    occupation: z.string().max(100).optional().or(z.literal("")),
    experience: z.string().max(60).optional().or(z.literal("")),
    message: z.string().max(1000).optional().or(z.literal("")),
    photo: z.string().max(2_500_000).optional().or(z.literal("")),
    panCard: z.string().max(2_500_000).optional().or(z.literal("")),
    aadhaarCard: z.string().max(2_500_000).optional().or(z.literal("")),
    status: z.enum(["pending", "approved", "rejected"]).optional(),
    rejectionMessage: z.string().max(500).optional().or(z.literal("")),
  }),
});

const leadSchema = z.object({
  type: z.literal("contact"),
  id: z.string().uuid(),
  data: z.object({
    name: z.string().min(2).max(80).optional(),
    phone: z.string().min(8).max(20).optional(),
    email: z.string().email().max(120).optional().or(z.literal("")),
    post: z.string().min(1).max(60).optional(),
    state: z.string().max(60).optional().or(z.literal("")),
    city: z.string().max(80).optional().or(z.literal("")),
    message: z.string().max(1000).optional().or(z.literal("")),
  }),
});

const planSchema = z.object({
  type: z.literal("plan"),
  id: z.string().uuid(),
  data: z.object({
    packageName: z.string().min(1).max(120).optional(),
    name: z.string().min(2).max(80).optional(),
    phone: z.string().min(8).max(20).optional(),
    email: z.string().email().max(120).optional(),
    city: z.string().min(2).max(80).optional(),
    state: z.string().min(2).max(80).optional(),
    pincode: z.string().min(4).max(12).optional(),
  }),
});

const updateSchema = z.discriminatedUnion("type", [vikasSchema, leadSchema, planSchema]);

export async function GET(request: Request) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [vikas, contacts, plans] = await Promise.all([
    listVikasMitraProfiles(),
    listLeads(),
    listPlanQueries(),
  ]);

  return NextResponse.json({ vikas, contacts, plans });
}

export async function PATCH(request: Request) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = updateSchema.parse(await request.json());

  if (body.type === "vikas") {
    const row = await updateVikasMitraProfile(body.id, body.data);

    let email:
      { sent: boolean; skipped?: boolean | undefined; error?: string | undefined } | undefined;
    if (body.notify && row.status === "approved" && row.email) {
      const result = await sendEmail(buildVikasMitraApprovalEmail(row));
      email = { sent: result.ok, skipped: result.skipped, error: result.error };
    }

    return NextResponse.json({ ok: true, row, email });
  }

  if (body.type === "contact") {
    const row = await updateLead(body.id, body.data);
    return NextResponse.json({ ok: true, row });
  }

  const row = await updatePlanQuery(body.id, body.data);
  return NextResponse.json({ ok: true, row });
}
