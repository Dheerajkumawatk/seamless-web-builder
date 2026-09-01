import { NextResponse } from "next/server";
import { z } from "zod";
import { createPlanQuery } from "@/lib/plan-query.server";

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
    const query = await createPlanQuery(data);
    return NextResponse.json({ ok: true, id: query.id });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Plan query submit failed";
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }
}
