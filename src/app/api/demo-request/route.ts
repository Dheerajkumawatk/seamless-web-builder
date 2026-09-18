import { NextResponse } from "next/server";
import { z, ZodError } from "zod";
import { createDemoLead } from "@/lib/demo-request.server";
import { buildDemoReadyEmail, sendEmail } from "@/lib/email.server";
import { uploadImageToCloudinary } from "@/lib/cloudinary.server";

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
    const form = await request.formData();
    const data = demoRequestSchema.parse({
      name: String(form.get("name") ?? ""),
      phone: String(form.get("phone") ?? ""),
      email: String(form.get("email") ?? ""),
      village: String(form.get("village") ?? ""),
      district: String(form.get("district") ?? ""),
      post: String(form.get("post") ?? ""),
      source: String(form.get("source") ?? ""),
      pageUrl: String(form.get("pageUrl") ?? ""),
      utmSource: String(form.get("utmSource") ?? ""),
      utmMedium: String(form.get("utmMedium") ?? ""),
      utmCampaign: String(form.get("utmCampaign") ?? ""),
      notes: String(form.get("notes") ?? ""),
    });
    const photoFile = form.get("photo");
    if (!(photoFile instanceof File) || photoFile.size === 0) {
      throw new Error("Candidate photo required hai.");
    }
    if (!photoFile.type.startsWith("image/") || photoFile.size > 5_000_000) {
      throw new Error("Photo JPG, PNG ya WebP mein aur 5 MB se chhoti honi chahiye.");
    }
    const photo = await uploadImageToCloudinary(photoFile, "bharat-pahchan/demo-candidates");
    const lead = await createDemoLead({
      name: data.name,
      phone: data.phone,
      photo,
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
    // Resolve against the browser's origin: request.url can contain the internal
    // server address behind a reverse proxy (for example, 0.0.0.0:3444).
    const demoUrl = `/demo/${lead.id}`;
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
