"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Loader2, MessageCircle, Phone, X } from "lucide-react";
import { site } from "@/data/site";

export function CtaBand() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("loading");
    setError("");

    const message = [
      "District Partner Program Lead",
      "",
      `Name: ${String(data.get("name") ?? "")}`,
      `Phone: ${String(data.get("phone") ?? "")}`,
      `Email: ${String(data.get("email") ?? "")}`,
      `District: ${String(data.get("district") ?? "")}`,
      `Tehsil/Block: ${String(data.get("tehsil") ?? "")}`,
      `Experience: ${String(data.get("experience") ?? "")}`,
      `Message: ${String(data.get("message") ?? "")}`,
    ].join("\n");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(data.get("name") ?? ""),
          phone: String(data.get("phone") ?? ""),
          email: String(data.get("email") ?? ""),
          post: "District Partner Program",
          source: "District Partner Form",
          state: String(data.get("district") ?? ""),
          pageUrl: window.location.href,
          utmSource: new URLSearchParams(window.location.search).get("utm_source") || "",
          utmMedium: new URLSearchParams(window.location.search).get("utm_medium") || "",
          utmCampaign: new URLSearchParams(window.location.search).get("utm_campaign") || "",
          message,
        }),
      });

      if (!response.ok) {
        const errorData = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(errorData?.error ?? "District Partner form submit failed");
      }

      setStatus("done");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Form submit nahi ho paya.");
    }
  }

  const field =
    "w-full rounded-md border border-[#d6e0f1] bg-white px-3.5 py-3 text-sm font-semibold text-[#232a3c] outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/25";

  return (
    <>
      <section className="bg-[#f4f8ff] px-4 py-10 sm:py-12">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[28px] bg-[linear-gradient(135deg,#123a72_0%,#1b4c8a_43%,#168454_100%)] px-6 py-8 text-white shadow-[0_22px_54px_rgba(90,6,11,.22)] sm:px-10 lg:px-14 lg:py-11">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-center">
            <div>
              <p className="text-[12px] font-extrabold tracking-[0.18em] text-white/68 uppercase">
                District Partner Program
              </p>
              <h2 className="mt-4 max-w-4xl font-display text-3xl leading-tight font-black text-white sm:text-4xl">
                Become the Bharat Pehchan Partner for your district.
              </h2>
              <p className="mt-4 max-w-4xl text-base leading-relaxed font-semibold text-white/82 sm:text-lg">
                Har GP sale par commission, referral bonus, training support aur complete sales kit
                paayein. Aap local connections laayein, backend support hum denge.
              </p>

              <div className="mt-7 grid gap-4 sm:grid-cols-3">
                {[
                  ["10%", "Commission per sale"],
                  ["Rs. 1000", "Referral bonus per GP"],
                  ["Local", "District-level partner support"],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-lg bg-white/14 p-5 ring-1 ring-white/16">
                    <p className="font-display text-3xl font-black text-white">{value}</p>
                    <p className="mt-1 text-sm font-bold text-white/82">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4 lg:items-stretch">
              <button
                type="button"
                onClick={() => {
                  setStatus("idle");
                  setError("");
                  setOpen(true);
                }}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-saffron px-8 py-5 text-base font-extrabold text-white shadow-[0_16px_28px_rgba(21,154,86,.28)] transition-transform hover:scale-[1.02]"
              >
                Apply as District Partner <ArrowRight className="h-5 w-5" />
              </button>
              <a
                href={`tel:${site.phone}`}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/10 px-8 py-5 text-base font-extrabold text-white transition-colors hover:bg-white/16"
              >
                <Phone className="h-5 w-5" />
                Call Us Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {open && (
        <div className="fixed inset-0 z-[70] grid place-items-center bg-[#0a1526]/70 px-4 py-6 backdrop-blur-sm">
          <div className="max-h-[calc(100dvh-3rem)] w-full max-w-xl overflow-y-auto rounded-lg bg-[#f7faff] shadow-[0_24px_70px_rgba(29,9,8,.42)]">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-emerald-200 bg-[#f7faff] px-5 py-4">
              <div>
                <p className="text-xs font-extrabold tracking-[0.16em] text-saffron uppercase">
                  Admin Lead
                </p>
                <h3 className="mt-1 font-display text-2xl font-black text-maroon">
                  District Partner Form
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close form"
                className="grid h-10 w-10 place-items-center rounded-full border border-emerald-200 text-maroon hover:bg-emerald-50"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={onSubmit} className="grid gap-4 p-5 sm:grid-cols-2">
              <div>
                <label
                  className="mb-1.5 block text-xs font-extrabold text-[#33384a]"
                  htmlFor="partner-name"
                >
                  Name *
                </label>
                <input
                  id="partner-name"
                  name="name"
                  required
                  className={field}
                  placeholder="Your name"
                />
              </div>
              <div>
                <label
                  className="mb-1.5 block text-xs font-extrabold text-[#33384a]"
                  htmlFor="partner-phone"
                >
                  Mobile Number *
                </label>
                <input
                  id="partner-phone"
                  name="phone"
                  required
                  inputMode="tel"
                  className={field}
                  placeholder="+91"
                />
              </div>
              <div>
                <label
                  className="mb-1.5 block text-xs font-extrabold text-[#33384a]"
                  htmlFor="partner-email"
                >
                  Email
                </label>
                <input
                  id="partner-email"
                  name="email"
                  type="email"
                  className={field}
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label
                  className="mb-1.5 block text-xs font-extrabold text-[#33384a]"
                  htmlFor="partner-district"
                >
                  District *
                </label>
                <input
                  id="partner-district"
                  name="district"
                  required
                  className={field}
                  placeholder="Jaipur"
                />
              </div>
              <div>
                <label
                  className="mb-1.5 block text-xs font-extrabold text-[#33384a]"
                  htmlFor="partner-tehsil"
                >
                  Tehsil / Block *
                </label>
                <input
                  id="partner-tehsil"
                  name="tehsil"
                  required
                  className={field}
                  placeholder="Tehsil / Block"
                />
              </div>
              <div>
                <label
                  className="mb-1.5 block text-xs font-extrabold text-[#33384a]"
                  htmlFor="partner-experience"
                >
                  Experience
                </label>
                <select id="partner-experience" name="experience" className={field} defaultValue="">
                  <option value="" disabled>
                    Select experience
                  </option>
                  <option value="New">New</option>
                  <option value="1-2 years">1-2 years</option>
                  <option value="3-5 years">3-5 years</option>
                  <option value="5+ years">5+ years</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label
                  className="mb-1.5 block text-xs font-extrabold text-[#33384a]"
                  htmlFor="partner-message"
                >
                  Message
                </label>
                <textarea
                  id="partner-message"
                  name="message"
                  rows={4}
                  className={field}
                  placeholder="Tell us about your district network..."
                />
              </div>

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#25d366] px-6 py-3.5 text-sm font-extrabold text-white transition-transform hover:scale-[1.01] disabled:opacity-70"
                >
                  {status === "loading" ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <MessageCircle className="h-4 w-4" />
                  )}
                  Submit Lead
                </button>
                {status === "done" && (
                  <p className="mt-3 flex items-center gap-2 text-sm font-extrabold text-[#1b7650]">
                    <CheckCircle2 className="h-4 w-4" /> submit.
                  </p>
                )}
                {status === "error" && (
                  <p className="mt-3 text-sm font-bold text-destructive">
                    {error || "Form submit nahi ho paya. Please try again."}
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
