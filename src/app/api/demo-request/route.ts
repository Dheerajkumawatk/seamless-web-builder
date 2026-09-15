import { NextResponse } from "next/server";
import { z, ZodError } from "zod";
import { createDemoLead } from "@/lib/demo-request.server";
import { buildDemoReadyEmail, sendEmail } from "@/lib/email.server";

const demoRequestSchema = z.object({
  name: z.string().min(2).max(80),
  phone: z.string().min(8).max(20),
  email: z.string().email().max(120),
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

    const origin = new URL(request.url).origin;
    const configuredOrigin = process.env["NEXT_PUBLIC_SITE_URL"] || process.env["SITE_URL"];
    const siteOrigin = configuredOrigin
      ? (configuredOrigin.startsWith("http")
          ? configuredOrigin
          : `https://${configuredOrigin}`
        ).replace(/\/$/, "")
      : origin;
    // The browser must open the same server that saved the record. This matters
    // in local development, where the production database does not contain it.
    const demoUrl = `${origin}/demo/${lead.id}`;
    const emailedDemoUrl = `${siteOrigin}/demo/${lead.id}`;
    const email = await sendEmail(
      buildDemoReadyEmail({
        email: data.email,
        name: lead.name,
        village: lead.village || "आपका क्षेत्र",
        district: lead.district || "",
        demoUrl: emailedDemoUrl,
      }),
    );

    return NextResponse.json({ ok: true, id: lead.id, demoUrl, emailSent: email.ok });
  } catch (error) {
    const message =
      error instanceof ZodError
        ? error.message
        : "Demo request submit nahi ho payi. Please thodi der baad dobara try karein.";
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }
}
