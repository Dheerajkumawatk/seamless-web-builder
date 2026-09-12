import { NextResponse } from "next/server";
import { z, ZodError } from "zod";
import { createDemoLead } from "@/lib/demo-request.server";

const demoRequestSchema = z.object({
  name: z.string().min(2).max(80),
  phone: z.string().min(8).max(20),
  village: z.string().max(120).optional().or(z.literal("")),
  district: z.string().max(80).optional().or(z.literal("")),
  post: z.string().max(80).optional().or(z.literal("")),
  source: z.string().max(80).optional().or(z.literal("")),
  pageUrl: z.string().max(500).optional().or(z.literal("")),
  utmSource: z.string().max(80).optional().or(z.literal("")),
  utmMedium: z.string().max(80).optional().or(z.literal("")),
  utmCampaign: z.string().max(120).optional().or(z.literal("")),
  notes: z.string().max(1000).optional().or(z.literal("")),
});

export async function POST(request: Request) {
  try {
    const data = demoRequestSchema.parse(await request.json());
    const lead = await createDemoLead({
      name: data.name,
      phone: data.phone,
      village: data.village || undefined,
      district: data.district || undefined,
      post: data.post || undefined,
      source: data.source || "BharatPahchan Website",
      pageUrl: data.pageUrl || request.headers.get("referer") || undefined,
      utmSource: data.utmSource || undefined,
      utmMedium: data.utmMedium || undefined,
      utmCampaign: data.utmCampaign || undefined,
      notes: data.notes || undefined,
      status: "NEW",
    });

    return NextResponse.json({ ok: true, id: lead.id });
  } catch (error) {
    const message =
      error instanceof ZodError
        ? error.message
        : "Demo request submit nahi ho payi. Please thodi der baad dobara try karein.";
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }
}
