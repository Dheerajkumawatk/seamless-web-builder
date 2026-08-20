import { Link } from "@tanstack/react-router";
import { Facebook, Globe, Instagram, Mail, MapPin, Phone, Send, Youtube } from "lucide-react";
import { nav, services, site } from "@/data/site";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-[#e6d8cd] bg-[#fffaf2] text-[#4a342f] shadow-[0_-2px_10px_rgba(94,32,10,.06)]">
      <div className="mx-auto grid max-w-[1720px] gap-10 px-6 py-11 md:grid-cols-2 lg:grid-cols-[1.22fr_.82fr_.98fr_.98fr] lg:px-20">
        <div className="pr-4">
          <Logo size="footer" />
          <p className="mt-5 max-w-[430px] text-[15px] leading-relaxed font-bold text-[#5a4a43]">
            हम भारत के हर गांव, हर वोट के उम्मीदवारों के लिए बेहतर डिजिटल अभियान और ब्रांडिंग समाधान
            प्रदान करते हैं।
          </p>
          <div className="mt-8 flex gap-6">
            {[Facebook, Instagram, Youtube, Send].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="social"
                className="grid h-9 w-9 place-items-center rounded-full border-2 border-[#d8c6ba] bg-white text-[#7a1215] shadow-sm transition-colors hover:border-saffron hover:bg-saffron hover:text-white"
              >
                <Icon className="h-4 w-4 stroke-[2.4]" />
              </a>
            ))}
          </div>
        </div>

        <div className="lg:border-l-2 lg:border-[#e5d8cd] lg:pl-16">
          <h4 className="text-[24px] leading-none text-[#231815]">क्विक लिंक</h4>
          <ul className="mt-7 space-y-3 text-[16px] font-extrabold text-[#5b4d47]">
            {nav.slice(1, 7).map((item) => (
              <li key={item.label}>
                <Link to={item.to} className="transition-colors hover:text-saffron">
                  • {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:border-l-2 lg:border-[#e5d8cd] lg:pl-16">
          <h4 className="text-[24px] leading-none text-[#231815]">सेवाएं</h4>
          <ul className="mt-7 space-y-3 text-[16px] font-extrabold text-[#5b4d47]">
            {services.map((s) => (
              <li key={s.slug}>
                <Link to="/services" className="transition-colors hover:text-saffron">
                  • {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:border-l-2 lg:border-[#e5d8cd] lg:pl-16">
          <h4 className="text-[24px] leading-none text-[#231815]">संपर्क करें</h4>
          <ul className="mt-7 space-y-5 text-[16px] font-extrabold text-[#5b4d47]">
            <li className="flex items-center gap-4">
              <MapPin className="h-5 w-5 shrink-0 fill-[#7a1215]/20 text-[#7a1215]" />{" "}
              {site.address}
            </li>
            <li className="flex items-center gap-4">
              <Phone className="h-5 w-5 shrink-0 fill-[#7a1215]/20 text-[#7a1215]" />
              <a href={`tel:${site.phone}`}>{site.phone}</a>
            </li>
            <li className="flex items-center gap-4">
              <Mail className="h-5 w-5 shrink-0 fill-[#7a1215]/20 text-[#7a1215]" />
              <a href={`mailto:${site.email}`} className="break-all">
                {site.email}
              </a>
            </li>
            <li className="flex items-center gap-4">
              <Globe className="h-5 w-5 shrink-0 text-[#7a1215]" /> {site.website}
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto max-w-[1720px] border-t-2 border-[#eaded3] px-6 lg:px-20">
        <div className="flex flex-col items-center justify-between gap-3 py-5 text-[14px] font-extrabold text-[#665b55] sm:flex-row">
          <p>© 2024 भारत पहचान. सभी अधिकार सुरक्षित।</p>
          <p className="flex gap-7 text-[#7a1215]">
            <span>गोपनीयता नीति</span>
            <span>|</span>
            <span>नियम और शर्तें</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
