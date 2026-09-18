import { Check } from "lucide-react";
import { PageHero, Section, SectionHeading } from "@/components/site/Section";
import { CtaBand } from "@/components/site/CtaBand";
import { PackageQueryButton } from "@/components/site/PackageQueryButton";
import { faqs, packages } from "@/data/site";

type PackageItem = (typeof packages)[number];

export default function Packages() {
  const electionPackages = packages.filter((item) => item.category === "election");
  const businessPackages = packages.filter((item) => item.category === "business");

  return (
    <>
      <PageHero title="हमारे पैकेज" />

      <Section>
        <PackageGrid packages={electionPackages} />
        <p className="mt-6 text-center text-xs text-muted-foreground">
          * सभी कीमतों में GST अलग से लागू होगा। कस्टम पैकेज के लिए संपर्क करें।
        </p>
      </Section>

      <Section muted>
        <SectionHeading
          title="बिजनेस कंसल्टेंसी और मैनेजमेंट"
          sub="अपने अगले विकास चरण के लिए सही सपोर्ट चुनें।"
        />
        <PackageGrid packages={businessPackages} />
        <p className="mt-6 text-center text-xs text-muted-foreground">
          6 माह की पूरी पैकेज फीस। लागू GST अतिरिक्त होगा। विज्ञापन, डोमेन, होस्टिंग और थर्ड-पार्टी
          सब्सक्रिप्शन अलग से चार्ज होंगे।
        </p>
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

function PackageGrid({ packages: packageItems }: { packages: PackageItem[] }) {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {packageItems.map((p) => (
        <article
          key={p.name}
          className={`relative flex flex-col overflow-hidden rounded-lg border bg-card ${
            p.featured ? packageTheme(p.theme).borderFeatured : "border-border shadow-card"
          }`}
        >
          {p.featured && (
            <span
              className={`absolute top-4 -right-9 rotate-45 px-10 py-1 text-[11px] font-semibold text-white ${packageTheme(p.theme).badge}`}
            >
              {p.badge}
            </span>
          )}
          <div
            className={`p-6 text-center ${
              p.featured ? `${packageTheme(p.theme).headBg} text-white` : ""
            }`}
          >
            <h2 className={`text-lg ${p.featured ? "text-white" : packageTheme(p.theme).title}`}>
              {p.name}
            </h2>
            {p.desc && (
              <p
                className={`mt-1 text-xs ${p.featured ? "text-white/85" : "text-muted-foreground"}`}
              >
                {p.desc}
              </p>
            )}
          </div>
          <div className="flex flex-1 flex-col px-6 pb-6">
            <p
              className={`text-center font-display text-3xl font-bold ${packageTheme(p.theme).price}`}
            >
              {p.price}
              <span className="text-sm font-normal text-muted-foreground">{p.period}</span>
            </p>
            <ul className="mt-5 flex-1 space-y-2.5">
              {p.features.map((f) => (
                <li key={f} className="flex gap-2.5 text-sm text-foreground/85">
                  <Check className={`mt-0.5 h-4 w-4 shrink-0 ${packageTheme(p.theme).check}`} />
                  {f}
                </li>
              ))}
            </ul>
            <PackageQueryButton
              packageName={p.name}
              featured={p.featured}
              tone={p.theme}
              ctaLabel={p.ctaLabel}
              displayPrice={p.price}
            />
          </div>
        </article>
      ))}
    </div>
  );
}

function packageTheme(theme: string) {
  const themes = {
    green: {
      title: "text-[#0b9b45]",
      price: "text-[#0b9b45]",
      check: "text-[#20a34a]",
      badge: "bg-[#20a34a]",
      headBg: "bg-[#20a34a]",
      borderFeatured: "border-[#ff5b20] shadow-soft",
    },
    blue: {
      title: "text-[#2867c9]",
      price: "text-[#2867c9]",
      check: "text-[#2867c9]",
      badge: "bg-[#2867c9]",
      headBg: "bg-[#2867c9]",
      borderFeatured: "border-[#2867c9] shadow-soft",
    },
    purple: {
      title: "text-[#7f3fbd]",
      price: "text-[#7f3fbd]",
      check: "text-[#7f3fbd]",
      badge: "bg-[#7f3fbd]",
      headBg: "bg-[#7f3fbd]",
      borderFeatured: "border-[#7f3fbd] shadow-soft",
    },
    orange: {
      title: "text-[#ff5b20]",
      price: "text-[#ff5b20]",
      check: "text-[#ff5b20]",
      badge: "bg-[#ff5b20]",
      headBg: "bg-[#ff5b20]",
      borderFeatured: "border-[#ff5b20] shadow-soft",
    },
    navy: {
      title: "text-[#102b6f]",
      price: "text-[#102b6f]",
      check: "text-[#102b6f]",
      badge: "bg-[#102b6f]",
      headBg: "bg-[#102b6f]",
      borderFeatured: "border-[#102b6f] shadow-soft",
    },
    red: {
      title: "text-[#ef3a30]",
      price: "text-[#ef3a30]",
      check: "text-[#ef3a30]",
      badge: "bg-[#ef3a30]",
      headBg: "bg-[#ef3a30]",
      borderFeatured: "border-[#ef3a30] shadow-soft",
    },
  };

  return themes[theme as keyof typeof themes] ?? themes.navy;
}
