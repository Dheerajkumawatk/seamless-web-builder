"use client";

import { useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, Loader2, UserRound } from "lucide-react";

export function PersonalizedDemoPreview({ whatsappBaseUrl }: { whatsappBaseUrl: string }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [district, setDistrict] = useState("");
  const [post, setPost] = useState("");
  const [preview, setPreview] = useState({ name: "आपका नाम", location: "आपका गांव / शहर" });
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState("");

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
      const response = await fetch("/api/demo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: nextPreview.name,
          phone: phone.trim(),
          post: post.trim() || undefined,
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
            "Lead Status: NEW",
          ].join("\n"),
        }),
      });

      if (!response.ok) {
        const errorData = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(errorData?.error ?? "Demo request submit nahi ho payi.");
      }

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

          <form onSubmit={showPreview} className="mt-7 grid gap-4 sm:grid-cols-2">
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
            {status === "done" && (
              <p className="flex items-start gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700 sm:col-span-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                धन्यवाद। हमारी टीम आपके नाम और क्षेत्र के अनुसार डेमो तैयार कर आपसे संपर्क करेगी।
              </p>
            )}
            {status === "error" && (
              <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700 sm:col-span-2">
                {error || "Form submit nahi ho paya. Please dobara try karein."}
              </p>
            )}
          </form>
        </div>

        <div className="rounded-lg border border-[#dbe8dd] bg-[#f6fbf8] p-5 shadow-card">
          <div className="rounded-lg bg-white p-5 shadow-sm">
            <div className="flex items-center gap-4 border-b border-[#e5efe8] pb-5">
              <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-[#159a56] text-white">
                <UserRound className="h-8 w-8" />
              </span>
              <div>
                <p className="text-xs font-black tracking-[0.16em] text-[#159a56] uppercase">
                  सैंपल प्रीव्यू
                </p>
                <h3 className="mt-1 font-display text-2xl font-black text-maroon">
                  {preview.name}
                </h3>
                <p className="text-sm font-bold text-[#596173]">{preview.location}</p>
              </div>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {["परिचय", "विकास योजना", "संपर्क"].map((item) => (
                <div key={item} className="rounded-lg border border-[#e5efe8] bg-[#fbfdfc] p-4">
                  <p className="text-sm font-black text-[#0e2f5e]">{item}</p>
                  <div className="mt-3 h-2 rounded bg-emerald-100" />
                  <div className="mt-2 h-2 w-2/3 rounded bg-[#dfe8f7]" />
                </div>
              ))}
            </div>
            <p className="mt-5 rounded-lg bg-[#fff8eb] px-4 py-3 text-sm font-bold text-[#8a4f00]">
              यह preview केवल demo request समझाने के लिए है। वास्तविक demo आपकी जानकारी के अनुसार
              टीम तैयार करेगी।
            </p>
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
