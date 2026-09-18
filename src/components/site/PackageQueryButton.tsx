"use client";

import { useState } from "react";
import { ArrowLeft, CheckCircle2, CreditCard, Loader2, X } from "lucide-react";

type Step = "details" | "payment" | "done";

type CheckoutDetails = {
  name: string;
  phone: string;
  email: string;
  city: string;
  state: string;
  pincode: string;
};

type DraftResponse = {
  ok: boolean;
  orderId?: string;
  amount?: number;
  currency?: string;
  packageName?: string;
  error?: string;
};

type CreateOrderResponse = {
  ok: boolean;
  orderId?: string;
  razorpayOrderId?: string;
  amount?: number;
  currency?: string;
  keyId?: string;
  packageName?: string;
  error?: string;
};

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => {
      open: () => void;
      on: (event: string, handler: (response: Record<string, unknown>) => void) => void;
    };
  }
}

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

function formatInrFromPaise(paise: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(paise / 100);
}

function utmPayload() {
  const utm = new URLSearchParams(window.location.search);
  return {
    pageUrl: window.location.href,
    utmSource: utm.get("utm_source") || "",
    utmMedium: utm.get("utm_medium") || "",
    utmCampaign: utm.get("utm_campaign") || "",
  };
}

export function PackageQueryButton({
  packageName,
  featured: _featured = false,
  ctaLabel = "इस पैकेज के लिए भुगतान करें",
  tone = "navy",
  displayPrice,
}: {
  packageName: string;
  featured?: boolean;
  ctaLabel?: string;
  tone?: string;
  displayPrice?: string;
}) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("details");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [orderId, setOrderId] = useState<string | null>(null);
  const [policyAccepted, setPolicyAccepted] = useState(false);
  const [details, setDetails] = useState<CheckoutDetails>({
    name: "",
    phone: "",
    email: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [checkoutAmountPaise, setCheckoutAmountPaise] = useState<number | null>(null);

  void _featured;

  function resetModal() {
    setStep("details");
    setStatus("idle");
    setErrorMessage("");
    setCheckoutAmountPaise(null);
    setOrderId(null);
    setPolicyAccepted(false);
    setDetails({
      name: "",
      phone: "",
      email: "",
      city: "",
      state: "",
      pincode: "",
    });
  }

  function closeModal() {
    setOpen(false);
    resetModal();
  }

  async function goToPayment(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const nextDetails: CheckoutDetails = {
      name: String(data.get("name") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      city: String(data.get("city") ?? "").trim(),
      state: String(data.get("state") ?? "").trim(),
      pincode: String(data.get("pincode") ?? "").trim(),
    };

    setDetails(nextDetails);
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/orders/draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...(orderId ? { orderId } : {}),
          packageName,
          ...nextDetails,
          ...utmPayload(),
        }),
      });
      const draft = (await response.json()) as DraftResponse;
      if (!response.ok || !draft.ok || !draft.orderId) {
        throw new Error(draft.error || "Lead save nahi ho paya");
      }

      setOrderId(draft.orderId);
      setCheckoutAmountPaise(draft.amount ?? null);
      setPolicyAccepted(false);
      setStatus("idle");
      setStep("payment");
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Lead save nahi ho paya");
    }
  }

  async function startPayment() {
    if (!orderId) {
      setStatus("error");
      setErrorMessage("Order missing. Details dobara submit karein.");
      return;
    }
    if (!policyAccepted) {
      setStatus("error");
      setErrorMessage("Payment se pehle sahmati checkbox tick karein.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const createResponse = await fetch("/api/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      });
      const created = (await createResponse.json()) as CreateOrderResponse;
      if (!createResponse.ok || !created.ok || !created.razorpayOrderId || !created.keyId) {
        throw new Error(created.error || "Order create nahi ho paya");
      }

      setCheckoutAmountPaise(created.amount ?? null);

      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded || !window.Razorpay) {
        throw new Error("Razorpay checkout load nahi ho paya");
      }

      const rzp = new window.Razorpay({
        key: created.keyId,
        amount: created.amount,
        currency: created.currency || "INR",
        name: "Bharat Pehchan",
        description: `${packageName} package`,
        order_id: created.razorpayOrderId,
        prefill: {
          name: details.name,
          email: details.email,
          contact: details.phone,
        },
        notes: {
          packageName,
          orderId: created.orderId,
        },
        theme: { color: "#102b6f" },
        handler: async (response: Record<string, unknown>) => {
          setStatus("loading");
          try {
            const verifyResponse = await fetch("/api/orders/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpayOrderId: response["razorpay_order_id"],
                razorpayPaymentId: response["razorpay_payment_id"],
                razorpaySignature: response["razorpay_signature"],
              }),
            });
            const verified = (await verifyResponse.json()) as {
              ok: boolean;
              error?: string;
            };
            if (!verifyResponse.ok || !verified.ok) {
              throw new Error(verified.error || "Payment verify nahi ho paya");
            }
            setStatus("idle");
            setStep("done");
          } catch (error) {
            setStatus("error");
            setErrorMessage(error instanceof Error ? error.message : "Payment verify nahi ho paya");
          }
        },
        modal: {
          ondismiss: () => {
            setStatus("idle");
            setErrorMessage("Payment cancel ho gaya. Dobara try karein.");
          },
        },
      });

      rzp.on("payment.failed", () => {
        setStatus("error");
        setErrorMessage("Payment fail ho gaya. Dobara try karein.");
      });

      rzp.open();
      setStatus("idle");
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Payment start nahi ho paya");
    }
  }

  const field =
    "w-full rounded-md border border-emerald-200 bg-white px-3.5 py-2.5 text-sm font-semibold text-[#232a3c] outline-none focus:border-saffron focus:ring-2 focus:ring-saffron/25";
  const buttonTone = {
    green: "bg-[#20a34a] text-white",
    blue: "bg-[#2867c9] text-white",
    purple: "bg-[#7f3fbd] text-white",
    orange: "bg-[#ff5b20] text-white",
    navy: "bg-[#102b6f] text-white",
    red: "bg-[#ef3a30] text-white",
  };

  return (
    <>
      <button
        type="button"
        onClick={() => {
          resetModal();
          setOpen(true);
        }}
        className={`mt-6 block w-full rounded-md py-3 text-center text-sm font-semibold ${
          buttonTone[tone as keyof typeof buttonTone] ?? buttonTone.navy
        }`}
      >
        {ctaLabel}
      </button>

      {open && (
        <div className="fixed inset-0 z-[80] grid place-items-center bg-[#0a1526]/70 px-4 py-6 backdrop-blur-sm">
          <div className="max-h-[calc(100dvh-3rem)] w-full max-w-xl overflow-y-auto overscroll-contain rounded-lg bg-[#f7faff] shadow-[0_24px_70px_rgba(29,9,8,.42)]">
            <div className="flex items-center justify-between border-b border-emerald-200 px-5 py-4">
              <div>
                <p className="text-xs font-extrabold tracking-[0.16em] text-saffron uppercase">
                  {step === "done" ? "Payment Complete" : "Package Checkout"}
                </p>
                <h3 className="mt-1 text-2xl font-black text-maroon">{packageName}</h3>
                {step !== "done" && (
                  <p className="mt-1 text-xs font-semibold text-[#5b6478]">
                    Step {step === "details" ? "1" : "2"} of 2 —{" "}
                    {step === "details" ? "Your details" : "Payment"}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={closeModal}
                aria-label="Close package checkout"
                className="grid h-10 w-10 place-items-center rounded-full border border-emerald-200 text-maroon hover:bg-emerald-50"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {step === "details" && (
              <form
                acceptCharset="UTF-8"
                onSubmit={(event) => void goToPayment(event)}
                className="grid gap-4 p-5 sm:grid-cols-2"
              >
                <input
                  name="name"
                  required
                  defaultValue={details.name}
                  className={field}
                  placeholder="Name"
                />
                <input
                  name="phone"
                  required
                  inputMode="tel"
                  defaultValue={details.phone}
                  className={field}
                  placeholder="Mobile No"
                />
                <input
                  name="email"
                  required
                  type="email"
                  defaultValue={details.email}
                  className={field}
                  placeholder="Email"
                />
                <input
                  name="city"
                  required
                  defaultValue={details.city}
                  className={field}
                  placeholder="City"
                />
                <input
                  name="state"
                  required
                  defaultValue={details.state}
                  className={field}
                  placeholder="State"
                />
                <input
                  name="pincode"
                  required
                  inputMode="numeric"
                  defaultValue={details.pincode}
                  className={field}
                  placeholder="Pincode"
                />

                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-maroon px-6 py-3.5 text-sm font-extrabold text-white disabled:opacity-70"
                  >
                    {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                    भुगतान पर जाएँ
                  </button>
                  {errorMessage && (
                    <p className="mt-3 text-sm font-bold text-destructive">{errorMessage}</p>
                  )}
                </div>
              </form>
            )}

            {step === "payment" && (
              <div className="grid gap-4 p-5">
                <div className="rounded-md border border-emerald-200 bg-white px-4 py-3">
                  <p className="text-xs font-bold tracking-wide text-[#5b6478] uppercase">
                    Order summary
                  </p>
                  <p className="mt-1 text-lg font-black text-maroon">{packageName}</p>
                  <p className="mt-1 text-2xl font-black text-[#102b6f]">
                    {checkoutAmountPaise != null
                      ? formatInrFromPaise(checkoutAmountPaise)
                      : displayPrice || "—"}
                  </p>
                  <p className="mt-3 text-sm font-semibold text-[#232a3c]">
                    {details.name} · {details.phone}
                  </p>
                  <p className="text-sm text-[#5b6478]">
                    {details.email}
                    <br />
                    {details.city}, {details.state} — {details.pincode}
                  </p>
                </div>

                <label className="flex cursor-pointer gap-3 rounded-md border border-emerald-200 bg-white px-4 py-3 text-sm font-semibold leading-relaxed text-[#232a3c]">
                  <input
                    type="checkbox"
                    checked={policyAccepted}
                    onChange={(event) => {
                      setPolicyAccepted(event.target.checked);
                      if (event.target.checked) {
                        setStatus("idle");
                        setErrorMessage("");
                      }
                    }}
                    className="mt-1 h-4 w-4 shrink-0 accent-[#102b6f]"
                  />
                  <span>
                    मैं पुष्टि करता/करती हूं कि चयनित पैकेज, उसकी सेवाएं और लागू नीतियां मेरी
                    जानकारी में हैं, और मैं आगे बढ़ने के लिए सहमत हूं।
                  </span>
                </label>

                <button
                  type="button"
                  onClick={() => void startPayment()}
                  disabled={status === "loading" || !policyAccepted}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-maroon px-6 py-3.5 text-sm font-extrabold text-white disabled:opacity-70"
                >
                  {status === "loading" ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <CreditCard className="h-4 w-4" />
                  )}
                  Razorpay se Pay Karein
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setStatus("idle");
                    setErrorMessage("");
                    setPolicyAccepted(false);
                    setStep("details");
                  }}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-emerald-200 bg-white px-6 py-3 text-sm font-bold text-maroon"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Details edit karein
                </button>

                {errorMessage && (
                  <p className="text-sm font-bold text-destructive">{errorMessage}</p>
                )}
              </div>
            )}

            {step === "done" && (
              <div className="grid gap-4 p-5">
                <p className="flex items-center gap-2 text-base font-extrabold text-[#1b7650]">
                  <CheckCircle2 className="h-5 w-5" />
                  Payment successful. Team jald contact karegi.
                </p>
                <p className="text-sm font-semibold text-[#5b6478]">
                  {packageName} package ke liye aapka order receive ho gaya hai.
                </p>
                <button
                  type="button"
                  onClick={closeModal}
                  className="inline-flex w-full items-center justify-center rounded-md bg-maroon px-6 py-3.5 text-sm font-extrabold text-white"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
