"use client";

import { useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, Eye, EyeOff, Loader2 } from "lucide-react";
import aiCampaignPreview from "@/assets/ai-campaign-preview.png";

export function PersonalizedDemoPreview({ whatsappBaseUrl }: { whatsappBaseUrl: string }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [district, setDistrict] = useState("");
  const [post, setPost] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [preview, setPreview] = useState({ name: "आपका नाम", location: "आपका गांव / शहर" });
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState("");
  const [demoUrl, setDemoUrl] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const contactHref = useMemo(() => {
    const details =
      preview.name === "आपका नाम" ? "" : `\nनाम: ${preview.name}\nगांव / शहर: ${preview.location}`;
    const message = `नमस्ते, मुझे भारत पहचान की सेवाओं और वेबसाइट पैकेज के बारे में जानकारी चाहिए।${details}`;
    return `${whatsappBaseUrl}?text=${encodeURIComponent(message)}`;
  }, [preview, whatsappBaseUrl]);

  async function showPreview(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextPreview = {
      name: name.trim() || "आपका नाम",
      location: location.trim() || "आपका गांव / ग्राम पंचायत",
    };
    setPreview(nextPreview);
    setStatus("loading");
    setError("");

    try {
      const params = new URLSearchParams(window.location.search);
      if (!photo) throw new Error("Candidate photo select karein.");
      const payload = new FormData();
      const values = {
        name: nextPreview.name,
        phone: phone.trim(),
        email: email.trim(),
        post: post.trim(),
        source: "BharatPahchan Website",
        village: location.trim(),
        district: district.trim(),
        pageUrl: window.location.href,
        utmSource: params.get("utm_source") || "",
        utmMedium: params.get("utm_medium") || "",
        utmCampaign: params.get("utm_campaign") || "",
        notes: [
          "Personalised Demo Request",
          `गांव / ग्राम पंचायत: ${location.trim() || "Not provided"}`,
          `जिला: ${district.trim() || "Not provided"}`,
          `किस पद के लिए: ${post.trim() || "Not provided"}`,
          `Email: ${email.trim()}`,
          `Password: ${password ? "Provided" : "Not provided"}`,
          "Lead Status: NEW",
        ].join("\n"),
      };
      Object.entries(values).forEach(([key, value]) => payload.append(key, value));
      payload.append("photo", photo);
      const response = await fetch("/api/demo-request", {
        method: "POST",
        body: payload,
      });

      if (!response.ok) {
        const errorData = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(errorData?.error ?? "Demo request submit nahi ho payi.");
      }

      const result = (await response.json()) as { demoUrl: string; emailSent: boolean };
      setDemoUrl(result.demoUrl);
      setEmailSent(result.emailSent);
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Form submit nahi ho paya.");
    }
  }

  return (
    <section
      id="demo-form"
      className="scroll-mt-28 border-b border-[#dbe8dd] bg-white px-4 py-12 sm:py-16"
    >
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <p className="text-xs font-black tracking-[0.18em] text-[#159a56] uppercase">
            Personalised Demo
          </p>
          <h2 className="mt-3 font-display text-3xl font-black leading-tight text-[#0e2f5e] sm:text-4xl">
            अपने नाम और क्षेत्र के अनुसार customised demo request भेजें
          </h2>
          <p className="mt-4 text-base leading-relaxed font-semibold text-[#4b5364]">
            Form submit होने के बाद हमारी टीम आपके नाम और क्षेत्र के अनुसार डेमो तैयार कर आपसे
            संपर्क करेगी।
          </p>

          <form acceptCharset="UTF-8" onSubmit={showPreview} className="mt-7 grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="demo-name" className="mb-1.5 block text-sm font-black text-[#232a3c]">
                नाम *
              </label>
              <input
                id="demo-name"
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="w-full rounded-lg border border-[#cfe2d5] bg-white px-4 py-3 text-base font-semibold text-[#232a3c] outline-none focus:border-[#159a56] focus:ring-2 focus:ring-[#159a56]/20"
                placeholder="जैसे: रमेश कुमार"
              />
            </div>
            <div>
              <label
                htmlFor="demo-phone"
                className="mb-1.5 block text-sm font-black text-[#232a3c]"
              >
                मोबाइल नंबर *
              </label>
              <input
                id="demo-phone"
                required
                inputMode="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                className="w-full rounded-lg border border-[#cfe2d5] bg-white px-4 py-3 text-base font-semibold text-[#232a3c] outline-none focus:border-[#159a56] focus:ring-2 focus:ring-[#159a56]/20"
                placeholder="+91"
              />
            </div>
            <div>
              <label
                htmlFor="demo-email"
                className="mb-1.5 block text-sm font-black text-[#232a3c]"
              >
                ईमेल *
              </label>
              <input
                id="demo-email"
                required
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-lg border border-[#cfe2d5] bg-white px-4 py-3 text-base font-semibold text-[#232a3c] outline-none focus:border-[#159a56] focus:ring-2 focus:ring-[#159a56]/20"
                placeholder="example@email.com"
              />
            </div>
            <div>
              <label
                htmlFor="demo-password"
                className="mb-1.5 block text-sm font-black text-[#232a3c]"
              >
                पासवर्ड *
              </label>
              <div className="relative">
                <input
                  id="demo-password"
                  required
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full rounded-lg border border-[#cfe2d5] bg-white px-4 py-3 pr-12 text-base font-semibold text-[#232a3c] outline-none focus:border-[#159a56] focus:ring-2 focus:ring-[#159a56]/20"
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  className="absolute right-3 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-lg text-[#526079] hover:bg-[#eef5ff] hover:text-[#0e2f5e]"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div>
              <label
                htmlFor="demo-location"
                className="mb-1.5 block text-sm font-black text-[#232a3c]"
              >
                गांव / ग्राम पंचायत *
              </label>
              <input
                id="demo-location"
                required
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                className="w-full rounded-lg border border-[#cfe2d5] bg-white px-4 py-3 text-base font-semibold text-[#232a3c] outline-none focus:border-[#159a56] focus:ring-2 focus:ring-[#159a56]/20"
                placeholder="जैसे: रामपुरा"
              />
            </div>
            <div>
              <label
                htmlFor="demo-district"
                className="mb-1.5 block text-sm font-black text-[#232a3c]"
              >
                जिला *
              </label>
              <input
                id="demo-district"
                required
                value={district}
                onChange={(event) => setDistrict(event.target.value)}
                className="w-full rounded-lg border border-[#cfe2d5] bg-white px-4 py-3 text-base font-semibold text-[#232a3c] outline-none focus:border-[#159a56] focus:ring-2 focus:ring-[#159a56]/20"
                placeholder="जैसे: जयपुर"
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="demo-photo"
                className="mb-1.5 block text-sm font-black text-[#232a3c]"
              >
                उम्मीदवार की फोटो *
              </label>
              <input
                id="demo-photo"
                type="file"
                required
                accept="image/png,image/jpeg,image/webp"
                onChange={(event) => {
                  const file = event.target.files?.[0] ?? null;
                  setPhoto(file);
                  if (photoPreview) URL.revokeObjectURL(photoPreview);
                  setPhotoPreview(file ? URL.createObjectURL(file) : "");
                }}
                className="w-full rounded-lg border border-[#cfe2d5] bg-white px-4 py-3 text-sm font-semibold file:mr-4 file:rounded-md file:border-0 file:bg-[#159a56] file:px-4 file:py-2 file:font-bold file:text-white"
              />
              <p className="mt-1 text-xs font-semibold text-[#667085]">
                JPG, PNG या WebP — अधिकतम 5 MB
              </p>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="demo-post" className="mb-1.5 block text-sm font-black text-[#232a3c]">
                किस पद के लिए तैयारी
              </label>
              <select
                id="demo-post"
                value={post}
                onChange={(event) => setPost(event.target.value)}
                className="w-full rounded-lg border border-[#cfe2d5] bg-white px-4 py-3 text-base font-semibold text-[#232a3c] outline-none focus:border-[#159a56] focus:ring-2 focus:ring-[#159a56]/20"
              >
                <option value="">Optional</option>
                <option value="सरपंच उम्मीदवार">सरपंच उम्मीदवार</option>
                <option value="पंचायत समिति उम्मीदवार">पंचायत समिति उम्मीदवार</option>
                <option value="जिला परिषद उम्मीदवार">जिला परिषद उम्मीदवार</option>
                <option value="अन्य स्थानीय चुनाव उम्मीदवार">अन्य स्थानीय चुनाव उम्मीदवार</option>
              </select>
            </div>
            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0e2f5e] px-6 py-3.5 text-base font-black text-white sm:col-span-2"
            >
              {status === "loading" ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <ArrowRight className="h-5 w-5" />
              )}
              मेरे नाम से डेमो बनाइए
            </button>
            {status === "done" && demoUrl && (
              <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700 sm:col-span-2">
                <p className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                  {emailSent
                    ? "धन्यवाद। आपकी demo website तैयार है और उसका link आपके email पर भेज दिया गया है।"
                    : "आपकी demo website तैयार है। Email delivery नहीं हो पाई, इसलिए नीचे दिए button से website खोलें।"}
                </p>
                <a
                  href={demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex rounded-md bg-[#159a56] px-4 py-2 text-white"
                >
                  Demo Website खोलें
                </a>
              </div>
            )}
            {status === "error" && (
              <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700 sm:col-span-2">
                {error || "Form submit nahi ho paya. Please dobara try karein."}
              </p>
            )}
          </form>
        </div>

        <div className="overflow-hidden rounded-lg border border-[#dbe8dd] bg-white shadow-card">
          <img
            src={aiCampaignPreview.src}
            width={2048}
            height={878}
            alt="AI generated digital campaign workspace"
            loading="lazy"
            className="h-[320px] w-full object-cover sm:h-[430px] lg:h-full"
          />
          <div className="border-t border-[#dbe8dd] p-5">
            <div className="flex items-center gap-4">
              {photoPreview && (
                <img
                  src={photoPreview}
                  alt="Candidate preview"
                  className="h-16 w-16 shrink-0 rounded-full object-cover ring-2 ring-emerald-200"
                />
              )}
              <div>
                <p className="text-sm font-black text-[#159a56]">AI Campaign Image</p>
                <h3 className="mt-1 font-display text-2xl font-black text-[#0e2f5e]">
                  {preview.name} ke liye modern digital campaign look
                </h3>
                <p className="mt-2 text-sm font-bold text-[#596173]">{preview.location}</p>
              </div>
            </div>
            <a
              href={contactHref}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#159a56] px-5 py-3.5 text-base font-black text-white"
            >
              WhatsApp पर भी पूछें
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
