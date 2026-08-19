import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { PageHero, Section, SectionHeading } from "@/components/site/Section";
import { CtaBand } from "@/components/site/CtaBand";
import { faqs, packages } from "@/data/site";

export const Route = createFileRoute("/packages")({
  head: () => ({
    meta: [
      { title: "पैकेज और कीमत — डिजिटल चुनाव अभियान प्लान" },
      {
        name: "description",
        content:
          "स्टार्टर, प्रोफेशनल और प्रीमियम पैकेज — हर बजट के अनुसार डिजिटल चुनाव अभियान प्लान।",
      },
      { property: "og:title", content: "हमारे पैकेज — भारत पहचान" },
      { property: "og:description", content: "₹9,999 से शुरू मासिक डिजिटल अभियान पैकेज।" },
    ],
  }),
  component: Packages,
});

function Packages() {
  return (
    <>
      <PageHero
        title="हमारे पैकेज"
        sub="हर बजट और हर स्तर के चुनाव के लिए पारदर्शी कीमत वाले प्लान।"
      />

      <Section>
        <div className="grid gap-6 lg:grid-cols-3">
          {packages.map((p) => (
            <article
              key={p.name}
              className={`relative flex flex-col overflow-hidden rounded-lg border bg-card ${
                p.featured ? "border-saffron shadow-soft" : "border-border shadow-card"
              }`}
            >
              {p.featured && (
                <span className="absolute top-4 -right-9 rotate-45 bg-maroon px-10 py-1 text-[11px] font-semibold text-maroon-foreground">
                  {p.badge}
                </span>
              )}
              <div
                className={`p-6 text-center ${p.featured ? "bg-saffron text-saffron-foreground" : ""}`}
              >
                <h2 className={`text-lg ${p.featured ? "text-saffron-foreground" : "text-maroon"}`}>
                  {p.name}
                </h2>
                <p
                  className={`mt-1 text-xs ${p.featured ? "text-saffron-foreground/85" : "text-muted-foreground"}`}
                >
                  {p.desc}
                </p>
              </div>
              <div className="flex flex-1 flex-col px-6 pb-6">
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
        <p className="mt-6 text-center text-xs text-muted-foreground">
          * सभी कीमतों में GST अलग से लागू होगा। कस्टम पैकेज के लिए संपर्क करें।
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
