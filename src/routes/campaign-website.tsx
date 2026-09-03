import Link from "next/link";
import { ArrowRight, Check, Smartphone, Gauge, ShieldCheck, Languages } from "lucide-react";
import { PageHero, Section, SectionHeading } from "@/components/site/Section";
import { CtaBand } from "@/components/site/CtaBand";
import { websiteSections } from "@/data/site";
import { images } from "@/data/images";

const highlights = [
  { icon: Smartphone, title: "मोबाइल फर्स्ट", text: "हर स्क्रीन पर परफ़ेक्ट दिखने वाली वेबसाइट" },
  { icon: Gauge, title: "तेज़ लोडिंग", text: "2G/3G पर भी तेज़ खुलने वाली हल्की वेबसाइट" },
  { icon: Languages, title: "स्थानीय भाषा", text: "हिंदी और क्षेत्रीय भाषा में पूरा कंटेंट" },
  { icon: ShieldCheck, title: "सुरक्षित होस्टिंग", text: "SSL सर्टिफिकेट और रोज़ाना बैकअप" },
];

export default function CampaignWebsite() {
  return (
    <>
      <PageHero
        title="अभियान वेबसाइट डेमो"
        sub="आपकी पहचान, आपका विज़न और आपका काम — सब कुछ एक प्रोफेशनल वेबसाइट पर।"
      />

      <Section className="website-demo-section" muted>
        <div className="rounded-lg border border-emerald-200 bg-white/45 p-4 shadow-card sm:p-6">
          <SectionHeading title="अभियान वेबसाइट डेमो" />
          <div className="mt-7 grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
            <img
              src={images["demo"]}
              width={1200}
              height={800}
              loading="lazy"
              alt="अभियान वेबसाइट का लैपटॉप और मोबाइल डेमो"
              className="w-full rounded-lg object-contain"
            />
            <div>
              <h2 className="text-lg text-maroon">वेबसाइट में शामिल सेक्शन</h2>
              <ul className="mt-4 space-y-2.5">
                {websiteSections.map((s) => (
                  <li key={s} className="flex items-center gap-2.5 text-sm text-foreground/85">
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-sm bg-saffron/15">
                      <Check className="h-3 w-3 text-saffron" />
                    </span>
                    {s}
                  </li>
                ))}
              </ul>
              <Link
                href="https://faithful-frontent.vercel.app/"
                className="mt-6 inline-flex items-center gap-2 rounded-md bg-maroon px-5 py-3 text-sm font-semibold text-white"
              >
                डेमो वेबसाइट देखें <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </Section>

      <Section muted>
        <SectionHeading title="वेबसाइट की खासियत" />
        <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((h) => (
            <article key={h.title} className="card-warm p-5 text-center">
              <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-saffron/12 ring-1 ring-saffron/30">
                <h.icon className="h-5 w-5 text-saffron" />
              </span>
              <h3 className="mt-4 text-base text-maroon">{h.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{h.text}</p>
            </article>
          ))}
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
