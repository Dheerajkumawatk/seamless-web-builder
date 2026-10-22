"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Facebook,
  Globe,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Youtube,
} from "lucide-react";
import { nav, secondaryNav, services, site } from "@/data/site";
import { Logo } from "@/components/layout/Logo";

const legalLinks = [
  { label: "Privacy Policy", to: "/privacy-policy" },
  { label: "Refund Policy", to: "/refund-policy" },
  { label: "Terms & Conditions", to: "/terms-conditions" },
  { label: "Disclaimer", to: "/disclaimer" },
];

export function Footer() {
  const pathname = usePathname();
  const socialLinks = [
    { icon: Facebook, href: site.socialLinks.facebook, label: "Facebook" },
    { icon: Instagram, href: site.socialLinks.instagram, label: "Instagram" },
    { icon: Youtube, href: site.socialLinks.youtube, label: "YouTube" },
    { icon: MessageCircle, href: site.whatsappUrl, label: "WhatsApp" },
  ];

  if (pathname.startsWith("/admin") || pathname.startsWith("/vikas-mitra/id-card")) {
    return null;
  }

  return (
    <footer
      className={`${pathname === "/" ? "pb-[calc(5rem+env(safe-area-inset-bottom))] md:pb-0" : "pb-20 sm:pb-0"} relative overflow-hidden border-t border-[#0a2348] bg-[#0a2348] text-white`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(520px 240px at 10% 0%, rgba(21,154,86,0.18), transparent 55%), radial-gradient(460px 220px at 90% 20%, rgba(255,255,255,0.06), transparent 50%)",
        }}
      />
      <div className="relative mx-auto grid max-w-[1720px] gap-10 px-6 py-14 md:grid-cols-2 lg:grid-cols-[1.22fr_.82fr_.98fr_.98fr] lg:px-20">
        <div className="pr-4">
          <div className="inline-flex rounded-2xl bg-white/95 p-2 shadow-sm ring-1 ring-white/20">
            <Logo size="footer" />
          </div>
          <p className="mt-5 max-w-[430px] text-[15px] leading-relaxed font-bold text-white/75">
            हम भारत के हर गांव, हर वोट के उम्मीदवारों के लिए बेहतर डिजिटल अभियान और ब्रांडिंग समाधान
            प्रदान करते हैं।
          </p>
          <div className="mt-8 flex gap-3">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-white/10 text-white transition hover:border-[#159a56] hover:bg-[#159a56]"
              >
                <Icon className="h-4 w-4 stroke-[2.4]" />
              </a>
            ))}
          </div>
        </div>

        <div className="lg:border-l lg:border-white/15 lg:pl-5 2xl:pl-16">
          <h4 className="font-display text-[22px] leading-none text-white">क्विक लिंक</h4>
          <ul className="mt-7 space-y-3 text-[15px] font-extrabold text-white/70">
            {[...nav, ...secondaryNav].slice(1).map((item) => (
              <li key={item.label}>
                <Link href={item.to} className="transition-colors hover:text-[#7dcea0]">
                  {item.label}
                </Link>
              </li>
            ))}
            {legalLinks.map((item) => (
              <li key={item.to}>
                <Link href={item.to} className="transition-colors hover:text-[#7dcea0]">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:border-l lg:border-white/15 lg:pl-5 2xl:pl-16">
          <h4 className="font-display text-[22px] leading-none text-white">सेवाएं</h4>
          <ul className="mt-7 space-y-3 text-[15px] font-extrabold text-white/70">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href="/services" className="transition-colors hover:text-[#7dcea0]">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:border-l lg:border-white/15 lg:pl-5 2xl:pl-16">
          <h4 className="font-display text-[22px] leading-none text-white">संपर्क करें</h4>
          <ul className="mt-7 space-y-5 text-[15px] font-extrabold text-white/70">
            <li className="flex items-center gap-4">
              <MapPin className="h-5 w-5 shrink-0 text-[#7dcea0]" /> {site.address}
            </li>
            <li className="flex items-center gap-4">
              <Phone className="h-5 w-5 shrink-0 text-[#7dcea0]" />
              <a href={`tel:${site.phone}`} className="hover:text-white">
                {site.phone}
              </a>
            </li>
            <li className="flex items-center gap-4">
              <Mail className="h-5 w-5 shrink-0 text-[#7dcea0]" />
              <a href={`mailto:${site.email}`} className="break-all hover:text-white">
                {site.email}
              </a>
            </li>
            <li className="flex items-center gap-4">
              <Globe className="h-5 w-5 shrink-0 text-[#7dcea0]" /> {site.website}
            </li>
          </ul>
        </div>
      </div>

      <div className="relative mx-auto max-w-[1720px] border-t border-white/10 px-6 lg:px-20">
        <div className="border-b border-white/10 py-5 text-[13px] leading-relaxed font-semibold text-white/55">
          <p>
            <span className="font-extrabold text-[#7dcea0]">Disclaimer:</span> भारत पहचान एक
            स्वतंत्र डिजिटल सेवा प्रदाता है, जो ग्राम पंचायत, सरपंच एवं जनप्रतिनिधियों हेतु वेबसाइट
            निर्माण, डिजिटल प्रोफ़ाइल एवं सूचना-प्रसार सेवाएँ प्रदान करता है। यह किसी सरकार, सरकारी
            विभाग अथवा किसी राजनीतिक दल, उम्मीदवार या नेता से संबद्ध, संबंधित अथवा समर्थित नहीं है,
            और न ही किसी चुनाव परिणाम या चुनावी जीत-हार की गारंटी देता है।
          </p>
        </div>
        <div className="flex flex-col items-center justify-between gap-3 py-5 text-[14px] font-extrabold text-white/55 sm:flex-row">
          <p>© 2026 भारत पहचान. सभी अधिकार सुरक्षित। Citiline Technologies Private Limited</p>
          <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-white/75">
            {legalLinks.map((item, index) => (
              <span key={item.to} className="flex items-center gap-4">
                {index > 0 && <span aria-hidden="true" className="text-white/25">|</span>}
                <Link href={item.to} className="transition-colors hover:text-[#7dcea0]">
                  {item.label}
                </Link>
              </span>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
