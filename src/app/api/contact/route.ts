import { NextResponse } from "next/server";
import { z, ZodError } from "zod";
import { createLead } from "@/lib/contact.server";

const leadSchema = z.object({
  name: z.string().min(2).max(80),
  phone: z.string().min(8).max(20),
  email: z.string().email().max(120).optional().or(z.literal("")),
  post: z.string().min(1).max(60),
  source: z.string().max(40).optional().or(z.literal("")),
  state: z.string().max(60).optional().or(z.literal("")),
  city: z.string().max(80).optional().or(z.literal("")),
  pageUrl: z.string().max(500).optional().or(z.literal("")),
  utmSource: z.string().max(80).optional().or(z.literal("")),
  utmMedium: z.string().max(80).optional().or(z.literal("")),
  utmCampaign: z.string().max(120).optional().or(z.literal("")),
  message: z.string().max(1000).optional().or(z.literal("")),
});

export async function POST(request: Request) {
  try {
    const data = leadSchema.parse(await request.json());
    const lead = await createLead({
      name: data.name,
      phone: data.phone,
      email: data.email || undefined,
      post: data.post,
      source: data.source || undefined,
      state: data.state || undefined,
      city: data.city || undefined,
      message: [
        data.message || "",
        `Lead Status: NEW`,
        `Source: ${data.source || "BharatPahchan Website"}`,
        `Page URL: ${data.pageUrl || request.headers.get("referer") || "Not captured"}`,
        `UTM Source: ${data.utmSource || "Not captured"}`,
        `UTM Medium: ${data.utmMedium || "Not captured"}`,
        `UTM Campaign: ${data.utmCampaign || "Not captured"}`,
      ]
        .filter(Boolean)
        .join("\n"),
    });

    return NextResponse.json({ ok: true, id: lead.id });
  } catch (error) {
    const message =
      error instanceof ZodError
        ? error.message
        : "Form submit nahi ho paya. Please thodi der baad dobara try karein.";
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }
}
