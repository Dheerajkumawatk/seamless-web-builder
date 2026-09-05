import { NextResponse } from "next/server";
import { z } from "zod";
import { createLead } from "@/lib/contact.server";

const planQuerySchema = z.object({
  packageName: z.string().min(1).max(120),
  name: z.string().min(2).max(80),
  phone: z.string().min(8).max(20),
  email: z.string().email().max(120),
  city: z.string().min(2).max(80),
  state: z.string().min(2).max(80),
  pincode: z.string().min(4).max(12),
});

export async function POST(request: Request) {
  try {
    const data = planQuerySchema.parse(await request.json());
    const query = await createLead({
      name: data.name,
      phone: data.phone,
      email: data.email,
      post: "Package Query",
      source: "Package Form",
      state: data.state,
      city: data.city,
      message: [
        "Package Form",
        `Package: ${data.packageName}`,
        `City: ${data.city}`,
        `State: ${data.state}`,
        `Pincode: ${data.pincode}`,
      ].join("\n"),
    });
    return NextResponse.json({ ok: true, id: query.id });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Plan query submit failed";
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }
}
