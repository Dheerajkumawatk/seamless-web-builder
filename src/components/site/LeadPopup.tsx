"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Loader2, PhoneCall, Send } from "lucide-react";
import { usePathname } from "next/navigation";

const submittedKey = "bharat-lead-popup-submitted";

export function LeadPopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    if (pathname?.startsWith("/admin")) return;
    if (window.localStorage.getItem(submittedKey) === "yes") return;

    const timer = window.setTimeout(() => setOpen(true), 10_000);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const city = String(data.get("city") ?? "").trim();

    setStatus("loading");
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          city,
          state: city,
          post: "Website Popup Lead",
          message: city ? `City: ${city}` : "City: Not provided",
        }),
      });

      if (!response.ok) {
        const errorData = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(errorData?.error ?? "Lead submit nahi ho payi.");
      }

      window.localStorage.setItem(submittedKey, "yes");
      setStatus("done");
      window.setTimeout(() => setOpen(false), 700);
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Form submit nahi ho paya.");
    }
  }

  if (!open) return null;

  const field =
    "w-full rounded-md border border-slate-300 bg-white px-3.5 py-3 text-sm font-semibold text-slate-950 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200";

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-slate-950/82 px-4 py-6 backdrop-blur-sm">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md rounded-lg bg-white p-5 text-slate-950 shadow-2xl sm:p-6"
      >
        <div className="grid h-12 w-12 place-items-center rounded-md bg-emerald-600 text-white">
          <PhoneCall className="h-6 w-6" />
        </div>
        <p className="mt-5 text-xs font-black tracking-[0.16em] text-emerald-700 uppercase">
          Quick Enquiry
        </p>
        <h2 className="mt-1 text-2xl font-black text-slate-950">
          Website access ke liye details bharein
        </h2>
        <p className="mt-2 text-sm font-semibold text-slate-600">
          Form submit karne ke baad website continue ho jayegi.
        </p>

        <div className="mt-5 space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-xs font-black uppercase text-slate-500">Name *</span>
            <input name="name" required minLength={2} maxLength={80} className={field} />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-black uppercase text-slate-500">
              Mobile Number *
            </span>
            <input
              name="phone"
              required
              minLength={8}
              maxLength={20}
              inputMode="tel"
              className={field}
              placeholder="+91"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-black uppercase text-slate-500">City</span>
            <input name="city" maxLength={80} className={field} placeholder="Optional" />
          </label>
        </div>

        <button
          type="submit"
          disabled={status === "loading" || status === "done"}
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-emerald-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-emerald-600/20 disabled:opacity-70"
        >
          {status === "loading" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : status === "done" ? (
            <CheckCircle2 className="h-4 w-4" />
          ) : (
            <Send className="h-4 w-4" />
          )}
          {status === "done" ? "Submitted" : "Submit"}
        </button>
        {status === "error" && (
          <p className="mt-3 text-sm font-bold text-red-600">
            {error || "Form submit nahi ho paya. Please try again."}
          </p>
        )}
      </form>
    </div>
  );
}
