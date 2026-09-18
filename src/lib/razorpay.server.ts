import crypto from "node:crypto";
import Razorpay from "razorpay";

declare global {
  var __razorpay: Razorpay | undefined;
}

function clean(value: string | undefined) {
  return value?.trim() || undefined;
}

export function getRazorpayKeyId(): string {
  const keyId =
    clean(process.env["RAZORPAY_KEY_ID"]) || clean(process.env["NEXT_PUBLIC_RAZORPAY_KEY_ID"]);
  if (!keyId) {
    throw new Error("RAZORPAY_KEY_ID missing. Set it in .env");
  }
  return keyId;
}

export function getRazorpayKeySecret(): string {
  const secret = clean(process.env["RAZORPAY_KEY_SECRET"]);
  if (!secret) {
    throw new Error("RAZORPAY_KEY_SECRET missing. Set it in .env");
  }
  return secret;
}

export function getRazorpayClient(): Razorpay {
  if (!globalThis.__razorpay) {
    globalThis.__razorpay = new Razorpay({
      key_id: getRazorpayKeyId(),
      key_secret: getRazorpayKeySecret(),
    });
  }
  return globalThis.__razorpay;
}

export function verifyPaymentSignature(input: {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}): boolean {
  const body = `${input.razorpayOrderId}|${input.razorpayPaymentId}`;
  const expected = crypto.createHmac("sha256", getRazorpayKeySecret()).update(body).digest("hex");
  return expected === input.razorpaySignature;
}

export function getRazorpayWebhookSecret(): string | undefined {
  return clean(process.env["RAZORPAY_WEBHOOK_SECRET"]);
}

export function verifyWebhookSignature(
  rawBody: string,
  signature: string,
  secret: string,
): boolean {
  const expected = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");
  return expected === signature;
}
