import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Phone, Mail, Facebook, Instagram, Youtube, Send } from "lucide-react";
import { nav, site } from "@/data/site";
import { Logo } from "./Logo";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      {/* Top bar */}
      <div className="hidden bg-maroon text-maroon-foreground md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 text-xs">
          <p className="flex min-w-0 items-center gap-2 truncate">
            <span className="text-gold">◆</span>
            {site.topbar}
          </p>
          <div className="flex shrink-0 items-center gap-5">
            <a href={`tel:${site.phone}`} className="flex items-center gap-1.5 hover:text-gold">
              <Phone className="h-3.5 w-3.5" /> {site.phone}
            </a>
            <a href={`mailto:${site.email}`} className="flex items-center gap-1.5 hover:text-gold">
              <Mail className="h-3.5 w-3.5" /> {site.email}
            </a>
            <div className="flex items-center gap-2">
              {[Facebook, Instagram, Youtube, Send].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="social"
                  className="grid h-6 w-6 place-items-center rounded-full bg-maroon-foreground/10 hover:bg-saffron"
                >
                  <Icon className="h-3 w-3" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="border-b border-border bg-card/95 backdrop-blur">
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 lg:flex lg:justify-between">
          <Link to="/" className="flex min-w-0 items-center gap-2" onClick={() => setOpen(false)}>
            <Logo />
          </Link>

          <nav className="hidden items-center gap-4 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeProps={{ className: "text-saffron" }}
                className="text-sm font-semibold text-foreground/80 transition-colors hover:text-saffron"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/contact"
              className="rounded-md bg-saffron px-4 py-2 text-sm font-semibold text-saffron-foreground shadow-soft transition-transform hover:scale-[1.03]"
            >
              फ्री कंसल्टेशन बुक करें
            </Link>
          </nav>

          <button
            aria-label="मेन्यू"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-border text-maroon lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open && (
          <nav className="border-t border-border bg-card px-4 py-3 lg:hidden">
            <div className="flex flex-col">
              {nav.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  activeProps={{ className: "text-saffron" }}
                  className="border-b border-border/60 py-3 text-sm font-semibold text-foreground/85"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="mt-4 rounded-md bg-saffron px-4 py-3 text-center text-sm font-semibold text-saffron-foreground"
              >
                फ्री कंसल्टेशन बुक करें
              </Link>
              <a
                href={`tel:${site.phone}`}
                className="mt-2 rounded-md border border-border px-4 py-3 text-center text-sm font-semibold text-maroon"
              >
                {site.phone}
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
