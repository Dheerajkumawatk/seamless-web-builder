"use client";

import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import { site } from "@/data/site";

const message = "नमस्ते, मुझे भारत पहचान की सेवाओं और वेबसाइट पैकेज के बारे में जानकारी चाहिए।";

export function CtaBand() {
  const whatsappHref = `${site.whatsappUrl}?text=${encodeURIComponent(message)}`;

  return (
    <section className="bg-[#f4f8ff] px-4 py-10 sm:py-12">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[28px] bg-[linear-gradient(135deg,#123a72_0%,#1b4c8a_50%,#168454_100%)] px-6 py-8 text-white shadow-[0_22px_54px_rgba(14,47,94,.22)] sm:px-10 lg:px-14 lg:py-11">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-center">
          <div>
            <p className="text-[12px] font-extrabold tracking-[0.18em] text-white/68 uppercase">
              BharatPahchan Support
            </p>
            <h2 className="mt-4 max-w-4xl font-display text-3xl leading-tight font-black text-white sm:text-4xl">
              अपने चुनाव अभियान को डिजिटल पहचान के साथ मजबूत बनाइए।
            </h2>
            <p className="mt-4 max-w-4xl text-base leading-relaxed font-semibold text-white/82 sm:text-lg">
              उम्मीदवार वेबसाइट, सोशल मीडिया, वीडियो, ग्राफिक्स और डिजिटल आउटरीच के लिए हमारी टीम से
              सीधे बात करें।
            </p>
          </div>

          <div className="flex flex-col gap-4 lg:items-stretch">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#25d366] px-8 py-5 text-base font-extrabold text-white shadow-[0_16px_28px_rgba(21,154,86,.28)] transition-transform hover:scale-[1.02]"
            >
              <MessageCircle className="h-5 w-5" />
              WhatsApp पर बात करें <ArrowRight className="h-5 w-5" />
            </a>
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
  );
}
