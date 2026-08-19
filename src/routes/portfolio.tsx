import { createFileRoute } from "@tanstack/react-router";
import { Quote } from "lucide-react";
import { PageHero, Section, SectionHeading } from "@/components/site/Section";
import { CtaBand } from "@/components/site/CtaBand";
import { portfolio, testimonials } from "@/data/site";
import { images } from "@/data/images";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "पोर्टफोलियो — हमारे चुनाव अभियान प्रोजेक्ट" },
      {
        name: "description",
        content:
          "सरपंच, पंचायत समिति और जिला परिषद उम्मीदवारों के लिए किए गए डिजिटल अभियान प्रोजेक्ट और ग्राहकों की राय।",
      },
      { property: "og:title", content: "पोर्टफोलियो — भारत पहचान" },
      { property: "og:description", content: "20+ राज्यों में 100+ उम्मीदवारों के अभियान।" },
    ],
  }),
  component: Portfolio,
});

function Portfolio() {
  return (
    <>
      <PageHero
        title="हमारा पोर्टफोलियो"
        sub="अलग-अलग राज्यों में किए गए सफल डिजिटल चुनाव अभियानों की झलक।"
      />

      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {portfolio.map((p, i) => (
            <article key={`${p.title}-${i}`} className="card-warm overflow-hidden">
              <img
                src={images[p.image]}
                width={800}
                height={600}
                loading="lazy"
                alt={p.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-5">
                <span className="rounded-sm bg-saffron/12 px-2 py-1 text-[11px] font-semibold text-saffron">
                  {p.type}
                </span>
                <h2 className="mt-3 text-base text-maroon">{p.title}</h2>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section muted>
        <SectionHeading title="ग्राहकों की राय" />
        <div className="mt-9 grid gap-5 lg:grid-cols-3">
          {testimonials.map((t) => (
            <article key={t.name} className="card-warm p-6">
              <Quote className="h-6 w-6 text-saffron/50" />
              <p className="mt-3 text-sm leading-relaxed text-foreground/85">"{t.quote}"</p>
              <div className="mt-5">
                <p className="text-sm font-semibold text-maroon">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
