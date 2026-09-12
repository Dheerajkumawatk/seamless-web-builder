"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Facebook,
  Instagram,
  Loader2,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  X,
  Youtube,
} from "lucide-react";
import { nav, site } from "@/data/site";
import { Logo } from "@/components/layout/Logo";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [vikasOpen, setVikasOpen] = useState(false);
  const [vikasStatus, setVikasStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [vikasError, setVikasError] = useState("");
  const [vikasSubmittedId, setVikasSubmittedId] = useState("");
  const [photoPreview, setPhotoPreview] = useState("");
  const [panPreview, setPanPreview] = useState("");
  const [aadhaarPreview, setAadhaarPreview] = useState("");
  const [agree, setAgree] = useState(false);
  const socialLinks = [
    { icon: Facebook, href: site.socialLinks.facebook, label: "Facebook" },
    { icon: Instagram, href: site.socialLinks.instagram, label: "Instagram" },
    { icon: Youtube, href: site.socialLinks.youtube, label: "YouTube" },
    { icon: MessageCircle, href: site.whatsappUrl, label: "WhatsApp" },
  ];
  const field =
    "w-full rounded-md border border-[#d6e0f1] bg-white px-3.5 py-3 text-sm font-semibold text-[#232a3c] outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/25";
  const fileField =
    "w-full rounded-md border border-[#d6e0f1] bg-white px-3.5 py-2.5 text-sm font-semibold text-[#232a3c] file:mr-3 file:rounded-md file:border-0 file:bg-saffron file:px-3 file:py-2 file:text-xs file:font-extrabold file:text-white focus:border-saffron focus:ring-2 focus:ring-saffron/25 focus:outline-none";

  useEffect(() => {
    if (!vikasOpen || vikasStatus !== "done") {
      return;
    }

    const timer = window.setTimeout(() => {
      setVikasOpen(false);
      setVikasStatus("idle");
      setVikasSubmittedId("");
    }, 10_000);

    return () => window.clearTimeout(timer);
  }, [vikasOpen, vikasStatus]);

  if (pathname.startsWith("/admin")) {
    return null;
  }

  function openVikasForm() {
    setVikasStatus("idle");
    setVikasError("");
    setVikasSubmittedId("");
    setPhotoPreview("");
    setPanPreview("");
    setAadhaarPreview("");
    setAgree(false);
    setVikasOpen(true);
    setOpen(false);
  }

  function readPhoto(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result ?? ""));
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  async function submitVikasMitra(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    if (!agree) {
      setVikasStatus("error");
      setVikasError("Pehle privacy policy checkbox ko tick karein.");
      return;
    }
    setVikasStatus("loading");
    setVikasError("");
    try {
      const profileResponse = await fetch("/api/vikas-mitra", {
        method: "POST",
        body: data,
      });

      if (!profileResponse.ok) {
        const errorData = (await profileResponse.json().catch(() => null)) as {
          error?: string;
        } | null;
        throw new Error(errorData?.error ?? "Failed to create Vikas Mitra public profile");
      }

      const result = (await profileResponse.json()) as { id?: string };
      setVikasSubmittedId(result.id ?? "");
      setVikasStatus("done");
      setPhotoPreview("");
      setPanPreview("");
      setAadhaarPreview("");
      setAgree(false);
      form.reset();
    } catch (error) {
      setVikasStatus("error");
      setVikasError(
        error instanceof Error ? error.message : "Form submit nahi ho paya. Please try again.",
      );
    }
  }

  return (
    <>
      <header className="sticky top-0 z-50 shadow-[0_2px_12px_rgba(18,58,114,.18)]">
        <div className="hidden border-b border-white/10 bg-[#123a72] text-white md:block">
          <div className="mx-auto flex h-[42px] max-w-[1720px] items-center justify-between gap-4 px-8 text-[14px] font-bold xl:px-14">
            <p className="flex min-w-0 items-center gap-2 truncate">
              <MapPin className="h-4 w-4 fill-white/15" />
              {site.topbar}
            </p>
            <div className="flex shrink-0 items-center gap-12">
              <a href={`tel:${site.phone}`} className="flex items-center gap-1.5 hover:text-gold">
                <Phone className="h-4 w-4 fill-white/15" /> {site.phone}
              </a>
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-1.5 hover:text-gold"
              >
                <Mail className="h-4 w-4 fill-white/15" /> {site.email}
              </a>
              <div className="flex items-center gap-3">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="grid h-7 w-7 place-items-center rounded-full border border-[#4a9e72]/65 bg-[#0e2f5e]/30 text-white hover:bg-saffron"
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-[#dde5f0] bg-white/98 backdrop-blur">
          <div className="mx-auto grid h-[104px] max-w-[1720px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 md:px-8 lg:flex lg:justify-between xl:px-14">
            <Link
              href="/"
              className="flex min-w-0 items-center gap-2"
              onClick={() => setOpen(false)}
            >
              <Logo />
            </Link>

            <nav className="hidden items-center gap-6 lg:flex xl:gap-8">
              {nav.map((item) => (
                <Link
                  key={item.label}
                  href={item.to}
                  className={`whitespace-nowrap text-[15px] font-extrabold transition-colors hover:text-[#0f7a42] ${
                    pathname === item.to ? "text-[#0f7a42]" : "text-[#33384a]"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/#demo-form"
                className="ml-1 whitespace-nowrap rounded-lg bg-[#159a56] px-6 py-4 text-[15px] font-extrabold text-white shadow-[0_8px_18px_rgba(21,154,86,.22)] transition-transform hover:scale-[1.03]"
              >
                मेरे नाम से डेमो बनाइए
              </Link>
            </nav>

            <button
              aria-label="मेन्यू"
              onClick={() => setOpen((v) => !v)}
              className="grid h-11 w-11 shrink-0 place-items-center rounded-md border border-border text-maroon lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {open && (
            <nav className="border-t border-border bg-white px-4 py-3 lg:hidden">
              <div className="flex flex-col">
                {nav.map((item) => (
                  <Link
                    key={item.label}
                    href={item.to}
                    onClick={() => setOpen(false)}
                    className={`border-b border-border/60 py-3 text-sm font-bold ${
                      pathname === item.to ? "text-saffron" : "text-neutral-800"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href="/#demo-form"
                  onClick={() => setOpen(false)}
                  className="mt-4 rounded-md bg-saffron px-4 py-3 text-center text-sm font-bold text-white"
                >
                  मेरे नाम से डेमो बनाइए
                </Link>
                <a
                  href={`tel:${site.phone}`}
                  className="mt-2 rounded-md border border-border px-4 py-3 text-center text-sm font-bold text-maroon"
                >
                  {site.phone}
                </a>
                <button
                  type="button"
                  onClick={openVikasForm}
                  className="mt-2 rounded-md border border-border px-4 py-3 text-center text-sm font-bold text-[#123a72]"
                >
                  Vikas Mitra Join
                </button>
              </div>
            </nav>
          )}
        </div>
      </header>

      <a
        href={site.whatsappUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp"
        className={`fixed right-5 bottom-5 z-50 items-center gap-2 rounded-full bg-[#25d366] px-5 py-3 text-sm font-extrabold text-white shadow-[0_12px_28px_rgba(37,211,102,.35)] transition-transform hover:scale-105 ${
          pathname === "/" ? "hidden md:inline-flex" : "inline-flex"
        }`}
      >
        <MessageCircle className="h-5 w-5" />
        WhatsApp
      </a>

      {vikasOpen && (
        <div className="fixed inset-0 z-[80] grid place-items-center bg-[#0a1526]/70 px-4 py-6 backdrop-blur-sm">
          <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-[#f7faff] shadow-[0_24px_70px_rgba(29,9,8,.42)]">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-emerald-200 bg-[#f7faff] px-5 py-4">
              <div>
                <p className="text-xs font-extrabold tracking-[0.16em] text-saffron uppercase">
                  Profile Registration
                </p>
                <h3 className="mt-1 font-display text-2xl font-black text-maroon">
                  Vikas Mitra Join Form
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setVikasOpen(false)}
                aria-label="Close Vikas Mitra form"
                className="grid h-10 w-10 place-items-center rounded-full border border-emerald-200 text-maroon hover:bg-emerald-50"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {vikasStatus === "done" ? (
              <div className="p-5">
                <div className="rounded-lg border border-green-200 bg-green-50 p-5 text-center">
                  <CheckCircle2 className="mx-auto h-12 w-12 text-[#1b7650]" />
                  <h4 className="mt-3 text-2xl font-black text-[#165f42]">
                    Profile submit ho gayi
                  </h4>
                  <p className="mx-auto mt-3 max-w-md text-sm font-extrabold leading-relaxed text-[#1b7650]">
                    24 hr ka wait kro. Admin approval karega tab jakar website me show hoga.
                    Approval ke baad aapka card ban jayega.
                  </p>
                  {vikasSubmittedId && (
                    <div className="mx-auto mt-4 max-w-sm rounded-md border border-green-200 bg-white px-4 py-3">
                      <p className="text-xs font-black uppercase tracking-[0.16em] text-[#1b7650]/70">
                        Unique ID
                      </p>
                      <p className="mt-1 break-all text-lg font-black text-maroon">
                        {vikasSubmittedId}
                      </p>
                    </div>
                  )}
                  <p className="mt-4 text-xs font-bold text-[#1b7650]/80">
                    Ye window 10 sec me automatically close ho jayegi.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={submitVikasMitra} className="grid gap-4 p-5 sm:grid-cols-2">
                <div>
                  <label
                    className="mb-1.5 block text-xs font-extrabold text-[#33384a]"
                    htmlFor="vikas-name"
                  >
                    नाम *
                  </label>
                  <input
                    id="vikas-name"
                    name="name"
                    required
                    className={field}
                    placeholder="आपका नाम"
                  />
                </div>
                <div>
                  <label
                    className="mb-1.5 block text-xs font-extrabold text-[#33384a]"
                    htmlFor="vikas-phone"
                  >
                    मोबाइल नंबर *
                  </label>
                  <input
                    id="vikas-phone"
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
                    htmlFor="vikas-email"
                  >
                    ईमेल
                  </label>
                  <input
                    id="vikas-email"
                    name="email"
                    type="email"
                    className={field}
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label
                    className="mb-1.5 block text-xs font-extrabold text-[#33384a]"
                    htmlFor="vikas-district"
                  >
                    जिला *
                  </label>
                  <input
                    id="vikas-district"
                    name="district"
                    required
                    className={field}
                    placeholder="जैसे: जयपुर"
                  />
                </div>
                <div>
                  <label
                    className="mb-1.5 block text-xs font-extrabold text-[#33384a]"
                    htmlFor="vikas-tehsil"
                  >
                    तहसील / ब्लॉक *
                  </label>
                  <input
                    id="vikas-tehsil"
                    name="tehsil"
                    required
                    className={field}
                    placeholder="तहसील / ब्लॉक"
                  />
                </div>
                <div>
                  <label
                    className="mb-1.5 block text-xs font-extrabold text-[#33384a]"
                    htmlFor="vikas-village"
                  >
                    गांव / शहर *
                  </label>
                  <input
                    id="vikas-village"
                    name="village"
                    required
                    className={field}
                    placeholder="गांव / शहर"
                  />
                </div>
                <div>
                  <label
                    className="mb-1.5 block text-xs font-extrabold text-[#33384a]"
                    htmlFor="vikas-occupation"
                  >
                    व्यवसाय / प्रोफेशन
                  </label>
                  <input
                    id="vikas-occupation"
                    name="occupation"
                    className={field}
                    placeholder="व्यवसाय / काम"
                  />
                </div>
                <div>
                  <label
                    className="mb-1.5 block text-xs font-extrabold text-[#33384a]"
                    htmlFor="vikas-photo"
                  >
                    Profile Photo
                  </label>
                  <input
                    id="vikas-photo"
                    name="photo"
                    type="file"
                    accept="image/*"
                    onChange={async (event) => {
                      const file = event.currentTarget.files?.[0];
                      setPhotoPreview(file ? await readPhoto(file) : "");
                    }}
                    className={fileField}
                  />
                </div>
                <div>
                  <label
                    className="mb-1.5 block text-xs font-extrabold text-[#33384a]"
                    htmlFor="vikas-pan"
                  >
                    PAN Card की फोटो
                  </label>
                  <input
                    id="vikas-pan"
                    name="panCard"
                    type="file"
                    accept="image/*"
                    onChange={async (event) => {
                      const file = event.currentTarget.files?.[0];
                      setPanPreview(file ? await readPhoto(file) : "");
                    }}
                    className={fileField}
                  />
                </div>
                <div>
                  <label
                    className="mb-1.5 block text-xs font-extrabold text-[#33384a]"
                    htmlFor="vikas-aadhaar"
                  >
                    Aadhaar Card की फोटो
                  </label>
                  <input
                    id="vikas-aadhaar"
                    name="aadhaarCard"
                    type="file"
                    accept="image/*"
                    onChange={async (event) => {
                      const file = event.currentTarget.files?.[0];
                      setAadhaarPreview(file ? await readPhoto(file) : "");
                    }}
                    className={fileField}
                  />
                </div>
                <div>
                  <label
                    className="mb-1.5 block text-xs font-extrabold text-[#33384a]"
                    htmlFor="vikas-experience"
                  >
                    अनुभव
                  </label>
                  <select id="vikas-experience" name="experience" className={field} defaultValue="">
                    <option value="" disabled>
                      अनुभव चुनें
                    </option>
                    <option value="नया">नया</option>
                    <option value="1-2 साल">1-2 साल</option>
                    <option value="3-5 साल">3-5 साल</option>
                    <option value="5+ साल">5+ साल</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label
                    className="mb-1.5 block text-xs font-extrabold text-[#33384a]"
                    htmlFor="vikas-message"
                  >
                    अतिरिक्त जानकारी
                  </label>
                  <textarea
                    id="vikas-message"
                    name="message"
                    rows={4}
                    className={field}
                    placeholder="आप Vikas Mitra क्यों join करना चाहते हैं?"
                  />
                </div>
                {photoPreview && (
                  <div className="sm:col-span-2">
                    <p className="mb-2 text-xs font-extrabold text-[#33384a]">Real Photo Preview</p>
                    <div className="relative h-56 overflow-hidden rounded-lg border border-emerald-200 bg-emerald-50">
                      <img
                        src={photoPreview}
                        alt="Selected Vikas Mitra profile"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                )}
                {panPreview && (
                  <div>
                    <p className="mb-2 text-xs font-extrabold text-[#33384a]">PAN Card Preview</p>
                    <div className="relative h-44 overflow-hidden rounded-lg border border-emerald-200 bg-emerald-50">
                      <img
                        src={panPreview}
                        alt="Selected PAN card"
                        className="h-full w-full object-contain"
                      />
                    </div>
                  </div>
                )}
                {aadhaarPreview && (
                  <div>
                    <p className="mb-2 text-xs font-extrabold text-[#33384a]">
                      Aadhaar Card Preview
                    </p>
                    <div className="relative h-44 overflow-hidden rounded-lg border border-emerald-200 bg-emerald-50">
                      <img
                        src={aadhaarPreview}
                        alt="Selected Aadhaar card"
                        className="h-full w-full object-contain"
                      />
                    </div>
                  </div>
                )}

                <div className="sm:col-span-2">
                  <label className="flex items-start gap-2.5 text-xs font-bold text-[#33384a]">
                    <input
                      type="checkbox"
                      name="agree"
                      checked={agree}
                      onChange={(event) => setAgree(event.currentTarget.checked)}
                      className="mt-0.5 h-4 w-4 shrink-0 accent-maroon"
                    />
                    <span>
                      मैं{" "}
                      <Link
                        href="/privacy-policy"
                        target="_blank"
                        className="font-extrabold text-maroon underline underline-offset-2 hover:text-saffron"
                      >
                        प्राइवेसी पॉलिसी
                      </Link>{" "}
                      से सहमत हूँ। (फॉर्म सबमिट करने के लिए ज़रूरी है)
                    </span>
                  </label>
                </div>

                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    disabled={vikasStatus === "loading" || !agree}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-maroon px-6 py-3.5 text-sm font-extrabold text-white transition-colors hover:bg-[#123a72] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {vikasStatus === "loading" ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <ArrowRight className="h-4 w-4" />
                    )}
                    Profile Submit करें
                  </button>
                  {vikasStatus === "error" && (
                    <p className="mt-3 text-sm font-bold text-destructive">
                      {vikasError || "Form submit nahi ho paya. Please try again."}
                    </p>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
