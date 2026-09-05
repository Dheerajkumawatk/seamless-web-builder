import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Check,
  Facebook,
  Instagram,
  MessageCircle,
  Quote,
  Twitter,
  Video,
  Youtube,
} from "lucide-react";
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
import heroLeader from "@/assets/hero-leader.png";
import { Section, SectionHeading } from "@/components/site/Section";
import { CtaBand } from "@/components/site/CtaBand";
import { PackageQueryButton } from "@/components/site/PackageQueryButton";

export default function Index() {
  return (
    <>
      <section className="hero-exact relative overflow-hidden border-b border-emerald-100">
        <div className="mx-auto grid min-h-[595px] max-w-[1720px] items-center gap-0 px-6 pt-25 lg:grid-cols-[0.98fr_1.02fr] lg:px-20">
          <div className="relative z-10 max-w-[750px] pb-12">
            <h1 className="font-display text-[42px] leading-[1.08] font-black tracking-normal text-[#0a1526] sm:text-[62px] lg:text-[82px]">
              डिजिटल अभियान से
              <br />
              <span className="text-[#0f7a42]">बदलें गाँव</span>{" "}
              <span className="text-[#0e2f5e]">का भविष्य</span>
            </h1>
            <p className="mt-7 max-w-[650px] text-xl leading-relaxed font-extrabold text-[#232a3c] sm:text-2xl">
              सरपंच, पंचायत समिति और जिला परिषद चुनाव के लिए
              <br className="hidden sm:block" />
              एंड-टू-एंड डिजिटल मार्केटिंग और ब्रांडिंग समाधान।
            </p>

            <div className="mt-12 grid max-w-[850px] grid-cols-3 gap-0 sm:grid-cols-6">
              {heroFeatures.map((f) => (
                <div
                  key={f.label}
                  className="border-r border-[#b7d8c5] px-4 text-center last:border-r-0"
                >
                  <span className="mx-auto grid h-10 w-10 place-items-center text-[#0f7a42]">
                    <f.icon className="h-9 w-9 stroke-[1.8]" />
                  </span>
                  <span className="mt-4 block text-[13px] leading-tight font-extrabold whitespace-pre-line text-[#232a3c]">
                    {f.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-12 flex flex-col gap-5 sm:flex-row">
              <Link
                href="https://faithful-frontent.vercel.app/"
                className="inline-flex min-w-[270px] items-center justify-center gap-4 rounded-lg bg-[#0e2f5e] px-9 py-5 text-xl font-extrabold text-white shadow-[0_14px_26px_rgba(80,8,10,.22)]"
              >
                डेमो अभियान देखें <ArrowRight className="h-6 w-6" />
              </Link>
              <Link
                href="/"
                className="inline-flex min-w-[270px] items-center justify-center gap-4 rounded-lg bg-[#159a56] px-9 py-5 text-xl font-extrabold text-white shadow-[0_14px_26px_rgba(21,154,86,.25)]"
              >
                फ्री कंसल्टेशन लें <ArrowRight className="h-6 w-6" />
              </Link>
            </div>
          </div>

          <div className="hero-person-slot relative z-10 self-end">
            <img
              src={heroLeader.src}
              width={1100}
              height={920}
              alt="तिरंगे के साथ जनप्रतिनिधि"
              className="hero-person-image"
            />
          </div>
        </div>

        <div className="relative z-20 bg-maroon">
          <div className="mx-auto grid max-w-7xl grid-cols-2 px-4 py-6 md:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`flex items-center justify-center gap-4 px-3 text-center md:text-left ${
                  i > 0 ? "md:border-l md:border-white/25" : ""
                }`}
              >
                <s.icon className="hidden h-10 w-10 text-gold sm:block" />
                <div>
                  <p className="font-display text-3xl font-bold leading-none text-white">
                    {s.value}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white/90">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Section>
        <SectionHeading title="हम किनके लिए काम करते हैं" />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((a) => (
            <article key={a.title} className="card-warm overflow-hidden">
              <div className="flex gap-3 p-5">
                <span
                  className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${a.iconColor}`}
                >
                  <Check className="h-5 w-5 text-white" />
                </span>
                <div>
                  <h3 className="text-base text-maroon">{a.title}</h3>
                  <p className="mt-1 text-sm leading-snug text-neutral-700">{a.desc}</p>
                </div>
              </div>
              <img src={images[a.image]} alt={a.title} className="h-36 w-full object-cover" />
            </article>
          ))}
        </div>
      </Section>

      <Section muted>
        <SectionHeading title="हमारी सेवाएं" />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {services.map((s, index) => (
            <article
              key={s.slug}
              className="card-warm flex min-h-64 flex-col items-center p-5 text-center"
            >
              <h3 className="text-base text-maroon">{s.title}</h3>
              <p className="mt-2 min-h-12 text-xs leading-relaxed text-neutral-700">{s.short}</p>
              <ServicePreview index={index} />
              <Link
                href="/services"
                className="mt-auto inline-flex items-center gap-1 text-sm font-bold text-saffron"
              >
                और आगे <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </article>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading title="हमारा काम करने का तरीका" />
        <div className="mt-10 grid grid-cols-2 gap-y-8 sm:grid-cols-4 lg:grid-cols-7">
          {process.map((p, i) => (
            <div key={p.num} className="relative flex flex-col items-center px-2 text-center">
              {i < process.length - 1 && (
                <span className="absolute top-9 left-[62%] hidden h-px w-[76%] bg-emerald-200 lg:block" />
              )}
              <span className="relative z-10 grid h-18 w-18 place-items-center rounded-full border border-emerald-200 bg-white text-maroon shadow-sm">
                <p.icon className="h-8 w-8" />
              </span>
              <span className="mt-3 font-display text-lg font-bold leading-none text-maroon">
                {p.num}
              </span>
              <span className="mt-1 text-xs leading-tight font-semibold text-neutral-800">
                {p.title}
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Section className="website-demo-section" muted>
        <div className="rounded-lg border border-emerald-300 bg-white/45 p-4 shadow-card sm:p-6">
          <SectionHeading title="अभियान वेबसाइट डेमो" />
          <div className="mt-7 grid items-center gap-8 lg:grid-cols-[1.45fr_.9fr]">
            <img
              src={images["demo"]}
              alt="अभियान वेबसाइट डेमो - लैपटॉप और मोबाइल"
              className="w-full rounded-md object-contain"
            />
            <div>
              <h3 className="text-xl text-maroon">वेबसाइट में शामिल सेक्शन</h3>
              <ul className="mt-4 space-y-2.5">
                {websiteSections.map((s) => (
                  <li
                    key={s}
                    className="flex items-center gap-2.5 text-sm font-semibold text-neutral-800"
                  >
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-100">
                      <Check className="h-3 w-3 text-saffron" />
                    </span>
                    {s}
                  </li>
                ))}
              </ul>
              <Link
                href="https://faithful-frontent.vercel.app/"
                className="mt-6 inline-flex items-center gap-2 rounded-md bg-maroon px-6 py-3 text-sm font-bold text-white"
              >
                डेमो वेबसाइट देखें <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold text-maroon">हमारे पैकेज</h2>
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {packages.map((p) => (
            <article
              key={p.name}
              className={`relative flex flex-col overflow-hidden rounded-lg border bg-white shadow-card ${
                p.featured ? "border-saffron" : "border-emerald-200"
              }`}
            >
              {p.featured && (
                <span className={`absolute -right-9 top-5 rotate-45 px-10 py-1 text-xs font-bold text-white ${homePackageTheme(p.theme).badge}`}>
                  {p.badge}
                </span>
              )}
              <div className={`px-6 py-6 text-center ${p.featured ? `${homePackageTheme(p.theme).headBg} text-white` : ""}`}>
                <h3 className={`text-xl ${p.featured ? "text-white" : homePackageTheme(p.theme).title}`}>{p.name}</h3>
                {p.desc && (
                  <p className={`mt-1 text-sm ${p.featured ? "text-white/90" : "text-neutral-600"}`}>
                    {p.desc}
                  </p>
                )}
              </div>
              <div className="flex flex-1 flex-col px-7 pb-7 pt-5">
                <p className={`text-center font-display text-4xl font-bold ${homePackageTheme(p.theme).price}`}>
                  {p.price}
                  <span className="text-sm font-normal text-neutral-600">{p.period}</span>
                </p>
                <ul className="mt-5 flex-1 space-y-2.5">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-2.5 text-sm font-semibold text-neutral-800">
                      <Check className={`mt-0.5 h-4 w-4 shrink-0 ${homePackageTheme(p.theme).check}`} />
                      {f}
                    </li>
                  ))}
                </ul>
                <PackageQueryButton
                  packageName={p.name}
                  featured={p.featured}
                  tone={p.theme}
                  ctaLabel={p.ctaLabel}
                />
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section muted>
        <SectionHeading title="ग्राहकों की राय" />
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {testimonials.map((t, index) => (
            <article key={t.name} className="card-warm p-6">
              <div className="flex items-start gap-4">
                <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-emerald-100 text-xl font-bold text-maroon">
                  {index + 1}
                </div>
                <div>
                  <Quote className="h-5 w-5 text-saffron/60" />
                  <p className="mt-2 text-sm leading-relaxed font-semibold text-neutral-800">
                    "{t.quote}"
                  </p>
                  <p className="mt-4 text-sm font-bold text-maroon">{t.name}</p>
                  <p className="text-xs text-neutral-600">{t.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 rounded-md border border-maroon px-6 py-2.5 text-sm font-bold text-maroon"
          >
            और समीक्षाएं देखें <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}

function homePackageTheme(theme: string) {
  const themes = {
    green: {
      title: "text-[#0b9b45]",
      price: "text-[#0b9b45]",
      check: "text-[#20a34a]",
      badge: "bg-[#20a34a]",
      headBg: "bg-[#20a34a]",
    },
    blue: {
      title: "text-[#2867c9]",
      price: "text-[#2867c9]",
      check: "text-[#2867c9]",
      badge: "bg-[#2867c9]",
      headBg: "bg-[#2867c9]",
    },
    purple: {
      title: "text-[#7f3fbd]",
      price: "text-[#7f3fbd]",
      check: "text-[#7f3fbd]",
      badge: "bg-[#7f3fbd]",
      headBg: "bg-[#7f3fbd]",
    },
    orange: {
      title: "text-[#ff5b20]",
      price: "text-[#ff5b20]",
      check: "text-[#ff5b20]",
      badge: "bg-[#ff5b20]",
      headBg: "bg-[#ff5b20]",
    },
    navy: {
      title: "text-[#102b6f]",
      price: "text-[#102b6f]",
      check: "text-[#102b6f]",
      badge: "bg-[#102b6f]",
      headBg: "bg-[#102b6f]",
    },
    red: {
      title: "text-[#ef3a30]",
      price: "text-[#ef3a30]",
      check: "text-[#ef3a30]",
      badge: "bg-[#ef3a30]",
      headBg: "bg-[#ef3a30]",
    },
  };

  return themes[theme as keyof typeof themes] ?? themes.navy;
}

function ServicePreview({ index }: { index: number }) {
  if (index === 0) {
    return <img src={images["demo"]} alt="" className="my-5 h-20 w-full object-contain" />;
  }
  if (index === 1) {
    return (
      <div className="my-7 flex justify-center gap-3">
        {[Facebook, Instagram, Youtube, Twitter].map((Icon, i) => (
          <span
            key={i}
            className="grid h-9 w-9 place-items-center rounded-full bg-blue-600 text-white"
          >
            <Icon className="h-5 w-5" />
          </span>
        ))}
      </div>
    );
  }
  if (index === 2) {
    return (
      <div className="my-6 rounded-lg bg-emerald-500 px-5 py-4 text-white shadow-card">
        <MessageCircle className="mx-auto h-10 w-10" />
      </div>
    );
  }
  if (index === 3) {
    return <Video className="my-6 h-16 w-16 text-neutral-800" />;
  }
  if (index === 4) {
    return <img src={images["rally"]} alt="" className="my-5 h-20 w-full rounded object-cover" />;
  }
  return (
    <div className="my-5 w-full rounded-md border bg-white p-3">
      <BarChart3 className="mx-auto h-12 w-12 text-blue-700" />
      <div className="mt-2 h-2 rounded bg-blue-100" />
      <div className="mt-2 h-2 w-3/4 rounded bg-emerald-100" />
    </div>
  );
}
