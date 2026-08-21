"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
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
  const [photoPreview, setPhotoPreview] = useState("");
  const socialLinks = [
    { icon: Facebook, href: site.socialLinks.facebook, label: "Facebook" },
    { icon: Instagram, href: site.socialLinks.instagram, label: "Instagram" },
    { icon: Youtube, href: site.socialLinks.youtube, label: "YouTube" },
    { icon: MessageCircle, href: site.whatsappUrl, label: "WhatsApp" },
  ];
  const field =
    "w-full rounded-md border border-[#efd5bc] bg-white px-3.5 py-3 text-sm font-semibold text-[#321815] outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/25";

  function openVikasForm() {
    setVikasStatus("idle");
    setPhotoPreview("");
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
    setVikasStatus("loading");
    const photoFile = data.get("photo");
    const photo = photoFile instanceof File && photoFile.size > 0 ? await readPhoto(photoFile) : "";

    const details = [
      `नाम: ${String(data.get("name") ?? "")}`,
      `मोबाइल: ${String(data.get("phone") ?? "")}`,
      `ईमेल: ${String(data.get("email") ?? "")}`,
      `जिला: ${String(data.get("district") ?? "")}`,
      `तहसील/ब्लॉक: ${String(data.get("tehsil") ?? "")}`,
      `गांव/शहर: ${String(data.get("village") ?? "")}`,
      `व्यवसाय/प्रोफेशन: ${String(data.get("occupation") ?? "")}`,
      `अनुभव: ${String(data.get("experience") ?? "")}`,
      `संदेश: ${String(data.get("message") ?? "")}`,
    ].join("\n");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(data.get("name") ?? ""),
          phone: String(data.get("phone") ?? ""),
          email: String(data.get("email") ?? ""),
          post: "Vikas Mitra Join",
          state: String(data.get("district") ?? ""),
          message: details,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit Vikas Mitra profile");
      }

      const profileResponse = await fetch("/api/vikas-mitra", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(data.get("name") ?? ""),
          phone: String(data.get("phone") ?? ""),
          email: String(data.get("email") ?? ""),
          district: String(data.get("district") ?? ""),
          tehsil: String(data.get("tehsil") ?? ""),
          village: String(data.get("village") ?? ""),
          occupation: String(data.get("occupation") ?? ""),
          experience: String(data.get("experience") ?? ""),
          message: String(data.get("message") ?? ""),
          photo,
        }),
      });

      if (!profileResponse.ok) {
        throw new Error("Failed to create Vikas Mitra public profile");
      }

      setVikasStatus("done");
      setPhotoPreview("");
      form.reset();
    } catch {
      setVikasStatus("error");
    }
  }

  return (
    <>
      <header className="sticky top-0 z-50 shadow-[0_2px_12px_rgba(76,7,9,.18)]">
        <div className="hidden border-b border-white/10 bg-[#6d070b] text-white md:block">
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
                    className="grid h-7 w-7 place-items-center rounded-full border border-[#d96a24]/65 bg-[#4f0708]/30 text-white hover:bg-saffron"
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-[#eaded6] bg-white/98 backdrop-blur">
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
                  className={`whitespace-nowrap text-[15px] font-extrabold transition-colors hover:text-[#e95a09] ${
                    pathname === item.to ? "text-[#e95a09]" : "text-[#4b302b]"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/"
                className="ml-1 whitespace-nowrap rounded-lg bg-[#f3630b] px-6 py-4 text-[15px] font-extrabold text-white shadow-[0_8px_18px_rgba(243,99,11,.22)] transition-transform hover:scale-[1.03]"
              >
                फ्री कंसल्टेशन बुक करें
              </Link>
              <button
                type="button"
                onClick={openVikasForm}
                className="whitespace-nowrap rounded-lg bg-[#6d070b] px-6 py-4 text-[15px] font-extrabold text-white shadow-[0_8px_18px_rgba(109,7,11,.18)] transition-transform hover:scale-[1.03] hover:bg-[#801015]"
              >
                Vikas Mitra Join
              </button>
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
                  href="/"
                  onClick={() => setOpen(false)}
                  className="mt-4 rounded-md bg-saffron px-4 py-3 text-center text-sm font-bold text-white"
                >
                  फ्री कंसल्टेशन बुक करें
                </Link>
                <button
                  type="button"
                  onClick={openVikasForm}
                  className="mt-2 rounded-md bg-maroon px-4 py-3 text-center text-sm font-bold text-white"
                >
                  Vikas Mitra Join
                </button>
                <a
                  href={`tel:${site.phone}`}
                  className="mt-2 rounded-md border border-border px-4 py-3 text-center text-sm font-bold text-maroon"
                >
                  {site.phone}
                </a>
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
        className="fixed right-5 bottom-5 z-50 inline-flex items-center gap-2 rounded-full bg-[#25d366] px-5 py-3 text-sm font-extrabold text-white shadow-[0_12px_28px_rgba(37,211,102,.35)] transition-transform hover:scale-105"
      >
        <MessageCircle className="h-5 w-5" />
        WhatsApp
      </a>

      {vikasOpen && (
        <div className="fixed inset-0 z-[80] grid place-items-center bg-[#1d0908]/70 px-4 py-6 backdrop-blur-sm">
          <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-[#fffaf2] shadow-[0_24px_70px_rgba(29,9,8,.42)]">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-orange-200 bg-[#fffaf2] px-5 py-4">
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
                className="grid h-10 w-10 place-items-center rounded-full border border-orange-200 text-maroon hover:bg-orange-50"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={submitVikasMitra} className="grid gap-4 p-5 sm:grid-cols-2">
              <div>
                <label
                  className="mb-1.5 block text-xs font-extrabold text-[#4b302b]"
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
                  className="mb-1.5 block text-xs font-extrabold text-[#4b302b]"
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
                  className="mb-1.5 block text-xs font-extrabold text-[#4b302b]"
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
                  className="mb-1.5 block text-xs font-extrabold text-[#4b302b]"
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
                  className="mb-1.5 block text-xs font-extrabold text-[#4b302b]"
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
                  className="mb-1.5 block text-xs font-extrabold text-[#4b302b]"
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
                  className="mb-1.5 block text-xs font-extrabold text-[#4b302b]"
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
                  className="mb-1.5 block text-xs font-extrabold text-[#4b302b]"
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
                  className="w-full rounded-md border border-[#efd5bc] bg-white px-3.5 py-2.5 text-sm font-semibold text-[#321815] file:mr-3 file:rounded-md file:border-0 file:bg-saffron file:px-3 file:py-2 file:text-xs file:font-extrabold file:text-white focus:border-saffron focus:ring-2 focus:ring-saffron/25 focus:outline-none"
                />
              </div>
              <div>
                <label
                  className="mb-1.5 block text-xs font-extrabold text-[#4b302b]"
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
                  className="mb-1.5 block text-xs font-extrabold text-[#4b302b]"
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
                  <p className="mb-2 text-xs font-extrabold text-[#4b302b]">Real Photo Preview</p>
                  <div className="relative h-56 overflow-hidden rounded-lg border border-orange-200 bg-orange-50">
                    <img
                      src={photoPreview}
                      alt="Selected Vikas Mitra profile"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              )}

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  disabled={vikasStatus === "loading"}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-maroon px-6 py-3.5 text-sm font-extrabold text-white transition-colors hover:bg-[#6d070b] disabled:opacity-70"
                >
                  {vikasStatus === "loading" ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <ArrowRight className="h-4 w-4" />
                  )}
                  Profile Submit करें
                </button>
                {vikasStatus === "done" && (
                  <div className="mt-3 rounded-md bg-green-50 p-3 text-sm font-extrabold text-[#1b7650]">
                    <p className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4" />
                      Profile submit ho gayi. हमारी टीम जल्द संपर्क करेगी।
                    </p>
                    <Link href="/vikas-mitra" className="mt-2 inline-block text-maroon underline">
                      Vikas Mitra profiles देखें
                    </Link>
                  </div>
                )}
                {vikasStatus === "error" && (
                  <p className="mt-3 text-sm font-bold text-destructive">
                    Form submit nahi ho paya. कृपया दोबारा प्रयास करें।
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
