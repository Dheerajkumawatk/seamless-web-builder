import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Quote } from "lucide-react";
import {
  audiences,
  heroFeatures,
  packages,
  process,
  services,
  stats,
  testimonials,
  websiteSections,
} from "@/data/site";
import { images } from "@/data/images";
import heroLeader from "@/assets/hero-leader.jpg";
import { Section, SectionHeading } from "@/components/site/Section";
import { CtaBand } from "@/components/site/CtaBand";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "भारत पहचान — पंचायत चुनाव डिजिटल अभियान एजेंसी" },
      {
        name: "description",
        content:
          "सरपंच, पंचायत समिति और जिला परिषद उम्मीदवारों के लिए वेबसाइट, सोशल मीडिया, व्हाट्सएप अभियान और वीडियो प्रोडक्शन सेवाएँ।",
      },
      { property: "og:title", content: "भारत पहचान — डिजिटल चुनाव अभियान" },
      {
        property: "og:description",
        content: "एंड-टू-एंड डिजिटल मार्केटिंग और ब्रांडिंग समाधान चुनाव उम्मीदवारों के लिए।",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      {/* HERO */}
      <section className="page-canvas relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-10 lg:grid-cols-2 lg:py-4">
          <div className="order-2 lg:order-1">
            <h1 className="font-display text-3xl leading-tight font-bold text-maroon sm:text-4xl md:text-5xl">
              डिजिटल अभियान से
              <br />
              <span className="text-saffron">बदलें गाँव</span> का भविष्य
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              सरपंच, पंचायत समिति और जिला परिषद चुनाव के लिए एंड-टू-एंड डिजिटल मार्केटिंग और ब्रांडिंग
              समाधान।
            </p>

            <div className="mt-7 grid grid-cols-3 gap-3 sm:grid-cols-6">
              {heroFeatures.map((f) => (
                <div key={f.label} className="flex flex-col items-center gap-1.5 text-center">
                  <span className="grid h-11 w-11 place-items-center rounded-md border border-saffron/35 bg-card">
                    <f.icon className="h-5 w-5 text-saffron" />
                  </span>
                  <span className="text-[10px] leading-tight whitespace-pre-line text-muted-foreground">
                    {f.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/campaign-website"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-maroon px-6 py-3 text-sm font-semibold text-maroon-foreground transition-transform hover:scale-[1.03]"
              >
                डेमो अभियान देखें <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-saffron px-6 py-3 text-sm font-semibold text-saffron-foreground shadow-soft transition-transform hover:scale-[1.03]"
              >
                फ्री कंसल्टेशन लें <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <img
              src={heroLeader}
              width={1200}
              height={1200}
              alt="तिरंगे के साथ जनप्रतिनिधि"
              className="mx-auto w-full max-w-md rounded-lg object-cover lg:max-w-none"
            />
          </div>
        </div>

        {/* STATS */}
        <div className="bg-maroon">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-6 px-4 py-6 md:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`px-2 text-center ${i > 0 ? "md:border-l md:border-maroon-foreground/20" : ""}`}
              >
                <p className="font-display text-2xl font-bold text-gold sm:text-3xl">{s.value}</p>
                <p className="mt-1 text-xs text-maroon-foreground/80 sm:text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AUDIENCES */}
      <Section>
        <SectionHeading title="हम किनके लिए काम करते हैं" />
        <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((a) => (
            <article key={a.title} className="card-warm overflow-hidden">
              <div className="p-4">
                <h3 className="text-base text-maroon">{a.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{a.desc}</p>
              </div>
              <img
                src={images[a.image]}
                width={800}
                height={600}
                loading="lazy"
                alt={a.title}
                className="h-40 w-full object-cover"
              />
            </article>
          ))}
        </div>
      </Section>

      {/* SERVICES */}
      <Section muted>
        <SectionHeading title="हमारी सेवाएँ" />
        <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <article key={s.slug} className="card-warm flex flex-col p-5">
              <span className="grid h-11 w-11 place-items-center rounded-md bg-saffron/12 ring-1 ring-saffron/30">
                <s.icon className="h-5 w-5 text-saffron" />
              </span>
              <h3 className="mt-4 text-base text-maroon">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.short}</p>
              <Link
                to="/services"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-saffron"
              >
                और जानें <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </article>
          ))}
        </div>
      </Section>

      {/* PROCESS */}
      <Section>
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

      {/* DEMO */}
      <Section muted>
        <SectionHeading title="अभियान वेबसाइट डेमो" />
        <div className="mt-9 grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
          <img
            src={images.demo}
            width={1200}
            height={800}
            loading="lazy"
            alt="अभियान वेबसाइट डेमो — लैपटॉप और मोबाइल"
            className="w-full rounded-lg"
          />
          <div>
            <h3 className="text-lg text-maroon">वेबसाइट में शामिल सेक्शन</h3>
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
              to="/campaign-website"
              className="mt-6 inline-flex items-center gap-2 rounded-md bg-maroon px-5 py-3 text-sm font-semibold text-maroon-foreground"
            >
              डेमो वेबसाइट देखें <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Section>

      {/* PACKAGES */}
      <Section>
        <SectionHeading title="हमारे पैकेज" />
        <div className="mt-9 grid gap-6 lg:grid-cols-3">
          {packages.map((p) => (
            <article
              key={p.name}
              className={`relative flex flex-col overflow-hidden rounded-lg border bg-card ${
                p.featured ? "border-saffron shadow-soft" : "border-border shadow-card"
              }`}
            >
              <div
                className={`p-6 text-center ${p.featured ? "bg-saffron text-saffron-foreground" : ""}`}
              >
                <h3 className={`text-lg ${p.featured ? "text-saffron-foreground" : "text-maroon"}`}>
                  {p.name}
                </h3>
                <p
                  className={`mt-1 text-xs ${p.featured ? "text-saffron-foreground/85" : "text-muted-foreground"}`}
                >
                  {p.desc}
                </p>
              </div>
              <div className="px-6 pb-6">
                <p className="text-center font-display text-3xl font-bold text-maroon">
                  {p.price}
                  <span className="text-sm font-normal text-muted-foreground">{p.period}</span>
                </p>
                <ul className="mt-5 space-y-2.5">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-2.5 text-sm text-foreground/85">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-saffron" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className={`mt-6 block rounded-md py-3 text-center text-sm font-semibold ${
                    p.featured
                      ? "bg-saffron text-saffron-foreground"
                      : "bg-maroon text-maroon-foreground"
                  }`}
                >
                  चुनें
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* TESTIMONIALS */}
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
        <div className="mt-8 text-center">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 rounded-md border border-saffron px-5 py-2.5 text-sm font-semibold text-saffron"
          >
            और समीक्षाएँ देखें <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
