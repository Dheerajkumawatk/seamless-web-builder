import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Youtube, Send, MapPin, Phone, Mail, Globe } from "lucide-react";
import { nav, services, site } from "@/data/site";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-maroon text-maroon-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo light />
          <p className="mt-4 text-sm leading-relaxed text-maroon-foreground/75">
            हम भारत के हर गाँव, हर क्षेत्र के उम्मीदवारों को डिजिटल अभियान और ब्रांडिंग समाधान प्रदान करते हैं।
          </p>
          <div className="mt-5 flex gap-2">
            {[Facebook, Instagram, Youtube, Send].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="social"
                className="grid h-9 w-9 place-items-center rounded-full bg-maroon-foreground/10 transition-colors hover:bg-saffron"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-base text-gold">क्विक लिंक</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-maroon-foreground/80">
            {nav.slice(1).map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="transition-colors hover:text-gold">
                  • {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-base text-gold">सेवाएँ</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-maroon-foreground/80">
            {services.map((s) => (
              <li key={s.slug}>
                <Link to="/services" className="transition-colors hover:text-gold">
                  • {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-base text-gold">संपर्क करें</h4>
          <ul className="mt-4 space-y-3 text-sm text-maroon-foreground/80">
            <li className="flex gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-saffron" /> {site.address}
            </li>
            <li className="flex gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-saffron" />
              <a href={`tel:${site.phone}`}>{site.phone}</a>
            </li>
            <li className="flex gap-2">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-saffron" />
              <a href={`mailto:${site.email}`} className="break-all">
                {site.email}
              </a>
            </li>
            <li className="flex gap-2">
              <Globe className="mt-0.5 h-4 w-4 shrink-0 text-saffron" /> {site.website}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-maroon-foreground/15">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-maroon-foreground/70 sm:flex-row">
          <p>© 2026 भारत पहचान. सभी अधिकार सुरक्षित.</p>
          <p className="flex gap-4">
            <span>गोपनीयता नीति</span>
            <span>|</span>
            <span>नियम और शर्तें</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
