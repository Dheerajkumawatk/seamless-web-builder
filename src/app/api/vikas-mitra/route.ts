import { NextResponse } from "next/server";
import { z } from "zod";
import { createVikasMitraProfile, listVikasMitraProfiles } from "@/lib/vikas-mitra.server";
import { buildVikasMitraSubmitEmail, sendEmail } from "@/lib/email.server";
import { formatVikasMitraId } from "@/lib/profile-id";
import { uploadImageToCloudinary } from "@/lib/cloudinary.server";

const profileSchema = z.object({
  name: z.string().min(2).max(80),
  phone: z.string().min(8).max(20),
  email: z.string().email().max(120).optional().or(z.literal("")),
  district: z.string().min(2).max(80),
  tehsil: z.string().min(2).max(80),
  village: z.string().min(2).max(80),
  occupation: z.string().max(100).optional().or(z.literal("")),
  experience: z.string().max(60).optional().or(z.literal("")),
  message: z.string().max(1000).optional().or(z.literal("")),
});

export const runtime = "nodejs";

export async function GET() {
  const profiles = await listVikasMitraProfiles("approved");
  return NextResponse.json({ profiles });
}

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const data = profileSchema.parse({
      name: String(form.get("name") ?? ""),
      phone: String(form.get("phone") ?? ""),
      email: String(form.get("email") ?? ""),
      district: String(form.get("district") ?? ""),
      tehsil: String(form.get("tehsil") ?? ""),
      village: String(form.get("village") ?? ""),
      occupation: String(form.get("occupation") ?? ""),
      experience: String(form.get("experience") ?? ""),
      message: String(form.get("message") ?? ""),
    });
    const photoFile = form.get("photo");
    const panCardFile = form.get("panCard");
    const aadhaarCardFile = form.get("aadhaarCard");
    const photo =
      photoFile instanceof File && photoFile.size > 0
        ? await uploadImageToCloudinary(photoFile, "bharat-pahchan/vikas-mitra/profile")
        : "";
    const panCard =
      panCardFile instanceof File && panCardFile.size > 0
        ? await uploadImageToCloudinary(panCardFile, "bharat-pahchan/vikas-mitra/pan")
        : "";
    const aadhaarCard =
      aadhaarCardFile instanceof File && aadhaarCardFile.size > 0
        ? await uploadImageToCloudinary(aadhaarCardFile, "bharat-pahchan/vikas-mitra/aadhaar")
        : "";
    const profile = await createVikasMitraProfile({
      name: data.name,
      phone: data.phone,
      email: data.email || undefined,
      district: data.district,
      tehsil: data.tehsil,
      village: data.village,
      occupation: data.occupation || undefined,
      experience: data.experience || undefined,
      message: data.message || undefined,
      photo: photo || undefined,
      panCard: panCard || undefined,
      aadhaarCard: aadhaarCard || undefined,
    });

    if (profile.email) {
      await sendEmail(buildVikasMitraSubmitEmail(profile));
    }

    return NextResponse.json({ ok: true, id: formatVikasMitraId(profile.id, profile.createdAt) });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Vikas Mitra form submit failed";
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }
}
