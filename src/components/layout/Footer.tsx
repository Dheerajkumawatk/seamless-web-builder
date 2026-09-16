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
      className={`${pathname === "/" ? "pb-[calc(5rem+env(safe-area-inset-bottom))] md:pb-0" : "pb-20 sm:pb-0"} border-t border-[#dbe3ef] bg-[#f7faff] text-[#33384a] shadow-[0_-2px_10px_rgba(18,58,114,.06)]`}
    >
      <div className="mx-auto grid max-w-[1720px] gap-10 px-6 py-11 md:grid-cols-2 lg:grid-cols-[1.22fr_.82fr_.98fr_.98fr] lg:px-20">
        <div className="pr-4">
          <Logo size="footer" />
          <p className="mt-5 max-w-[430px] text-[15px] leading-relaxed font-bold text-[#4b5364]">
            हम भारत के हर गांव, हर वोट के उम्मीदवारों के लिए बेहतर डिजिटल अभियान और ब्रांडिंग समाधान
            प्रदान करते हैं।
          </p>
          <div className="mt-8 flex gap-6">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="grid h-9 w-9 place-items-center rounded-full border-2 border-[#c3d2e6] bg-white text-[#15437f] shadow-sm transition-colors hover:border-saffron hover:bg-saffron hover:text-white"
              >
                <Icon className="h-4 w-4 stroke-[2.4]" />
              </a>
            ))}
          </div>
        </div>

        <div className="lg:border-l-2 lg:border-[#dbe3ef] lg:pl-5 2xl:pl-16">
          <h4 className="text-[24px] leading-none text-[#1f2532]">क्विक लिंक</h4>
          <ul className="mt-7 space-y-3 text-[16px] font-extrabold text-[#4b5364]">
            {[...nav, ...secondaryNav].slice(1).map((item) => (
              <li key={item.label}>
                <Link href={item.to} className="transition-colors hover:text-saffron">
                  • {item.label}
                </Link>
              </li>
            ))}
            {legalLinks.map((item) => (
              <li key={item.to}>
                <Link href={item.to} className="transition-colors hover:text-saffron">
                  • {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:border-l-2 lg:border-[#dbe3ef] lg:pl-5 2xl:pl-16">
          <h4 className="text-[24px] leading-none text-[#1f2532]">सेवाएं</h4>
          <ul className="mt-7 space-y-3 text-[16px] font-extrabold text-[#4b5364]">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href="/services" className="transition-colors hover:text-saffron">
                  • {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:border-l-2 lg:border-[#dbe3ef] lg:pl-5 2xl:pl-16">
          <h4 className="text-[24px] leading-none text-[#1f2532]">संपर्क करें</h4>
          <ul className="mt-7 space-y-5 text-[16px] font-extrabold text-[#4b5364]">
            <li className="flex items-center gap-4">
              <MapPin className="h-5 w-5 shrink-0 fill-[#15437f]/20 text-[#15437f]" />{" "}
              {site.address}
            </li>
            <li className="flex items-center gap-4">
              <Phone className="h-5 w-5 shrink-0 fill-[#15437f]/20 text-[#15437f]" />
              <a href={`tel:${site.phone}`}>{site.phone}</a>
            </li>
            <li className="flex items-center gap-4">
              <Mail className="h-5 w-5 shrink-0 fill-[#15437f]/20 text-[#15437f]" />
              <a href={`mailto:${site.email}`} className="break-all">
                {site.email}
              </a>
            </li>
            <li className="flex items-center gap-4">
              <Globe className="h-5 w-5 shrink-0 text-[#15437f]" /> {site.website}
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto max-w-[1720px] border-t-2 border-[#dde5f0] px-6 lg:px-20">
        <div className="border-b border-[#dde5f0] py-5 text-[13px] leading-relaxed font-semibold text-[#5b6376]">
          <p>
            <span className="font-extrabold text-[#15437f]">Disclaimer:</span> भारत पहचान एक
            स्वतंत्र डिजिटल सेवा प्रदाता है, जो ग्राम पंचायत, सरपंच एवं जनप्रतिनिधियों हेतु वेबसाइट
            निर्माण, डिजिटल प्रोफ़ाइल एवं सूचना-प्रसार सेवाएँ प्रदान करता है। यह किसी सरकार, सरकारी
            विभाग अथवा किसी राजनीतिक दल, उम्मीदवार या नेता से संबद्ध, संबंधित अथवा समर्थित नहीं है,
            और न ही किसी चुनाव परिणाम या चुनावी जीत-हार की गारंटी देता है।
          </p>
        </div>
        <div className="flex flex-col items-center justify-between gap-3 py-5 text-[14px] font-extrabold text-[#5b6376] sm:flex-row">
          <p>© 2026 भारत पहचान. सभी अधिकार सुरक्षित। Citiline Technologies Private Limited</p>
          <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[#15437f]">
            {legalLinks.map((item, index) => (
              <span key={item.to} className="flex items-center gap-4">
                {index > 0 && <span aria-hidden="true">|</span>}
                <Link href={item.to} className="transition-colors hover:text-saffron">
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
