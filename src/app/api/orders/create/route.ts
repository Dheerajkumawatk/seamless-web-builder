import { NextResponse } from "next/server";
import { z } from "zod";
import { startCheckoutPayment } from "@/lib/orders.server";

const createOrderSchema = z.object({
  orderId: z.string().uuid(),
});

export async function POST(request: Request) {
  try {
    const data = createOrderSchema.parse(await request.json());
    const result = await startCheckoutPayment(data.orderId);

    return NextResponse.json({
      ok: true,
      orderId: result.order.id,
      razorpayOrderId: result.razorpayOrderId,
      amount: result.amount,
      currency: result.currency,
      keyId: result.keyId,
      packageName: result.order.packageName,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Order create failed";
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }
}
