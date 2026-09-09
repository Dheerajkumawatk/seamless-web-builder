import { NextResponse } from "next/server";
import { z } from "zod";
import { isAdminRequest } from "@/lib/admin-auth";
import { createBlogPost, deleteBlogPost, listBlogPosts, updateBlogPost } from "@/lib/blog.server";
import { deleteLead, listLeads, updateLead } from "@/lib/contact.server";
import {
  deleteVikasMitraProfile,
  listVikasMitraProfiles,
  updateVikasMitraProfile,
} from "@/lib/vikas-mitra.server";
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
    source: z.string().max(40).optional().or(z.literal("")),
    state: z.string().max(60).optional().or(z.literal("")),
    city: z.string().max(80).optional().or(z.literal("")),
    message: z.string().max(1000).optional().or(z.literal("")),
  }),
});

const blogDataSchema = z.object({
  title: z.string().min(2).max(160),
  slug: z.string().max(180).optional().or(z.literal("")),
  excerpt: z.string().min(2).max(500),
  date: z.string().min(2).max(80),
  publishDate: z.string().min(2).max(80),
  category: z.string().min(1).max(80),
  image: z.string().min(1).max(2_500_000),
  imageAltText: z.string().min(1).max(180),
  content: z.string().min(2).max(20_000),
  seoTitle: z.string().min(2).max(180),
  metaDescription: z.string().min(2).max(300),
});

const blogUpdateSchema = z.object({
  type: z.literal("blog"),
  id: z.string().min(1),
  data: blogDataSchema.partial(),
});

const createSchema = z.object({
  type: z.literal("blog"),
  data: blogDataSchema,
});

const updateSchema = z.discriminatedUnion("type", [vikasSchema, leadSchema, blogUpdateSchema]);
const deleteSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("vikas"), id: z.string().uuid() }),
  z.object({ type: z.literal("contact"), id: z.string().uuid() }),
  z.object({ type: z.literal("blog"), id: z.string().min(1) }),
]);

export async function GET(request: Request) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [vikas, contacts, blogs] = await Promise.all([
    listVikasMitraProfiles(),
    listLeads(),
    listBlogPosts(),
  ]);

  return NextResponse.json({ vikas, contacts, blogs });
}

export async function POST(request: Request) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = createSchema.parse(await request.json());
  const row = await createBlogPost(body.data);
  return NextResponse.json({ ok: true, row });
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

  if (body.type === "blog") {
    const row = await updateBlogPost(body.id, body.data);
    return NextResponse.json({ ok: true, row });
  }

  return NextResponse.json({ ok: false, error: "Unsupported update type" }, { status: 400 });
}

export async function DELETE(request: Request) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = deleteSchema.parse(await request.json());

  if (body.type === "vikas") {
    await deleteVikasMitraProfile(body.id);
    return NextResponse.json({ ok: true });
  }

  if (body.type === "contact") {
    await deleteLead(body.id);
    return NextResponse.json({ ok: true });
  }

  await deleteBlogPost(body.id);
  return NextResponse.json({ ok: true });
}
