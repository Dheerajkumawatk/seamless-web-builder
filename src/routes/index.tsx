import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Check,
  ClipboardList,
  HelpCircle,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Share2,
} from "lucide-react";
import { images } from "@/data/images";
import { audiences, packages, site, trustCapabilities, websiteSections } from "@/data/site";
import mobileSliderBackground from "@/assets/bharatpahchan-mobile-slider.png";
import channel009Logo from "@/assets/channel009-logo.png";
import { MobileContactBar } from "@/components/site/MobileContactBar";
import { PackageQueryButton } from "@/components/site/PackageQueryButton";
import { PersonalizedDemoPreview } from "@/components/site/PersonalizedDemoPreview";
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

export default function Index() {
  const whatsappHref = getWhatsappHref(enquiryMessage);

  return (
    <>
      <section className="relative min-h-[382px] overflow-hidden border-b border-emerald-100 bg-[#f8dfbf] sm:min-h-[620px]">
        <img
          src={mobileSliderBackground.src}
          width={1152}
          height={1408}
          alt="BharatPahchan digital campaign background"
          className="absolute inset-0 hidden h-full w-full object-cover object-center sm:block"
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

        <div className="relative z-10 mx-auto flex min-h-[382px] max-w-[1720px] items-start px-4 pt-11 pb-6 sm:min-h-[620px] sm:items-center sm:px-6 sm:py-20 lg:px-20">
          <div className="max-w-[84%] sm:max-w-[760px]">
            <h1 className="font-display text-[32px] leading-[1.06] font-black tracking-normal text-[#0a1526] [text-shadow:0_3px_12px_rgba(255,255,255,.95),0_1px_2px_rgba(255,255,255,.9)] sm:text-[58px] sm:leading-[1.08] lg:text-[76px]">
              पंचायत चुनाव की तैयारी कर रहे हैं?
              <br />
              <span className="text-[#0f7a42]">अपनी डिजिटल पहचान</span>{" "}
              <span className="text-[#0e2f5e]">आज से मजबूत बनाइए।</span>
            </h1>
            <p className="mt-3 max-w-[320px] text-[15px] leading-snug font-extrabold text-[#232a3c] [text-shadow:0_2px_10px_rgba(255,255,255,.95),0_1px_2px_rgba(255,255,255,.9)] sm:mt-7 sm:max-w-[650px] sm:text-2xl sm:leading-relaxed">
              उम्मीदवार वेबसाइट, सोशल मीडिया, वीडियो-ग्राफिक्स, डिजिटल आउटरीच और अभियान प्रबंधन — एक
              ही जगह।
            </p>

            <div className="mt-5 flex max-w-[340px] flex-row gap-2 sm:mt-10 sm:max-w-none sm:gap-5">
              <Link
                href="/#demo-form"
                className="inline-flex min-w-0 flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#0e2f5e] px-2 py-3 text-center text-[11px] leading-tight font-extrabold text-white shadow-[0_14px_26px_rgba(80,8,10,.22)] sm:min-w-[270px] sm:flex-none sm:gap-4 sm:px-9 sm:py-5 sm:text-xl"
              >
                मेरे नाम से डेमो बनाइए <ArrowRight className="h-4 w-4 shrink-0 sm:h-6 sm:w-6" />
              </Link>
              <a
                href={`tel:${site.phone}`}
                className="inline-flex min-w-0 flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#159a56] px-2 py-3 text-center text-[11px] leading-tight font-extrabold text-white shadow-[0_14px_26px_rgba(21,154,86,.25)] sm:min-w-[270px] sm:flex-none sm:gap-4 sm:px-9 sm:py-5 sm:text-xl"
              >
                अभी बात करें <Phone className="h-4 w-4 shrink-0 sm:h-6 sm:w-6" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#dbe8dd] bg-white px-4 py-4">
        <div className="mx-auto max-w-7xl text-center text-sm font-extrabold text-[#0e2f5e]">
          BharatPahchan — Citiline Technologies Private Limited द्वारा संचालित Digital Campaign
          Initiative
        </div>
      </section>

      <PersonalizedDemoPreview whatsappBaseUrl={site.whatsappUrl} />

      <Section>
        <SectionHeading title="हम किनके लिए काम करते हैं" />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((item) => (
            <article
              key={item.title}
              className="rounded-lg border border-[#dbe8dd] bg-white p-5 shadow-card"
            >
              <span className={`grid h-11 w-11 place-items-center rounded-full ${item.iconColor}`}>
                <Check className="h-5 w-5 text-white" />
              </span>
              <h3 className="mt-4 text-lg text-maroon">{item.title}</h3>
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
              Service Highlights
            </p>
            <h2 className="mt-3 font-display text-3xl font-black leading-tight text-[#0e2f5e] sm:text-4xl">
              आपकी पहचान, आपका काम और आपका संदेश — डिजिटल माध्यम से लोगों तक।
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed font-semibold text-[#4b5364]">
              BharatPahchan उम्मीदवार वेबसाइट, सोशल मीडिया, वीडियो, ग्राफिक्स और डिजिटल आउटरीच को एक
              जगह व्यवस्थित करने में मदद करता है।
            </p>
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {trustCapabilities.map((item) => (
                <article
                  key={item.label}
                  className="rounded-lg border border-[#dbe8dd] bg-white p-5 shadow-sm"
                >
                  <item.icon className="h-7 w-7 text-[#159a56]" />
                  <h3 className="mt-3 text-base font-black text-maroon">{item.label}</h3>
                </article>
              ))}
            </div>
            <Link
              href="/#demo-form"
              className="mt-7 inline-flex items-center gap-2 rounded-lg bg-[#0e2f5e] px-6 py-3.5 text-sm font-black text-white"
            >
              मेरे नाम से डेमो बनाइए <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs font-black tracking-[0.2em] text-[#159a56] uppercase">
              Digital Campaign
            </p>
            <h2 className="mt-3 font-display text-3xl font-black leading-tight text-[#0e2f5e] sm:text-4xl">
              आपकी पहचान, आपका काम और आपका संदेश — डिजिटल माध्यम से लोगों तक।
            </h2>
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
            <Link
              href="/#demo-form"
              className="mt-7 inline-flex items-center gap-2 rounded-lg bg-[#159a56] px-6 py-3.5 text-sm font-black text-white"
            >
              मेरे नाम से डेमो बनाइए <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <img
              src={images["panchayat"]}
              alt="पंचायत क्षेत्र का दृश्य"
              loading="lazy"
              className="h-72 w-full rounded-lg border border-[#dbe8dd] object-cover shadow-card"
            />
            <img
              src={images["rally"]}
              alt="स्थानीय सार्वजनिक सभा"
              loading="lazy"
              className="h-72 w-full rounded-lg border border-[#dbe8dd] object-cover shadow-card sm:mt-10"
            />
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading title="तीन आसान कदम" />
        <div className="mt-9 grid gap-5 md:grid-cols-3">
          {simpleProcess.map((item, index) => (
            <article
              key={item.title}
              className="rounded-lg border border-[#dbe8dd] bg-white p-6 shadow-card"
            >
              <div className="flex items-center gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#159a56] text-white">
                  <item.icon className="h-6 w-6" />
                </span>
                <span className="font-display text-3xl font-black text-[#0e2f5e]">{index + 1}</span>
              </div>
              <h3 className="mt-5 text-xl text-maroon">{item.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-neutral-700">{item.text}</p>
            </article>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link href="/services" className="text-sm font-extrabold text-[#0e2f5e] underline">
            सभी सेवाओं की जानकारी देखें
          </Link>
        </div>
      </Section>

      <Section className="website-demo-section border-y border-[#dbe8dd] bg-[#f6fbf8]">
        <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_.85fr]">
          <img
            src={images["demo"]}
            alt="सैंपल वेबसाइट प्रीव्यू"
            loading="lazy"
            className="w-full rounded-lg border border-[#dbe8dd] bg-white object-contain shadow-card"
          />
          <div>
            <p className="text-xs font-black tracking-[0.2em] text-[#159a56] uppercase">
              Sample Preview
            </p>
            <h2 className="mt-3 font-display text-3xl font-black leading-tight text-[#0e2f5e] sm:text-4xl">
              देखें आपकी उम्मीदवार वेबसाइट कैसी दिख सकती है
            </h2>
            <p className="mt-4 text-base leading-relaxed font-semibold text-[#4b5364]">
              आपके नाम, फोटो और क्षेत्र के अनुसार customised demo उपलब्ध।
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
              href="/#demo-form"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#0e2f5e] px-6 py-3.5 text-sm font-black text-white"
            >
              मेरे नाम से डेमो बनाइए <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Section>

      <Section className="relative overflow-hidden bg-[#fff4e1] [background-image:linear-gradient(135deg,rgba(189,55,31,.08)_0_14%,transparent_14%_28%,rgba(15,122,102,.07)_28%_42%,transparent_42%)]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-2 bg-[repeating-linear-gradient(90deg,#b72b24_0_26px,#f2a12b_26px_52px,#0f7a66_52px_78px,#173b6d_78px_104px)]" />
        <div className="relative text-center">
          <p className="mb-2 text-xs font-black tracking-[0.22em] text-[#0f7a66] uppercase">
            Rajasthani Digital Plans
          </p>
          <h2 className="font-display text-2xl font-bold text-[#8f1f1b] sm:text-3xl">
            पैकेज और कीमत
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
            कीमत और अवधि मौजूदा पैकेज डेटा से ली गई है। दैनिक भुगतान का दावा नहीं किया गया है।
          </p>
        </div>
        <div className="relative mt-7 grid gap-4 sm:mt-8 sm:gap-6 lg:grid-cols-3">
          {packages.map((p) => {
            const daily = dailyEquivalent(p.price, p.period);

            return (
              <article
                key={p.name}
                className={`relative flex flex-col overflow-hidden rounded-lg border bg-white/95 shadow-[0_18px_35px_rgba(91,43,18,.12)] ${
                  p.featured ? "border-[#f2a12b]" : "border-[#ead3a9]"
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
                  className={`px-5 py-5 text-center sm:px-6 sm:py-6 ${
                    p.featured ? `${homePackageTheme(p.theme).headBg} text-white` : "bg-[#fffaf1]"
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
                  <div className="rounded-lg border border-[#f0dfbd] bg-[#fff8ec] p-4 text-center">
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
                  <p className="mt-4 text-sm font-black text-[#0e2f5e]">शामिल सेवाएं</p>
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
                  />
                </div>
              </article>
            );
          })}
        </div>
      </Section>

      <Section muted>
        <article className="rounded-lg border border-[#dbe8dd] bg-white p-6 shadow-card">
          <div className="grid gap-5 lg:grid-cols-[auto_1fr] lg:items-center">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[#0e2f5e] text-white">
              <Building2 className="h-7 w-7" />
            </span>
            <div>
              <p className="text-xs font-black tracking-[0.18em] text-[#159a56] uppercase">
                कंपनी जानकारी
              </p>
              <h2 className="mt-2 font-display text-2xl font-black text-maroon">
                BharatPahchan.com
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-neutral-700">
                BharatPahchan.com, CITILINE TECHNOLOGIES PRIVATE LIMITED का एक venture है। यह निजी
                डिजिटल सेवा प्लेटफॉर्म है, सरकारी वेबसाइट नहीं।
              </p>
              <div className="mt-5 grid gap-3 text-sm font-semibold text-neutral-800 sm:grid-cols-3">
                <a href={`tel:${site.phone}`} className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-[#159a56]" /> {site.phone}
                </a>
                <a href={`mailto:${site.email}`} className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-[#159a56]" /> {site.email}
                </a>
                <p className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[#159a56]" /> {site.address}
                </p>
              </div>
            </div>
          </div>
        </article>
      </Section>

      <Section>
        <article className="rounded-lg border border-[#dbe8dd] bg-[#f6fbf8] p-6 shadow-card md:p-8">
          <div className="grid gap-6 md:grid-cols-[220px_1fr] md:items-center">
            <div className="flex justify-center md:justify-start">
              <img
                src={channel009Logo.src}
                width={360}
                height={210}
                alt="Channel009 logo"
                loading="lazy"
                className="w-full max-w-[220px] rounded-md bg-white/80 object-contain p-4 shadow-sm"
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
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#0e2f5e] px-6 py-3.5 text-sm font-black text-white"
              >
                Channel009.news देखें <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </article>
      </Section>

      <Section>
        <SectionHeading title="अक्सर पूछे जाने वाले सवाल" />
        <div className="mx-auto mt-9 max-w-4xl space-y-4">
          {homepageFaqs.map((faq) => (
            <details
              key={faq.q}
              className="rounded-lg border border-[#dbe8dd] bg-white p-5 shadow-sm"
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

      <section className="bg-[#0e2f5e] px-4 py-12 text-white">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-sm font-black tracking-[0.18em] text-white/70 uppercase">
              संपर्क करें
            </p>
            <h2 className="mt-3 font-display text-3xl font-black text-white">
              वेबसाइट पैकेज की जानकारी चाहिए?
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/82">
              WhatsApp पर अपनी जरूरत भेजें। टीम पैकेज, उपलब्ध सेवाओं और आगे की प्रक्रिया की सही
              जानकारी देगी।
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={whatsappHref}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#159a56] px-7 py-4 text-base font-black text-white"
            >
              <MessageCircle className="h-5 w-5" />
              WhatsApp करें
            </a>
            <a
              href={`tel:${site.phone}`}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/10 px-7 py-4 text-base font-black text-white"
            >
              <Phone className="h-5 w-5" />
              कॉल करें
            </a>
          </div>
        </div>
      </section>

      <div className="h-20 md:hidden" aria-hidden="true" />
      <MobileContactBar message={enquiryMessage} />
    </>
  );
}

function getWhatsappHref(message: string) {
  return `${site.whatsappUrl}?text=${encodeURIComponent(message)}`;
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
