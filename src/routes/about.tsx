import { Check, Target, Eye, HeartHandshake } from "lucide-react";
import { PageHero, Section, SectionHeading } from "@/components/site/Section";
import { CtaBand } from "@/components/site/CtaBand";
import { stats, faqs } from "@/data/site";
import { images } from "@/data/images";

const values = [
  {
    icon: Target,
    title: "हमारा मिशन",
    text: "हर उम्मीदवार तक किफ़ायती और प्रभावी डिजिटल अभियान पहुँचाना।",
  },
  { icon: Eye, title: "हमारा विज़न", text: "भारत के हर गाँव में डिजिटल राजनीतिक जागरूकता लाना।" },
  {
    icon: HeartHandshake,
    title: "हमारे मूल्य",
    text: "पारदर्शिता, समय की पाबंदी और पूरी ज़िम्मेदारी।",
  },
];

export default function About() {
  return (
    <>
      <PageHero
        title="हमारे बारे में"
        sub="भारत पहचान — ग्रामीण और स्थानीय चुनाव अभियानों के लिए समर्पित डिजिटल टीम।"
      />

      <Section>
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <img
            src={images["village"]}
            width={800}
            height={600}
            loading="lazy"
            alt="भारतीय गाँव"
            className="w-full rounded-lg object-cover"
          />
          <div>
            <h2 className="font-display text-2xl text-maroon">गाँव की आवाज़, डिजिटल पहचान</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              2018 से हम पंचायत, ब्लॉक और जिला स्तर के उम्मीदवारों के लिए वेबसाइट, सोशल मीडिया,
              व्हाट्सएप अभियान और वीडियो कंटेंट बना रहे हैं। हमारी टीम में डिज़ाइनर, कंटेंट राइटर,
              वीडियो एडिटर और कैंपेन मैनेजर शामिल हैं जो स्थानीय भाषा और संस्कृति को समझते हैं।
            </p>
            <ul className="mt-5 space-y-2.5">
              {[
                "100+ उम्मीदवारों के साथ काम का अनुभव",
                "हिंदी और क्षेत्रीय भाषाओं में कंटेंट",
                "चुनाव आयोग नियमों के अनुरूप प्रचार सामग्री",
                "समर्पित अकाउंट मैनेजर और तेज़ सपोर्ट",
              ].map((t) => (
                <li key={t} className="flex gap-2.5 text-sm text-foreground/85">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-saffron" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section muted>
        <SectionHeading title="मिशन, विज़न और मूल्य" />
        <div className="mt-9 grid gap-5 md:grid-cols-3">
          {values.map((v) => (
            <article key={v.title} className="card-warm p-6 text-center">
              <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-saffron/12 ring-1 ring-saffron/30">
                <v.icon className="h-5 w-5 text-saffron" />
              </span>
              <h3 className="mt-4 text-base text-maroon">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.text}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="card-warm p-5 text-center">
              <p className="font-display text-2xl font-bold text-saffron">{s.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section muted>
        <SectionHeading title="अक्सर पूछे जाने वाले सवाल" />
        <div className="mx-auto mt-9 max-w-3xl space-y-4">
          {faqs.map((f) => (
            <details key={f.q} className="card-warm p-5">
              <summary className="cursor-pointer text-sm font-semibold text-maroon">{f.q}</summary>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
