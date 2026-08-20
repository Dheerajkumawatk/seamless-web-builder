"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Facebook, Instagram, Mail, MapPin, Menu, Phone, Send, X, Youtube } from "lucide-react";
import { nav, site } from "@/data/site";
import { Logo } from "@/components/layout/Logo";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 shadow-[0_2px_12px_rgba(76,7,9,.18)]">
      <div className="hidden border-b border-white/10 bg-[#6d070b] text-white md:block">
        <div className="mx-auto flex h-[42px] max-w-[1720px] items-center justify-between gap-4 px-8 text-[14px] font-bold xl:px-14">
          <p className="flex min-w-0 items-center gap-2 truncate">
            <MapPin className="h-4 w-4 fill-white/15" />
            {site.topbar}
          </p>
          <div className="flex shrink-0 items-center gap-12">
            <a href={`tel:${site.phone}`} className="flex items-center gap-1.5 hover:text-gold">
              <Phone className="h-4 w-4 fill-white/15" /> {site.phone}
            </a>
            <a href={`mailto:${site.email}`} className="flex items-center gap-1.5 hover:text-gold">
              <Mail className="h-4 w-4 fill-white/15" /> {site.email}
            </a>
            <div className="flex items-center gap-3">
              {[Facebook, Instagram, Youtube, Send].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="social"
                  className="grid h-7 w-7 place-items-center rounded-full border border-[#d96a24]/65 bg-[#4f0708]/30 text-white hover:bg-saffron"
                >
                  <Icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-[#eaded6] bg-white/98 backdrop-blur">
        <div className="mx-auto grid h-[104px] max-w-[1720px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 md:px-8 lg:flex lg:justify-between xl:px-14">
          <Link href="/" className="flex min-w-0 items-center gap-2" onClick={() => setOpen(false)}>
            <Logo />
          </Link>

          <nav className="hidden items-center gap-9 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.label}
                href={item.to}
                className={`whitespace-nowrap text-[15px] font-extrabold transition-colors hover:text-[#e95a09] ${
                  pathname === item.to ? "text-[#e95a09]" : "text-[#4b302b]"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/"
              className="ml-2 whitespace-nowrap rounded-lg bg-[#f3630b] px-7 py-4 text-[15px] font-extrabold text-white shadow-[0_8px_18px_rgba(243,99,11,.22)] transition-transform hover:scale-[1.03]"
            >
              फ्री कंसल्टेशन बुक करें
            </Link>
          </nav>

          <button
            aria-label="मेन्यू"
            onClick={() => setOpen((v) => !v)}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-md border border-border text-maroon lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open && (
          <nav className="border-t border-border bg-white px-4 py-3 lg:hidden">
            <div className="flex flex-col">
              {nav.map((item) => (
                <Link
                  key={item.label}
                  href={item.to}
                  onClick={() => setOpen(false)}
                  className={`border-b border-border/60 py-3 text-sm font-bold ${
                    pathname === item.to ? "text-saffron" : "text-neutral-800"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="mt-4 rounded-md bg-saffron px-4 py-3 text-center text-sm font-bold text-white"
              >
                फ्री कंसल्टेशन बुक करें
              </Link>
              <a
                href={`tel:${site.phone}`}
                className="mt-2 rounded-md border border-border px-4 py-3 text-center text-sm font-bold text-maroon"
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
