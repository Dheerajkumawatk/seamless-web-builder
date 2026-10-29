import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CreditCard,
  FileText,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { PackageQueryButton } from "@/components/site/PackageQueryButton";
import { PackagePlanCard } from "@/components/site/PackagePlanCard";
import { packageCatalog, packageCategories } from "@/data/package-catalog";
import { packageDetails } from "@/data/package-details";
import { site } from "@/data/site";
import campaignVisual from "@/assets/ai-campaign-preview.png";
import territoryVisual from "@/assets/rally.jpg";
import { seo } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return packageCatalog.map((plan) => ({ slug: plan.slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const plan = packageCatalog.find((item) => item.slug === slug);
  if (!plan) notFound();
  return seo({
    title: `${plan.name} — ${plan.price}`,
    description: packageDetails[slug]?.introduction || plan.desc,
    canonical: `/packages/${slug}`,
  });
}
export default async function PackageDetail({ params }: Props) {
  const { slug } = await params;
  const plan = packageCatalog.find((item) => item.slug === slug);
  if (!plan) notFound();
  const content = packageDetails[slug];
  if (!content) throw new Error(`Missing package description: ${slug}`);
  const category = packageCategories.find((item) => item.id === plan.category)!;
  const isBusiness = plan.category === "business";
  const isQuickPlan = plan.category === "affordable";
  const photo = isBusiness
    ? "/images/packages/business-team.jpg"
    : isQuickPlan
      ? campaignVisual
      : territoryVisual;
  const photoAlt = isBusiness
    ? "लैपटॉप पर बिजनेस की रणनीति और काम की योजना पर चर्चा करती टीम"
    : isQuickPlan
      ? "वेबसाइट, सोशल मीडिया और स्थानीय डिजिटल अभियान का कॉन्सेप्ट चित्र"
      : "स्थानीय जनसभा और जनसंपर्क अभियान का कॉन्सेप्ट चित्र";
  const related = packageCatalog.filter(
    (item) => item.category === plan.category && item.slug !== slug,
  );
  const requirements = isBusiness
    ? [
        "बिजनेस का नाम, लोगो और संक्षिप्त परिचय",
        "उत्पाद या सेवाओं की जानकारी और उपलब्ध फोटो",
        "मौजूदा वेबसाइट और सोशल प्रोफाइल के लिंक",
        "टीम की जरूरतें और काम की प्राथमिकताएं",
      ]
    : [
        "नाम, साफ फोटो और संक्षिप्त परिचय",
        "क्षेत्र और अभियान की जरूरी जानकारी",
        "पोस्ट या वीडियो में शामिल करने के लिए संदेश",
        "उपलब्ध सोशल प्रोफाइल और संपर्क जानकारी",
      ];
  const faqs = [
    {
      q: "इस पैकेज की अवधि क्या है?",
      a: plan.period
        ? "यह 6 माह का पैकेज है। ऊपर दी गई कीमत इस अवधि की पूरी पैकेज फीस है। मासिक सेवाओं की मात्रा पैकेज कार्ड में दी गई है।"
        : "यह एक बार की पैकेज फीस है। वीडियो, पोस्ट और मैसेज की दी गई मात्रा इस पैकेज के लिए है। काम की समयसीमा सामग्री और जरूरतें समझने के बाद टीम से तय करें।",
    },
    { q: "क्या GST और बाकी खर्च इसी कीमत में हैं?", a: category.note },
    {
      q: "भुगतान करने के बाद क्या होगा?",
      a: "फॉर्म में अपनी जानकारी भरकर ऑर्डर की राशि देखें और Razorpay से भुगतान करें। ऑर्डर कन्फर्म होने के बाद टीम के साथ सामग्री, प्राथमिकताएं और काम का शेड्यूल तय करें।",
    },
    {
      q: "क्या अपनी जरूरत के अनुसार बदलाव करा सकते हैं?",
      a: "अतिरिक्त सेवाओं, अलग अवधि या बदलाव के लिए पहले टीम से बात करें। अतिरिक्त काम की फीस और दायरा अलग से तय होगा। यहां दिखाई गई सेवाएं चुने हुए पैकेज का हिस्सा हैं।",
    },
  ];
  return (
    <div className="bg-[#f7faff] text-[#0b1e50] [&_h1]:font-sans [&_h2]:font-sans [&_h3]:font-sans">
      <div className="mx-auto max-w-7xl px-5 pt-7 sm:px-8">
        <Link
          href={`/packages/category/${category.slug}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#5c7296] hover:text-[#d8410c]"
        >
          <ArrowLeft className="h-4 w-4" /> सभी प्लान देखें
        </Link>
      </div>
      <header className="mx-auto max-w-7xl px-5 pt-6 pb-10 sm:px-8 sm:pb-14">
        <div className="grid overflow-hidden rounded-3xl bg-[#0b2349] lg:grid-cols-[1.05fr_1fr]">
          <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
            <p className="text-xs font-bold tracking-[0.14em] text-[#ffad85] uppercase">
              {category.title}
            </p>
            <p className="mt-5 text-base font-semibold text-white/80">{plan.name}</p>
            <h1 className="mt-3 text-3xl leading-[1.35] font-bold tracking-tight text-white sm:text-4xl">
              {content.headline}
            </h1>
            <p className="mt-5 text-sm leading-7 text-[#cfdaeb] sm:text-base">
              {content.introduction}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
              <span className="text-3xl font-bold text-white">{plan.price}</span>
              <span className="text-xs leading-relaxed text-[#cfdaeb]">
                {plan.period ? "6 माह की पूरी पैकेज फीस" : "एक बार की पैकेज फीस"}
                <br />
                लागू GST अतिरिक्त
              </span>
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#package-order-form"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#ff571c] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#e74a10]"
              >
                यह प्लान चुनें <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#package-details"
                className="inline-flex items-center justify-center rounded-xl border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                शामिल सेवाएं देखें
              </a>
            </div>
          </div>
          <figure className="relative min-h-[300px] lg:min-h-[520px]">
            <Image
              src={photo}
              alt={photoAlt}
              fill
              priority
              sizes="(min-width: 1280px) 600px, (min-width: 1024px) 48vw, 100vw"
              className={`object-cover ${isBusiness ? "object-[center_65%]" : "object-center"}`}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-[#071a35]/85 via-transparent to-transparent"
            />
            <figcaption className="absolute inset-x-0 bottom-0 p-6 text-xs leading-relaxed text-white/85 sm:p-8">
              {isBusiness
                ? "बिजनेस प्लानिंग · प्रतीकात्मक तस्वीर / Unsplash"
                : "डिजिटल अभियान · कॉन्सेप्ट विज़ुअल"}
            </figcaption>
          </figure>
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-5 pb-14 sm:px-8 sm:pb-20">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(340px,0.8fr)] lg:gap-10">
          <div className="min-w-0 space-y-9">
            <section className="rounded-2xl border border-[#dfe8f3] bg-white p-6 sm:p-8">
              <p className="flex items-center gap-2 text-xs font-bold tracking-wide text-[#d8410c]">
                <Sparkles aria-hidden="true" className="h-4 w-4" /> आपके लिए सही शुरुआत
              </p>
              <h2 className="mt-3 text-2xl font-bold text-[#0b1e50]">यह प्लान किसके लिए है?</h2>
              <p className="mt-4 text-base leading-7 text-[#5c7296]">{content.suitableFor}</p>
            </section>
            <section aria-labelledby="plan-value-title">
              <h2 id="plan-value-title" className="text-2xl font-bold text-[#0b1e50]">
                इस प्लान से क्या तैयार होगा?
              </h2>
              <div className="mt-5 space-y-4">
                {content.focus.map((item, index) => (
                  <article
                    key={item.title}
                    className="flex gap-4 rounded-2xl border border-[#dfe8f3] bg-white p-5 sm:p-6"
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#fff0e8] text-sm font-bold text-[#d8410c]">
                      0{index + 1}
                    </span>
                    <div>
                      <h3 className="text-base font-bold text-[#0b1e50]">{item.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-[#5c7296]">{item.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
            <section id="package-details" aria-labelledby="included-title" className="scroll-mt-28">
              <p className="text-xs font-bold tracking-wider text-[#d8410c] uppercase">
                Your selected package
              </p>
              <h2 id="included-title" className="mt-2 mb-5 text-2xl font-bold text-[#0b1e50]">
                पूरा पैकेज, एक नजर में
              </h2>
              <PackagePlanCard plan={plan} detail />
              <p className="mt-4 text-xs leading-relaxed text-[#5c7296]">{category.note}</p>
            </section>
            <section className="rounded-2xl border border-[#dfe8f3] bg-[#eef4fc] p-6 sm:p-8">
              <FileText aria-hidden="true" className="h-6 w-6 text-[#5275a3]" />
              <h2 className="mt-4 text-2xl font-bold text-[#0b1e50]">
                शुरू करने के लिए क्या तैयार रखें?
              </h2>
              <p className="mt-3 text-sm leading-7 text-[#5c7296]">
                इन जानकारियों से टीम आपकी जरूरत समझकर काम की सही तैयारी कर पाएगी।
              </p>
              <ul className="mt-5 space-y-3">
                {requirements.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-[#354b70]">
                    <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#d8410c]" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
            <section aria-labelledby="process-title">
              <h2 id="process-title" className="text-2xl font-bold text-[#0b1e50]">
                आपकी शुरुआत से काम की तैयारी तक
              </h2>
              <ol className="mt-6 space-y-5">
                {[
                  {
                    title: "अपना प्लान और जानकारी",
                    description:
                      "पैकेज की सेवाएं देखें और साथ में दिए फॉर्म में संपर्क व बिलिंग की सही जानकारी भरें।",
                  },
                  {
                    title: "ऑर्डर और भुगतान",
                    description:
                      "ऑर्डर की राशि देखें, जरूरी सहमति दें और Razorpay के जरिए भुगतान पूरा करें।",
                  },
                  {
                    title: "जरूरतों और सामग्री पर चर्चा",
                    description:
                      "टीम के साथ उपलब्ध सामग्री, प्राथमिकताएं और काम की समयसीमा तय करें।",
                  },
                  {
                    title: "तैयारी, समीक्षा और अगला कदम",
                    description:
                      "तय दायरे के अनुसार सामग्री या सेटअप तैयार होने पर समीक्षा करें और आगे के काम का समन्वय करें।",
                  },
                ].map((step, index) => (
                  <li key={step.title} className="flex gap-4">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[#cfdded] bg-white text-xs font-bold text-[#5275a3]">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-[#0b1e50]">{step.title}</h3>
                      <p className="mt-1 text-sm leading-7 text-[#5c7296]">{step.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
            <section aria-labelledby="package-faq-title">
              <h2 id="package-faq-title" className="text-2xl font-bold text-[#0b1e50]">
                प्लान लेने से पहले जान लें
              </h2>
              <div className="mt-5 space-y-3">
                {faqs.map((faq) => (
                  <details key={faq.q} className="rounded-xl border border-[#dfe8f3] bg-white p-5">
                    <summary className="cursor-pointer text-sm font-semibold text-[#0b1e50]">
                      {faq.q}
                    </summary>
                    <p className="mt-3 text-sm leading-7 text-[#5c7296]">{faq.a}</p>
                  </details>
                ))}
              </div>
            </section>
          </div>
          <aside
            id="package-order-form"
            aria-label={`${plan.name} का फॉर्म`}
            className="min-w-0 scroll-mt-28 lg:sticky lg:top-28"
          >
            <div className="mb-5">
              <p className="text-xs font-bold tracking-wide text-[#d8410c]">अगला कदम</p>
              <h2 className="mt-2 text-2xl font-bold text-[#0b1e50]">
                अपने प्लान के साथ आगे बढ़ें
              </h2>
              <p className="mt-3 text-sm leading-7 text-[#5c7296]">
                आपने {plan.name} चुना है। अपनी जानकारी भरें; अगले चरण में ऑर्डर और भुगतान का विकल्प
                मिलेगा।
              </p>
            </div>
            <PackageQueryButton
              key={plan.slug}
              packageName={plan.name}
              displayPrice={plan.price}
              tone="orange"
              inline
            />
            <p className="mt-4 flex items-center justify-center gap-2 text-xs text-[#5c7296]">
              <CreditCard aria-hidden="true" className="h-4 w-4" /> भुगतान Razorpay के माध्यम से
            </p>
            <div className="mt-3 flex flex-wrap justify-center gap-4 text-xs text-[#5c7296]">
              <Link href="/terms-conditions" className="underline">
                नियम व शर्तें
              </Link>
              <Link href="/refund-policy" className="underline">
                रिफंड पॉलिसी
              </Link>
            </div>
            <div className="mt-6 rounded-2xl border border-[#dfe8f3] bg-white p-5">
              <p className="text-sm font-semibold text-[#0b1e50]">
                पहले अपनी जरूरत पर बात करना चाहते हैं?
              </p>
              <p className="mt-2 text-xs leading-6 text-[#5c7296]">
                प्लान की सेवाओं या अतिरिक्त काम के बारे में टीम से पूछें।
              </p>
              <a
                href={`${site.whatsappUrl}?text=${encodeURIComponent(`नमस्ते, मुझे ${plan.name} (${plan.price}) के बारे में जानकारी चाहिए।`)}`}
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#0b1e50] underline underline-offset-4"
              >
                <MessageCircle aria-hidden="true" className="h-4 w-4" /> इस प्लान पर बात करें
              </a>
            </div>
          </aside>
        </div>
        <section
          className="mt-14 border-t border-[#dfe8f3] pt-9"
          aria-labelledby="related-plans-title"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 id="related-plans-title" className="text-2xl font-bold text-[#0b1e50]">
              इसी कैटेगरी के दूसरे प्लान
            </h2>
            <Link
              href={`/packages/category/${category.slug}`}
              className="text-sm font-semibold text-[#5c7296] underline underline-offset-4"
            >
              सभी प्लान देखें
            </Link>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/packages/${item.slug}`}
                className="group flex items-center justify-between gap-4 rounded-2xl border border-[#dfe8f3] bg-white p-6 transition hover:border-[#ff571c]"
              >
                <div>
                  <h3 className="text-base font-bold text-[#0b1e50]">{item.name}</h3>
                  <p className="mt-2 text-xl font-bold text-[#0b1e50]">{item.price}</p>
                  <p className="mt-2 text-xs leading-relaxed text-[#5c7296]">{item.desc}</p>
                </div>
                <ArrowRight aria-hidden="true" className="h-5 w-5 shrink-0 text-[#d8410c]" />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
