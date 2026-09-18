import { NextResponse } from "next/server";
import { markOrderFailed, markOrderPaid } from "@/lib/orders.server";
import { getRazorpayWebhookSecret, verifyWebhookSignature } from "@/lib/razorpay.server";

type RazorpayWebhookPayload = {
  event?: string;
  payload?: {
    payment?: {
      entity?: {
        id?: string;
        order_id?: string;
        status?: string;
      };
    };
  };
};

export async function POST(request: Request) {
  try {
    const webhookSecret = getRazorpayWebhookSecret();
    if (!webhookSecret) {
      // Optional: checkout still works via /api/orders/verify.
      // Add RAZORPAY_WEBHOOK_SECRET only when you enable webhooks in Razorpay Dashboard.
      return NextResponse.json(
        { ok: false, error: "Webhook not configured", skipped: true },
        { status: 503 },
      );
    }

    const rawBody = await request.text();
    const signature = request.headers.get("x-razorpay-signature") || "";

    if (!signature || !verifyWebhookSignature(rawBody, signature, webhookSecret)) {
      return NextResponse.json({ ok: false, error: "Invalid webhook signature" }, { status: 400 });
    }

    const body = JSON.parse(rawBody) as RazorpayWebhookPayload;
    const event = body.event || "";
    const payment = body.payload?.payment?.entity;
    const razorpayOrderId = payment?.order_id;
    const razorpayPaymentId = payment?.id;

    if (!razorpayOrderId) {
      return NextResponse.json({ ok: true, ignored: true });
    }

    if (event === "payment.captured" || payment?.status === "captured") {
      if (razorpayPaymentId) {
        await markOrderPaid({
          razorpayOrderId,
          razorpayPaymentId,
        });
      }
      return NextResponse.json({ ok: true, status: "paid" });
    }

    if (event === "payment.failed") {
      await markOrderFailed({
        razorpayOrderId,
        razorpayPaymentId: razorpayPaymentId || undefined,
      });
      return NextResponse.json({ ok: true, status: "failed" });
    }

    return NextResponse.json({ ok: true, ignored: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Webhook handling failed";
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }
}
