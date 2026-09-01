import { NextResponse } from "next/server";
import { z } from "zod";
import { createVikasMitraProfile, listVikasMitraProfiles } from "@/lib/vikas-mitra.server";
import { formatVikasMitraId } from "@/lib/profile-id";

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
  photo: z.string().max(2_500_000).optional().or(z.literal("")),
});

export async function GET() {
  const profiles = await listVikasMitraProfiles("approved");
  return NextResponse.json({ profiles });
}

export async function POST(request: Request) {
  try {
    const data = profileSchema.parse(await request.json());
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
      photo: data.photo || undefined,
    });

    return NextResponse.json({ ok: true, id: formatVikasMitraId(profile.id, profile.createdAt) });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Vikas Mitra form submit failed";
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }
}
