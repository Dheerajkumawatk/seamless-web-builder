import { NextResponse } from "next/server";
import { z } from "zod";
import { findOrderByRazorpayOrderId, markOrderFailed, markOrderPaid } from "@/lib/orders.server";
import { verifyPaymentSignature } from "@/lib/razorpay.server";

const verifySchema = z.object({
  razorpayOrderId: z.string().min(1).max(80),
  razorpayPaymentId: z.string().min(1).max(80),
  razorpaySignature: z.string().min(1).max(200),
});

export async function POST(request: Request) {
  try {
    const data = verifySchema.parse(await request.json());

    const existing = await findOrderByRazorpayOrderId(data.razorpayOrderId);
    if (!existing) {
      return NextResponse.json({ ok: false, error: "Order not found" }, { status: 404 });
    }

    if (existing.status === "paid") {
      return NextResponse.json({
        ok: true,
        status: "paid",
        orderId: existing.id,
        packageName: existing.packageName,
      });
    }

    const valid = verifyPaymentSignature({
      razorpayOrderId: data.razorpayOrderId,
      razorpayPaymentId: data.razorpayPaymentId,
      razorpaySignature: data.razorpaySignature,
    });

    if (!valid) {
      await markOrderFailed({
        razorpayOrderId: data.razorpayOrderId,
        razorpayPaymentId: data.razorpayPaymentId,
      });
      return NextResponse.json(
        { ok: false, error: "Invalid payment signature", status: "failed" },
        { status: 400 },
      );
    }

    const order = await markOrderPaid({
      razorpayOrderId: data.razorpayOrderId,
      razorpayPaymentId: data.razorpayPaymentId,
      razorpaySignature: data.razorpaySignature,
    });

    return NextResponse.json({
      ok: true,
      status: order.status,
      orderId: order.id,
      packageName: order.packageName,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Payment verify failed";
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }
}
