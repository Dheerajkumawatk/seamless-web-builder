import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CalendarDays,
  Check,
  ClipboardList,
  HelpCircle,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Share2,
} from "lucide-react";
import { fallbackImage, images } from "@/data/images";
import { audiences, packages, site, trustCapabilities, websiteSections } from "@/data/site";
import { electionSummary, listElectionResults } from "@/lib/election-results.server";
import { listBlogPosts } from "@/lib/blog.server";
import heroBackground from "@/assets/bharatpahchan-hero-background.png";
import mobileSliderBackground from "@/assets/bharatpahchan-mobile-slider.png";
import channel009Logo from "@/assets/channel009-logo.png";
import aiCampaignPreview from "@/assets/ai-campaign-preview.png";
import { MobileContactBar } from "@/components/site/MobileContactBar";
import { PackageQueryButton } from "@/components/site/PackageQueryButton";
import { PersonalizedDemoPreview } from "@/components/site/PersonalizedDemoPreview";
import { InstagramFeedSection } from "@/components/site/InstagramFeedSection";
import { Section, SectionHeading } from "@/components/site/Section";

const enquiryMessage =
  "नमस्ते, मुझे भारत पहचान की सेवाओं और वेबसाइट पैकेज के बारे में जानकारी चाहिए।";

const simpleProcess = [
  {
    icon: Phone,
    title: "अपनी जानकारी भेजें",
    text: "नाम, मोबाइल, गांव / ग्राम पंचायत और जिला भेजें।",
  },
  {
    icon: ClipboardList,
    title: "हम वेबसाइट और डिजिटल सामग्री तैयार करें",
    text: "आपकी जानकारी के अनुसार वेबसाइट, पोस्टर, वीडियो और outreach सामग्री तैयार होती है।",
  },
  {
    icon: Share2,
    title: "अपनी डिजिटल पहचान के साथ अभियान शुरू करें",
    text: "वेबसाइट लिंक और डिजिटल सामग्री को लोगों तक साझा करें।",
  },
];

const homepageFaqs = [
  {
    q: "क्या BharatPahchan चुनाव जिताने की गारंटी देता है?",
    a: "नहीं। BharatPahchan चुनाव जीतने की गारंटी नहीं देता। यह उम्मीदवारों के लिए वेबसाइट, सोशल मीडिया, वीडियो, ग्राफिक्स और डिजिटल आउटरीच सेवाएं प्रदान करता है।",
  },
  {
    q: "वेबसाइट कितने समय में तैयार होगी?",
    a: "समय आपकी सामग्री, फोटो और जरूरतों पर निर्भर करता है। सही समय टीम से WhatsApp या कॉल पर पुष्टि करके बताया जाएगा।",
  },
  {
    q: "Package कितने समय के लिए है?",
    a: "मौजूदा पैकेज 6 माह के आधार पर दिखाए गए हैं। किसी custom duration के लिए टीम से बात करें।",
  },
  {
    q: "पेमेंट कैसे करें?",
    a: "भुगतान और बिलिंग से जुड़ी जानकारी टीम से पुष्टि करके ही करें। वेबसाइट पर दिख रही कीमत पैकेज की मूल जानकारी है।",
  },
  {
    q: "क्या EMI या किस्तों में भुगतान उपलब्ध है?",
    a: "EMI या किस्तों की सुविधा उपलब्ध है या नहीं, इसकी पुष्टि टीम से करें। वेबसाइट पर बिना पुष्टि के कोई किस्त वादा नहीं किया गया है।",
  },
  {
    q: "Content कौन approve करेगा?",
    a: "आपके नाम, फोटो, क्षेत्र, काम और campaign content को प्रकाशित करने से पहले client approval के अनुसार final किया जा सकता है।",
  },
  {
    q: "क्या मेरा डेटा सुरक्षित है?",
    a: "आपकी दी गई जानकारी सेवा, संपर्क और वेबसाइट से जुड़े काम के लिए उपयोग हो सकती है। डेटा उपयोग की पूरी जानकारी के लिए Privacy Policy देखें।",
  },
  {
    q: "क्या यह किसी राजनीतिक पार्टी से जुड़ा है?",
    a: "भारत पहचान किसी राजनीतिक पार्टी की आधिकारिक वेबसाइट नहीं है। यह निजी डिजिटल सेवा प्लेटफॉर्म है।",
  },
  {
    q: "क्या Channel009 में खबर प्रकाशित होना package का हिस्सा है?",
    a: "नहीं। BharatPahchan package लेने पर Channel009 editorial coverage की कोई guarantee नहीं है। Channel009 अलग News & Media Brand है।",
  },
];

