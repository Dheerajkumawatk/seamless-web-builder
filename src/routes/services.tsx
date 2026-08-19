import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { PageHero, Section, SectionHeading } from "@/components/site/Section";
import { CtaBand } from "@/components/site/CtaBand";
import { process, services } from "@/data/site";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "हमारी सेवाएँ — वेबसाइट, सोशल मीडिया, व्हाट्सएप अभियान" },
      {
        name: "description",
        content:
          "उम्मीदवार वेबसाइट, सोशल मीडिया मैनेजमेंट, व्हाट्सएप अभियान, वीडियो प्रोडक्शन, ग्राफ़िक डिज़ाइन और एनालिटिक्स रिपोर्टिंग।",
      },
      { property: "og:title", content: "हमारी सेवाएँ — भारत पहचान" },
      { property: "og:description", content: "चुनाव अभियान के लिए संपूर्ण डिजिटल सेवाएँ।" },
    ],
  }),
  component: Services,
});

function Services() {
  return (
    <>
      <PageHero
        title="हमारी सेवाएँ"
        sub="चुनाव अभियान की हर ज़रूरत के लिए एक ही जगह पर संपूर्ण डिजिटल समाधान।"
      />

      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((s) => (
            <article key={s.slug} className="card-warm p-6">
              <div className="flex items-start gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-md bg-saffron/12 ring-1 ring-saffron/30">
                  <s.icon className="h-5 w-5 text-saffron" />
                </span>
                <div className="min-w-0">
                  <h2 className="text-lg text-maroon">{s.title}</h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.short}</p>
                </div>
              </div>
              <ul className="mt-5 space-y-2.5">
                {s.points.map((p) => (
                  <li key={p} className="flex gap-2.5 text-sm text-foreground/85">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-saffron" />
                    {p}
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-saffron"
              >
                इस सेवा के बारे में पूछें <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </article>
          ))}
        </div>
      </Section>

      <Section muted>
        <SectionHeading title="हमारा काम करने का तरीका" />
        <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4 lg:grid-cols-7">
          {process.map((p) => (
            <div key={p.num} className="flex flex-col items-center text-center">
              <span className="grid h-14 w-14 place-items-center rounded-full border border-saffron/40 bg-card">
                <p.icon className="h-6 w-6 text-saffron" />
              </span>
              <span className="mt-3 font-display text-lg font-bold text-maroon">{p.num}</span>
              <span className="mt-1 text-xs leading-tight text-muted-foreground">{p.title}</span>
            </div>
          ))}
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
