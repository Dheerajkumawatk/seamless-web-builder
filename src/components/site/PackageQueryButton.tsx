"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Send, X } from "lucide-react";

export function PackageQueryButton({
  packageName,
  featured = false,
  ctaLabel = "इस पैकेज की जानकारी लें",
  tone = "navy",
}: {
  packageName: string;
  featured?: boolean;
  ctaLabel?: string;
  tone?: string;
}) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("loading");

    try {
      const response = await fetch("/api/plan-query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          packageName,
          name: String(data.get("name") ?? ""),
          phone: String(data.get("phone") ?? ""),
          email: String(data.get("email") ?? ""),
          city: String(data.get("city") ?? ""),
          state: String(data.get("state") ?? ""),
          pincode: String(data.get("pincode") ?? ""),
          pageUrl: window.location.href,
          utmSource: new URLSearchParams(window.location.search).get("utm_source") || "",
          utmMedium: new URLSearchParams(window.location.search).get("utm_medium") || "",
          utmCampaign: new URLSearchParams(window.location.search).get("utm_campaign") || "",
        }),
      });
      if (!response.ok) throw new Error("Plan query failed");
      setStatus("done");
      form.reset();
    } catch {
      setStatus("error");
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
          setStatus("idle");
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
          <div className="w-full max-w-xl rounded-lg bg-[#f7faff] shadow-[0_24px_70px_rgba(29,9,8,.42)]">
            <div className="flex items-center justify-between border-b border-emerald-200 px-5 py-4">
              <div>
                <p className="text-xs font-extrabold tracking-[0.16em] text-saffron uppercase">
                  Plan Query
                </p>
                <h3 className="mt-1 text-2xl font-black text-maroon">{packageName}</h3>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close plan query form"
                className="grid h-10 w-10 place-items-center rounded-full border border-emerald-200 text-maroon hover:bg-emerald-50"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={submit} className="grid gap-4 p-5 sm:grid-cols-2">
              <input name="name" required className={field} placeholder="Name" />
              <input
                name="phone"
                required
                inputMode="tel"
                className={field}
                placeholder="Mobile No"
              />
              <input name="email" required type="email" className={field} placeholder="Email" />
              <input name="city" required className={field} placeholder="City" />
              <input name="state" required className={field} placeholder="State" />
              <input
                name="pincode"
                required
                inputMode="numeric"
                className={field}
                placeholder="Pincode"
              />

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-maroon px-6 py-3.5 text-sm font-extrabold text-white disabled:opacity-70"
                >
                  {status === "loading" ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                  Submit
                </button>
                {status === "done" && (
                  <p className="mt-3 flex items-center gap-2 text-sm font-extrabold text-[#1b7650]">
                    <CheckCircle2 className="h-4 w-4" /> Query submit ho gayi.
                  </p>
                )}
                {status === "error" && (
                  <p className="mt-3 text-sm font-bold text-destructive">
                    Form submit nahi ho paya. Dobara try karein.
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
