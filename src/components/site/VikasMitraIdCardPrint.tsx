"use client";

import { useRef, useState } from "react";
import { Download, Loader2, Mail, MapPin, Phone, UserRound } from "lucide-react";
import logoImage from "@/assets/bharat-pahchan-logo.jpg";
import { site } from "@/data/site";

type CardProfile = {
  idNumber: string;
  name: string;
  phone: string;
  district: string;
  tehsil: string;
  photo?: string | undefined;
  issueDate: string;
  validUntil: string;
};

export function VikasMitraIdCardPrint({ profile }: { profile: CardProfile }) {
  const cardRef = useRef<HTMLElement>(null);
  const [downloading, setDownloading] = useState<"png" | "pdf" | null>(null);
  const [downloadError, setDownloadError] = useState("");

  async function downloadCard() {
    if (!cardRef.current || downloading) return;
    setDownloading("png");
    setDownloadError("");
    try {
      const { cardImageBlob } = await import("@/lib/card-image.client");
      const blob = await cardImageBlob(cardRef.current);
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Vikas-Mitra-${profile.idNumber}.png`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 60_000);
    } catch {
      setDownloadError("Card image download nahi ho payi. Page refresh karke dobara try karein.");
    } finally {
      setDownloading(null);
    }
  }

  async function downloadPdf() {
    if (!cardRef.current || downloading) return;
    setDownloading("pdf");
    setDownloadError("");
    try {
      const { cardPdfBlob } = await import("@/lib/card-image.client");
      const blob = await cardPdfBlob(cardRef.current);
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Vikas-Mitra-${profile.idNumber}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 60_000);
    } catch {
      setDownloadError(
        "PDF download nahi ho payi. Image (PNG) download karein ya dobara try karein.",
      );
    } finally {
      setDownloading(null);
    }
  }

  return (
    <main className="id-card-document flex min-h-screen items-start justify-center bg-slate-100 px-4 py-6 text-[#08245a] print:block print:bg-white print:p-0">
      <style
        dangerouslySetInnerHTML={{
          __html: `
            body > div > header,
            body > div > footer,
            body > div > main ~ * {
              display: none !important;
            }
            body > div {
              display: block !important;
              min-height: 100vh !important;
            }
            body > div > main {
              min-height: 100vh !important;
            }
            .id-card-panel > .relative.z-10 {
              height: 113.5%;
              width: 113.5%;
              margin-left: -6.75%;
              transform: scale(0.88);
              transform-origin: top center;
            }
            @page { size: A4 landscape; margin: 0; }
            @media print {
              .no-print { display: none !important; }
              html,
              body,
              body > div,
              body > div > main {
                width: 296mm;
                max-width: 296mm !important;
                height: 209mm;
                min-height: 209mm !important;
                max-height: 209mm !important;
                margin: 0 !important;
                padding: 0 !important;
                overflow: hidden;
              }
              body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
              .id-card-document {
                position: fixed !important;
                inset: 0 !important;
                width: 296mm !important;
                min-width: 296mm !important;
                max-width: 296mm !important;
                min-height: 209mm !important;
                height: 209mm !important;
                max-height: 209mm !important;
                margin: 0 !important;
                padding: 0 !important;
                background: white !important;
                overflow: hidden !important;
              }
              .id-card-page {
                display: flex !important;
                flex-direction: row !important;
                position: fixed !important;
                top: 6mm !important;
                left: 13mm !important;
                width: 270mm !important;
                height: 188mm !important;
                gap: 8mm !important;
                margin: 0 !important;
                padding: 0 !important;
                box-shadow: none !important;
                background: white !important;
                overflow: hidden !important;
                page-break-inside: avoid;
                page-break-before: avoid;
                page-break-after: avoid;
                break-inside: avoid;
              }
              .id-card-panel {
                width: 131mm !important;
                height: 183mm !important;
                flex: 0 0 131mm !important;
                box-shadow: none !important;
                page-break-inside: avoid;
                page-break-before: avoid;
                page-break-after: avoid;
                break-inside: avoid;
              }
            }
          `,
        }}
      />

      <div className="no-print fixed top-4 right-4 z-50 flex max-w-[calc(100%-2rem)] flex-wrap justify-end gap-2">
        <button
          type="button"
          onClick={downloadCard}
          disabled={Boolean(downloading)}
          className="inline-flex items-center gap-2 rounded-lg bg-[#123a72] px-5 py-3 text-sm font-black text-white shadow-sm disabled:opacity-60"
        >
          {downloading === "png" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Download className="h-4 w-4" />
          )}
          {downloading === "png" ? "Image तैयार हो रही है…" : "ID Card Image (PNG) डाउनलोड करें"}
        </button>
        <button
          type="button"
          onClick={downloadPdf}
          disabled={Boolean(downloading)}
          className="inline-flex items-center gap-2 rounded-lg bg-[#123a72] px-5 py-3 text-sm font-black text-white shadow-sm disabled:opacity-60"
        >
          <Download className="h-4 w-4" />
          {downloading === "pdf" ? "PDF तैयार हो रही है…" : "Colour ID Card PDF डाउनलोड करें"}
        </button>
        {downloadError && (
          <p role="alert" className="w-full rounded-lg bg-white p-3 text-sm text-red-700">
            {downloadError}
          </p>
        )}
      </div>

      <section
        ref={cardRef}
        className="id-card-page flex max-w-7xl flex-col gap-6 rounded-xl bg-white p-4 shadow-xl print:max-w-none print:flex-row print:gap-5 print:rounded-none print:p-0 lg:flex-row"
      >
        <IdCardFront profile={profile} />
        <IdCardBack profile={profile} />
      </section>
    </main>
  );
}

function IdCardFront({ profile }: { profile: CardProfile }) {
  return (
    <article className="id-card-panel relative aspect-[63/88] w-full overflow-hidden rounded-[18px] border border-slate-200 bg-white shadow-lg print:rounded-[10px]">
      <CornerBands />
      <div className="relative z-10 flex h-full flex-col px-7 pt-7 pb-6 text-center">
        <img
          src={logoImage.src}
          width={1254}
          height={1254}
          alt="Bharat Pahchan"
          className="mx-auto h-28 w-28 object-contain"
        />
        <h2 className="mt-3 text-[42px] leading-none font-black text-[#08245a]">विकास मित्र</h2>
        <div className="mt-1 flex items-center justify-center gap-3">
          <span className="h-1 w-20 rounded-full bg-[#ff720e]" />
          <span className="text-xl font-black tracking-[0.3em] text-[#08245a]">VIKAS MITRA</span>
          <span className="h-1 w-20 rounded-full bg-[#159a56]" />
        </div>

        <div className="mx-auto mt-5 grid h-40 w-40 place-items-center overflow-hidden rounded-xl border-2 border-slate-300 bg-slate-50">
          {profile.photo ? (
            <img src={profile.photo} alt={profile.name} className="h-full w-full object-cover" />
          ) : (
            <div className="text-center text-slate-400">
              <UserRound className="mx-auto h-20 w-20" />
              <p className="mt-1 text-sm font-black">PHOTO</p>
            </div>
          )}
        </div>

        <h3 className="mt-4 text-[34px] leading-none font-black text-[#08245a]">{profile.name}</h3>
        <p className="mt-1 text-xl font-black text-[#08245a]">विकास मित्र</p>

        <div className="mx-auto mt-4 grid w-full max-w-[420px] grid-cols-[92px_12px_1fr] gap-y-2 text-left text-[17px] font-black">
          <span>Mitra ID</span>
          <span>:</span>
          <span>{profile.idNumber}</span>
          <span>जिला</span>
          <span>:</span>
          <span className="border-b border-[#08245a]">{profile.district}</span>
          <span>ब्लॉक</span>
          <span>:</span>
          <span className="border-b border-[#08245a]">{profile.tehsil}</span>
          <span>मोबाइल</span>
          <span>:</span>
          <span className="border-b border-[#08245a]">{profile.phone}</span>
        </div>

        <div className="mt-auto">
          <div className="mx-auto h-px w-52 bg-[#08245a]" />
          <p className="mt-2 text-base font-black">अधिकृत हस्ताक्षर</p>
        </div>
      </div>
      <BottomRibbon />
    </article>
  );
}

function IdCardBack({ profile }: { profile: CardProfile }) {
  return (
    <article className="id-card-panel relative aspect-[63/88] w-full overflow-hidden rounded-[18px] border border-slate-200 bg-white shadow-lg print:rounded-[10px]">
      <CornerBands />
      <div className="relative z-10 flex h-full flex-col px-8 pt-8 pb-7 text-center">
        <img
          src={logoImage.src}
          width={1254}
          height={1254}
          alt="Bharat Pahchan"
          className="mx-auto h-28 w-28 object-contain"
        />
        <div className="mx-auto mt-2 h-px w-full bg-slate-200" />
        <h2 className="mt-5 text-[34px] leading-tight font-black text-[#08245a]">
          विकास मित्र पहचान पत्र
        </h2>
        <div className="mt-2 flex items-center justify-center gap-3">
          <span className="h-1 w-28 rounded-full bg-[#ff720e]" />
          <span className="h-3 w-3 rounded-full bg-[#08245a]" />
          <span className="h-1 w-28 rounded-full bg-[#159a56]" />
        </div>

        <p className="mx-auto mt-7 max-w-[430px] text-[20px] leading-relaxed font-black">
          यह कार्ड भारत पहचान के विकास मित्र की पहचान हेतु है। खो जाने पर नीचे दिए गए नंबर पर संपर्क
          करें। यह सरकारी पहचान पत्र नहीं है।
        </p>

        <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 px-8 py-4">
          <div className="grid grid-cols-[120px_12px_1fr] gap-y-3 text-left text-[18px] font-black">
            <span>जारी तिथि</span>
            <span>:</span>
            <span className="border-b border-[#08245a]">{profile.issueDate}</span>
            <span>वैधता</span>
            <span>:</span>
            <span className="border-b border-[#08245a]">{profile.validUntil}</span>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-center gap-4">
            <span className="h-1 w-28 rounded-full bg-[#ff720e]" />
            <h3 className="text-2xl font-black">संपर्क</h3>
            <span className="h-1 w-28 rounded-full bg-[#159a56]" />
          </div>
          <div className="mx-auto mt-3 grid max-w-[430px] gap-2 text-left text-[18px] font-black">
            <ContactLine icon={<Phone className="h-5 w-5" />} value="+91 7891-131-132" />
            <ContactLine icon={<Mail className="h-5 w-5" />} value={site.email} />
            <ContactLine icon={<MapPin className="h-5 w-5" />} value="जयपुर, राजस्थान" />
            <ContactLine value="www.bharatpahchan.com" />
          </div>
        </div>

        <div className="mt-auto pb-10 text-lg font-black"></div>
      </div>
      <BottomRibbon />
    </article>
  );
}

function ContactLine({ icon, value }: { icon?: React.ReactNode; value: string }) {
  return (
    <p className="flex items-center gap-3">
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#123a72] text-white">
        {icon ?? <span className="text-sm">●</span>}
      </span>
      <span className="break-all">{value}</span>
    </p>
  );
}

function CornerBands() {
  return (
    <>
      <div className="absolute -top-16 -left-16 h-40 w-40 rounded-full border-[16px] border-[#ff720e]" />
      <div className="absolute -top-10 -left-10 h-36 w-36 rounded-full border-[10px] border-[#159a56]" />
      <div className="absolute -right-16 -bottom-16 h-40 w-40 rounded-full border-[16px] border-[#ff720e]" />
      <div className="absolute -right-10 -bottom-10 h-36 w-36 rounded-full border-[10px] border-[#159a56]" />
    </>
  );
}

function BottomRibbon() {
  return (
    <div className="absolute inset-x-0 bottom-0 z-20 bg-[#123a72] px-5 py-3 text-center text-xl font-black text-white">
      www.bharatpahchan.com
    </div>
  );
}
