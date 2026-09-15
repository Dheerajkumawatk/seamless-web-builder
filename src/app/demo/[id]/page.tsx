import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, MapPin, MessageCircle, Phone } from "lucide-react";
import { getDemoLead } from "@/lib/demo-request.server";
import { site } from "@/data/site";

type DemoPageProps = { params: Promise<{ id: string }> };

async function getDemo(id: string) {
  if (!/^[0-9a-f-]{36}$/i.test(id)) return null;
  return getDemoLead(id);
}

export async function generateMetadata({ params }: DemoPageProps): Promise<Metadata> {
  const demo = await getDemo((await params).id);
  if (!demo) return { title: "Demo website नहीं मिली" };
  return {
    title: `${demo.name} | चुनाव अभियान Demo Website`,
    description: `${demo.name} की ${demo.village || "स्थानीय क्षेत्र"}, ${demo.district || "भारत"} के लिए personalised चुनाव अभियान demo website।`,
    robots: { index: false, follow: false },
  };
}

export default async function DemoPage({ params }: DemoPageProps) {
  const demo = await getDemo((await params).id);
  if (!demo) notFound();

  const location = [demo.village, demo.district].filter(Boolean).join(", ");
  const post = demo.post || "स्थानीय चुनाव उम्मीदवार";
  const whatsapp = `${site.whatsappUrl}?text=${encodeURIComponent(`नमस्ते, मैं ${demo.name} की demo website के बारे में बात करना चाहता/चाहती हूँ।`)}`;
  const plans = [
    "साफ-सफाई और बेहतर स्थानीय सुविधाएं",
    "युवाओं के लिए शिक्षा और रोजगार सहयोग",
    "महिलाओं और वरिष्ठ नागरिकों की सुरक्षा",
    "पारदर्शी और जवाबदेह पंचायत व्यवस्था",
  ];

  return (
    <main className="bg-[#f7faf8] text-[#182638]">
      <section className="overflow-hidden bg-[linear-gradient(135deg,#0e2f5e_0%,#174b78_55%,#159a56_100%)] px-4 py-16 text-white sm:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1fr_360px]">
          <div>
            <p className="text-sm font-black tracking-[0.18em] text-emerald-200 uppercase">
              Personalised Election Demo
            </p>
            <h1 className="mt-5 max-w-4xl font-display text-4xl leading-tight font-black text-white sm:text-6xl">
              {demo.name}
            </h1>
            <p className="mt-3 text-xl font-bold text-white/90">{post}</p>
            <p className="mt-5 flex items-center gap-2 text-base font-semibold text-white/80">
              <MapPin className="h-5 w-5" /> {location}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={`tel:${demo.phone}`}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3.5 font-black text-[#0e2f5e]"
              >
                <Phone className="h-5 w-5" /> संपर्क करें
              </a>
              <a
                href={whatsapp}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#20a45b] px-6 py-3.5 font-black text-white"
              >
                <MessageCircle className="h-5 w-5" /> WhatsApp
              </a>
            </div>
          </div>
          {demo.photo && (
            <div className="relative mx-auto aspect-[4/5] w-full max-w-[340px] overflow-hidden rounded-3xl border-4 border-white/25 bg-white/10 shadow-2xl">
              <Image
                src={demo.photo}
                alt={demo.name}
                fill
                unoptimized
                priority
                sizes="340px"
                className="object-cover"
              />
            </div>
          )}
        </div>
      </section>

      <section className="px-4 py-14 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
          <article className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-card sm:p-8">
            <p className="text-xs font-black tracking-[0.18em] text-[#159a56] uppercase">
              मेरा परिचय
            </p>
            <h2 className="mt-3 text-3xl font-black text-[#0e2f5e]">जनसेवा का संकल्प</h2>
            <p className="mt-5 text-base leading-8 font-semibold text-[#566173]">
              मैं {demo.name}, {location} के लोगों के साथ मिलकर क्षेत्र का समग्र विकास करने के लिए
              प्रतिबद्ध हूँ। हर परिवार की बात सुनना और विकास कार्यों को पारदर्शिता से पूरा करना मेरा
              संकल्प है।
            </p>
          </article>
          <article className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-card sm:p-8">
            <p className="text-xs font-black tracking-[0.18em] text-[#159a56] uppercase">
              विकास योजना
            </p>
            <h2 className="mt-3 text-3xl font-black text-[#0e2f5e]">हमारी प्राथमिकताएं</h2>
            <ul className="mt-5 space-y-4">
              {plans.map((plan) => (
                <li key={plan} className="flex items-start gap-3 font-semibold text-[#465267]">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#159a56]" /> {plan}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="bg-[#0e2f5e] px-4 py-12 text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-bold text-white/70">
              यह आपकी automatically generated demo website है
            </p>
            <h2 className="mt-2 text-3xl font-black text-white">
              पूरी चुनाव वेबसाइट बनवाना चाहते हैं?
            </h2>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#159a56] px-6 py-4 font-black text-white"
          >
            भारत पहचान से बात करें <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}