export default async function Index() {
  const [electionResults, latestBlogPosts] = await Promise.all([
    listElectionResults(),
    listBlogPosts(),
  ]);
  const resultSummary = electionSummary(electionResults);
  const whatsappHref = getWhatsappHref(enquiryMessage);

  return (
    <>
      <section className="relative min-h-[382px] overflow-hidden border-b border-emerald-100 bg-[#f8dfbf] sm:min-h-[640px]">
        <img
          src={heroBackground.src}
          width={2560}
          height={1024}
          alt="BharatPahchan digital campaign background"
          className="absolute inset-0 hidden h-full w-full scale-[1.02] object-cover object-center sm:block"
          fetchPriority="high"
        />
        <img
          src={mobileSliderBackground.src}
          width={1152}
          height={1408}
          alt="BharatPahchan digital campaign background"
          className="absolute inset-x-0 top-0 h-[108%] w-full object-cover object-top sm:hidden"
          fetchPriority="high"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-white/55 via-white/20 to-transparent sm:block"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/10 to-transparent"
        />

        <div className="relative z-10 mx-auto flex min-h-[382px] max-w-[1720px] items-start px-4 pt-11 pb-6 sm:min-h-[640px] sm:items-center sm:px-6 sm:py-20 lg:px-20">
          <div className="max-w-[84%] sm:max-w-[760px]">
            <p className="reveal mb-3 inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/70 px-3.5 py-1.5 text-[11px] font-black tracking-[0.18em] text-[#0e2f5e] uppercase shadow-sm backdrop-blur-md sm:mb-5 sm:text-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-[#159a56]" />
              BharatPahchan Digital
            </p>
            <h1 className="reveal reveal-delay-1 font-display text-[32px] leading-[1.06] font-black tracking-normal text-[#0a1526] [text-shadow:0_3px_12px_rgba(255,255,255,.95),0_1px_2px_rgba(255,255,255,.9)] sm:text-[58px] sm:leading-[1.08] lg:text-[76px]">
              पंचायत चुनाव की तैयारी कर रहे हैं?
              <br />
              <span className="text-[#0f7a42]">अपनी डिजिटल पहचान</span>{" "}
              <span className="text-[#0e2f5e]">आज से मजबूत बनाइए।</span>
            </h1>
            <p className="reveal reveal-delay-2 mt-3 max-w-[320px] text-[15px] leading-snug font-extrabold text-[#232a3c] [text-shadow:0_2px_10px_rgba(255,255,255,.95),0_1px_2px_rgba(255,255,255,.9)] sm:mt-7 sm:max-w-[650px] sm:text-2xl sm:leading-relaxed">
              उम्मीदवार वेबसाइट, सोशल मीडिया, वीडियो-ग्राफिक्स, डिजिटल आउटरीच और अभियान प्रबंधन — एक
              ही जगह।
            </p>

            <div className="reveal reveal-delay-3 mt-5 flex max-w-[340px] flex-row gap-2 sm:mt-10 sm:max-w-none sm:gap-5">
              <Link
                href="/#demo-form"
                className="premium-btn inline-flex min-w-0 flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#0e2f5e] px-2 py-3 text-center text-[11px] leading-tight font-extrabold text-white sm:min-w-[270px] sm:flex-none sm:gap-4 sm:px-9 sm:py-5 sm:text-xl"
              >
                मेरे नाम से डेमो बनाइए <ArrowRight className="h-4 w-4 shrink-0 sm:h-6 sm:w-6" />
              </Link>
              <a
                href={`tel:${site.phone}`}
                className="premium-btn-green inline-flex min-w-0 flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#159a56] px-2 py-3 text-center text-[11px] leading-tight font-extrabold text-white sm:min-w-[270px] sm:flex-none sm:gap-4 sm:px-9 sm:py-5 sm:text-xl"
              >
                अभी बात करें <Phone className="h-4 w-4 shrink-0 sm:h-6 sm:w-6" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#dbe8dd] bg-gradient-to-r from-[#0e2f5e] via-[#123a72] to-[#0e2f5e] px-4 py-3.5">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-1 text-center text-xs font-extrabold tracking-wide text-white/90 sm:text-sm">
          <span>Citiline Technologies Private Limited</span>
          <span className="hidden h-1 w-1 rounded-full bg-[#159a56] sm:inline-block" />
          <span>Digital Campaign Initiative</span>
          <span className="hidden h-1 w-1 rounded-full bg-[#159a56] sm:inline-block" />
          <span>भारत पहचान</span>
        </div>
      </section>

      <section className="border-b border-[#dbe8dd] bg-[#f3f7fb] px-4 py-10 sm:py-14">
        <div className="premium-surface mx-auto max-w-7xl rounded-2xl p-5 sm:p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-red-200/80 bg-red-50 px-3 py-1 text-xs font-black tracking-wide text-[#df1414] uppercase">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#df1414]" />
                वास्तविक परिणाम
              </p>
              <h2 className="mt-3 font-display text-3xl font-black leading-tight text-[#0e2f5e] sm:text-4xl">
                राजस्थान निकाय चुनाव परिणाम
              </h2>
              <p className="mt-1 text-base font-bold text-[#69748a] sm:text-lg">
                जिला, निकाय और वार्डवार नतीजे
              </p>
            </div>
            <p className="inline-flex items-center gap-2 self-start rounded-full bg-[#0e2f5e]/5 px-3 py-1.5 text-xs font-bold text-[#0e2f5e]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#159a56]" />
              लाइव अपडेट
            </p>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                label: "भाजपा",
                logo: "🪷",
                value: resultSummary.bjp,
                runners: resultSummary.bjpRunners,
                tone: "border-orange-200/80 bg-gradient-to-b from-orange-50 to-white text-orange-700",
                bar: "bg-[#f97316]",
              },
              {
                label: "कांग्रेस",
                logo: "✋",
                value: resultSummary.inc,
                runners: resultSummary.incRunners,
                tone: "border-blue-200/80 bg-gradient-to-b from-blue-50 to-white text-blue-700",
                bar: "bg-[#2f73ff]",
              },
              {
                label: "अन्य दल",
                logo: "⚑",
                value: resultSummary.others,
                runners: resultSummary.otherRunners,
                tone: "border-violet-200/80 bg-gradient-to-b from-violet-50 to-white text-violet-700",
                bar: "bg-[#7c3aed]",
              },
              {
                label: "निर्दलीय",
                logo: "👤",
                value: resultSummary.ind,
                runners: resultSummary.indRunners,
                tone: "border-slate-200/80 bg-gradient-to-b from-slate-50 to-white text-slate-700",
                bar: "bg-[#6b7280]",
              },
            ].map((item) => (
              <article
                key={item.label}
                className={`overflow-hidden rounded-xl border shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${item.tone}`}
              >
                <div className={`h-1.5 ${item.bar}`} />
                <div className="p-4 text-center sm:p-5">
                  <div className="flex items-center justify-center gap-2 text-lg font-black sm:text-xl">
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-lg shadow-sm">
                      {item.logo}
                    </span>
                    {item.label}
                  </div>
                  <p className="mt-2 font-display text-3xl font-black text-[#0e2f5e]">{item.value}</p>
                  <div className="mt-3 grid grid-cols-2 rounded-lg bg-white/80 text-sm font-bold text-[#526079] ring-1 ring-black/5">
                    <span className="px-2 py-2">जीत: {item.value}</span>
                    <span className="px-2 py-2">बढ़त: {item.runners}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <Link
            href="/election-results"
            className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl border border-[#df1414] bg-white px-6 py-3 text-sm font-black text-[#df1414] shadow-sm transition hover:bg-red-50"
          >
            सभी परिणाम देखें <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <PersonalizedDemoPreview whatsappBaseUrl={site.whatsappUrl} />

      <InstagramFeedSection />

      <Section>
        <SectionHeading
          title="हम किनके लिए काम करते हैं"
          sub="सरपंच से जिला स्तर तक — स्थानीय चुनाव उम्मीदवारों के लिए डिजिटल अभियान।"
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((item) => (
            <article
              key={item.title}
              className="group rounded-2xl border border-[#dbe8dd] bg-white p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:border-[#159a56]/35 hover:shadow-[var(--shadow-premium)]"
            >
              <span
                className={`grid h-12 w-12 place-items-center rounded-2xl ${item.iconColor} shadow-sm transition group-hover:scale-105`}
              >
                <Check className="h-5 w-5 text-white" />
              </span>
              <h3 className="mt-5 text-lg text-maroon">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-700">{item.desc}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section muted>
        <div className="grid items-center gap-9 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="overflow-hidden rounded-lg border border-[#dbe8dd] bg-white shadow-card">
            <img
              src={images["village"]}
              alt="भारतीय गांव की सड़क और घर"
              loading="lazy"
              className="h-72 w-full object-cover sm:h-[430px]"
            />
          </div>
          <div>
            <p className="text-xs font-black tracking-[0.2em] text-[#159a56] uppercase">
              हमारी सेवाएं
            </p>
            <h2 className="mt-3 font-display text-3xl font-black leading-tight text-[#0e2f5e] sm:text-4xl">
              आपकी पहचान, आपका काम और आपका संदेश — डिजिटल माध्यम से लोगों तक।
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed font-semibold text-[#4b5364]">
              उम्मीदवार वेबसाइट, सोशल मीडिया, वीडियो, ग्राफिक्स और डिजिटल आउटरीच — सब एक जगह।
            </p>
            <div className="mt-6 grid gap-3">
              {[
                "उम्मीदवार की मजबूत ऑनलाइन पहचान",
                "क्षेत्र के अनुसार डिजिटल प्रचार योजना",
                "पोस्टर, वीडियो और डिजिटल कंटेंट का नियमित प्रबंधन",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-lg border border-[#dbe8dd] bg-white px-4 py-3 shadow-sm"
                >
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#159a56] text-white">
                    <Check className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-extrabold text-[#1f2532]">{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {trustCapabilities.map((item) => (
                <article
                  key={item.label}
                  className="rounded-lg border border-[#dbe8dd] bg-white p-4 shadow-sm"
                >
                  <item.icon className="h-6 w-6 text-[#159a56]" />
                  <h3 className="mt-2 text-sm font-black text-maroon">{item.label}</h3>
                </article>
              ))}
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/#demo-form"
                className="inline-flex items-center gap-2 rounded-lg bg-[#0e2f5e] px-6 py-3.5 text-sm font-black text-white"
              >
                मेरे नाम से डेमो बनाइए <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-lg border border-[#c3d2e6] bg-white px-6 py-3.5 text-sm font-black text-[#0e2f5e]"
              >
                सभी सेवाएं देखें
              </Link>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading title="तीन आसान कदम" sub="शुरू करना आसान है — जानकारी भेजें, सामग्री तैयार हो, अभियान शुरू करें।" />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {simpleProcess.map((item, index) => (
            <article
              key={item.title}
              className="group rounded-2xl border border-[#dbe8dd] bg-white p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-premium)]"
            >
              <div className="flex items-center gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#159a56] text-white shadow-sm transition group-hover:scale-105">
                  <item.icon className="h-6 w-6" />
                </span>
                <span className="font-display text-3xl font-black text-[#0e2f5e]/20 transition group-hover:text-[#0e2f5e]/35">
                  {index + 1}
                </span>
              </div>
              <h3 className="mt-5 text-xl text-maroon">{item.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-neutral-700">{item.text}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section className="website-demo-section border-y border-[#dbe8dd] bg-[#f6fbf8]">
        <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_.85fr]">
          <img
            src={aiCampaignPreview.src}
            width={2048}
            height={878}
            alt="AI generated campaign visuals"
            loading="lazy"
            className="h-full max-h-[440px] w-full rounded-lg border border-[#dbe8dd] bg-white object-cover shadow-card"
          />
          <div>
            <p className="text-xs font-black tracking-[0.2em] text-[#159a56] uppercase">
              AI Visual Studio
            </p>
            <h2 className="mt-3 font-display text-3xl font-black leading-tight text-[#0e2f5e] sm:text-4xl">
              वेबसाइट और सोशल कैंपेन के लिए तैयार विज़ुअल्स
            </h2>
            <p className="mt-4 text-base leading-relaxed font-semibold text-[#4b5364]">
              स्थानीय अभियान को साफ़, भरोसेमंद और आधुनिक दिखाने के लिए बैनर, क्रिएटिव और डिजिटल
              सामग्री।
            </p>
            <ul className="mt-5 grid gap-2.5">
              {websiteSections.slice(0, 6).map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm font-bold text-[#1f2532]">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-emerald-100">
                    <Check className="h-3.5 w-3.5 text-[#159a56]" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#0e2f5e] px-6 py-3.5 text-sm font-black text-white"
            >
              डिज़ाइन के लिए संपर्क करें <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Section>

      <Section className="relative overflow-hidden bg-[#f4f8f6]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-80"
          style={{
            background:
              "radial-gradient(520px 220px at 12% 0%, rgba(21,154,86,0.1), transparent 55%), radial-gradient(480px 200px at 90% 10%, rgba(14,47,94,0.08), transparent 50%)",
          }}
        />
        <div className="relative text-center">
          <p className="mb-2 text-xs font-black tracking-[0.22em] text-[#159a56] uppercase">
            Packages
          </p>
          <h2 className="font-display text-2xl font-bold text-[#0e2f5e] sm:text-3xl md:text-4xl">
            पैकेज और कीमत
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm font-semibold text-[#5b6578] sm:text-base">
            कीमत और अवधि मौजूदा पैकेज डेटा से ली गई है। अंतिम राशि टीम से पुष्टि करें।
          </p>
        </div>
        <div className="relative mt-8 grid gap-5 sm:mt-10 sm:gap-6 lg:grid-cols-3">
          {packages.map((p) => {
            const daily = dailyEquivalent(p.price, p.period);

            return (
              <article
                key={p.name}
                className={`relative flex flex-col overflow-hidden rounded-2xl border bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-premium)] ${
                  p.featured
                    ? "border-[#159a56]/50 ring-2 ring-[#159a56]/20 lg:scale-[1.02]"
                    : "border-[#d5e0ec]"
                }`}
              >
                {p.featured && (
                  <span
                    className={`absolute top-5 -right-9 rotate-45 px-10 py-1 text-xs font-bold text-white ${homePackageTheme(p.theme).badge}`}
                  >
                    {p.badge}
                  </span>
                )}
                <div
                  className={`px-5 py-6 text-center sm:px-6 ${
                    p.featured
                      ? `${homePackageTheme(p.theme).headBg} text-white`
                      : "bg-gradient-to-b from-[#f7fafc] to-white"
                  }`}
                >
                  <h3
                    className={`text-xl ${p.featured ? "text-white" : homePackageTheme(p.theme).title}`}
                  >
                    {p.name}
                  </h3>
                  {p.desc && (
                    <p
                      className={`mt-1 text-sm ${p.featured ? "text-white/90" : "text-neutral-600"}`}
                    >
                      {p.desc}
                    </p>
                  )}
                </div>
                <div className="flex flex-1 flex-col px-5 pt-5 pb-6 sm:px-7 sm:pb-7">
                  <div className="rounded-xl border border-[#dbe8dd] bg-[#f7fbf8] p-5 text-center">
                    <p className="text-xs font-black tracking-[0.16em] text-[#596173] uppercase">
                      कुल पैकेज कीमत
                    </p>
                    <p
                      className={`mt-1 font-display text-4xl font-bold ${homePackageTheme(p.theme).price}`}
                    >
                      {p.price}
                    </p>

                    <p className="mt-1 text-sm font-bold text-neutral-700">{p.period}</p>

                    {daily && (
                      <p className="mt-2 text-xs font-semibold text-neutral-600">
                        लगभग ₹{daily} प्रतिदिन के बराबर
                      </p>
                    )}
                  </div>
                  <p className="mt-5 text-sm font-black text-[#0e2f5e]">शामिल सेवाएं</p>
                  <ul className="mt-3 flex-1 space-y-2.5">
                    {p.features.map((f) => (
                      <li key={f} className="flex gap-2.5 text-sm font-semibold text-neutral-800">
                        <Check
                          className={`mt-0.5 h-4 w-4 shrink-0 ${homePackageTheme(p.theme).check}`}
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 text-xs font-semibold text-neutral-600">
                    GST या अन्य कर लागू हों तो टीम से पुष्टि करें।
                  </p>
                  <PackageQueryButton
                    packageName={p.name}
                    featured={p.featured}
                    tone={p.theme}
                    ctaLabel={p.ctaLabel}
                    displayPrice={p.price}
                  />
                </div>
              </article>
            );
          })}
        </div>
      </Section>

      <Section muted>
        <article className="premium-surface rounded-2xl p-6 sm:p-8">
          <div className="grid gap-5 lg:grid-cols-[auto_1fr] lg:items-center">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-[#0e2f5e] text-white shadow-md">
              <Building2 className="h-7 w-7" />
            </span>
            <div>
              <p className="text-xs font-black tracking-[0.18em] text-[#159a56] uppercase">
                कंपनी जानकारी
              </p>
              <h2 className="mt-2 font-display text-2xl font-black text-maroon sm:text-3xl">
                BharatPahchan.com
              </h2>
              <p className="mt-3 text-sm leading-relaxed font-semibold text-neutral-700 sm:text-base">
                BharatPahchan.com, CITILINE TECHNOLOGIES PRIVATE LIMITED का एक venture है। यह निजी
                डिजिटल सेवा प्लेटफॉर्म है, सरकारी वेबसाइट नहीं।
              </p>
              <div className="mt-5 grid gap-3 text-sm font-semibold text-neutral-800 lg:grid-cols-3">
                <a
                  href={`tel:${site.phone}`}
                  className="flex items-center gap-2 rounded-xl border border-[#dbe8dd] bg-white px-3 py-2.5 transition hover:border-[#159a56]/40"
                >
                  <Phone className="h-4 w-4 text-[#159a56]" /> {site.phone}
                </a>
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-2 rounded-xl border border-[#dbe8dd] bg-white px-3 py-2.5 transition hover:border-[#159a56]/40"
                >
                  <Mail className="h-4 w-4 text-[#159a56]" /> {site.email}
                </a>
                <p className="flex items-center gap-2 rounded-xl border border-[#dbe8dd] bg-white px-3 py-2.5">
                  <MapPin className="h-4 w-4 text-[#159a56]" /> {site.address}
                </p>
              </div>
            </div>
          </div>
        </article>
      </Section>

      <Section>
        <article className="overflow-hidden rounded-2xl border border-[#dbe8dd] bg-gradient-to-br from-[#f6fbf8] to-white p-6 shadow-card md:p-8">
          <div className="grid gap-6 md:grid-cols-[220px_1fr] md:items-center">
            <div className="flex justify-center md:justify-start">
              <img
                src={channel009Logo.src}
                width={360}
                height={210}
                alt="Channel009 logo"
                loading="lazy"
                className="w-full max-w-[220px] rounded-xl bg-white object-contain p-4 shadow-sm ring-1 ring-[#dbe8dd]"
              />
            </div>
            <div>
              <p className="text-xs font-black tracking-[0.2em] text-[#159a56] uppercase">
                News & Media
              </p>
              <h2 className="mt-3 font-display text-3xl font-black text-[#0e2f5e]">
                Channel009 — News & Media Brand
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-relaxed font-semibold text-[#4b5364]">
                Channel009, Citiline Technologies Private Limited का स्वतंत्र News & Media Brand है।
                BharatPahchan package लेने पर Channel009 editorial coverage guaranteed नहीं है।
              </p>
              <a
                href="https://channel009.news/"
                target="_blank"
                rel="noreferrer"
                className="premium-btn mt-6 inline-flex items-center gap-2 rounded-xl bg-[#0e2f5e] px-6 py-3.5 text-sm font-black text-white"
              >
                Channel009.news देखें <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </article>
      </Section>

      <Section>
        <SectionHeading title="अक्सर पूछे जाने वाले सवाल" />
        <div className="mx-auto mt-10 max-w-4xl space-y-3">
          {homepageFaqs.map((faq) => (
            <details
              key={faq.q}
              className="group rounded-2xl border border-[#dbe8dd] bg-white p-5 shadow-sm transition open:shadow-card"
            >
              <summary className="flex cursor-pointer list-none items-center gap-3 text-base font-black text-[#0e2f5e]">
                <HelpCircle className="h-5 w-5 shrink-0 text-[#159a56]" />
                {faq.q}
              </summary>
              <p className="mt-3 pl-8 text-sm leading-relaxed font-semibold text-neutral-700">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </Section>

      <Section muted>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-black tracking-[0.18em] text-[#159a56] uppercase">
              Latest Blog
            </p>
            <h2 className="mt-2 font-display text-3xl font-black text-[#0e2f5e] sm:text-4xl">
              ब्लॉग अपडेट
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#c3d2e6] bg-white px-5 py-3 text-sm font-extrabold text-[#15437f] shadow-sm transition hover:border-[#159a56] hover:text-[#159a56]"
          >
            और पढ़ें <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {latestBlogPosts.slice(0, 3).map((post) => (
            <Link
              key={post.id}
              href="/blog"
              className="group flex min-h-[330px] flex-col overflow-hidden rounded-2xl border border-[#dbe3ef] bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:border-[#159a56]/40 hover:shadow-[var(--shadow-premium)]"
            >
              <div className="overflow-hidden">
                <img
                  src={resolveBlogImage(post.image)}
                  alt={post.imageAltText || post.title}
                  className="aspect-[16/9] w-full bg-[#dbe8f7] object-cover transition duration-500 group-hover:scale-[1.04]"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex flex-wrap items-center gap-3 text-[11px] font-extrabold text-[#7a8496]">
                  <span className="rounded-md bg-saffron/12 px-2 py-1 text-saffron">
                    {post.category}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {post.publishDate || post.date}
                  </span>
                </div>
                <h3 className="mt-3 text-lg leading-snug font-black text-[#15437f]">
                  {post.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed font-semibold text-[#5b6376]">
                  {post.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <section className="relative overflow-hidden bg-[#0a2348] px-4 py-16 text-white sm:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(600px 280px at 15% 20%, rgba(21,154,86,0.28), transparent 55%), radial-gradient(520px 260px at 88% 10%, rgba(255,255,255,0.1), transparent 50%)",
          }}
        />
        <div className="relative mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-sm font-black tracking-[0.18em] text-[#7dcea0] uppercase">
              संपर्क करें
            </p>
            <h2 className="mt-3 font-display text-3xl font-black text-white sm:text-4xl">
              वेबसाइट पैकेज की जानकारी चाहिए?
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80">
              WhatsApp पर अपनी जरूरत भेजें। टीम पैकेज, उपलब्ध सेवाओं और आगे की प्रक्रिया की सही
              जानकारी देगी।
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={whatsappHref}
              className="premium-btn-green inline-flex items-center justify-center gap-2 rounded-xl bg-[#159a56] px-7 py-4 text-base font-black text-white"
            >
              <MessageCircle className="h-5 w-5" />
              WhatsApp करें
            </a>
            <a
              href={`tel:${site.phone}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-7 py-4 text-base font-black text-white backdrop-blur transition hover:bg-white/15"
            >
              <Phone className="h-5 w-5" />
              कॉल करें
            </a>
          </div>
        </div>
      </section>

      <MobileContactBar message={enquiryMessage} />
    </>
  );
}

function getWhatsappHref(message: string) {
  return `${site.whatsappUrl}?text=${encodeURIComponent(message)}`;
}

function resolveBlogImage(image: string) {
  if (image.startsWith("data:") || image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }

  return images[image] ?? fallbackImage;
}

function dailyEquivalent(price: string, period: string) {
  if (!period.includes("6")) {
    return null;
  }

  const amount = Number(price.replace(/[^\d]/g, ""));
  if (!Number.isFinite(amount) || amount <= 0) {
    return null;
  }

  return Math.round(amount / 180).toLocaleString("en-IN");
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
