import Link from "next/link";
import type { ReactNode } from "react";

export function Prose({ children }: { children: ReactNode }) {
  return <div className="blog-prose">{children}</div>;
}

export function BlogBackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 rounded-full border border-border bg-white/80 py-1.5 pr-4 pl-1.5 text-sm font-bold text-maroon shadow-sm backdrop-blur transition hover:border-saffron hover:text-saffron"
    >
      <span
        aria-hidden="true"
        className="grid h-7 w-7 place-items-center rounded-full bg-maroon text-white transition group-hover:bg-saffron"
      >
        ←
      </span>
      {label}
    </Link>
  );
}

export function SectionHeading({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="text-center">
      <h2 className="section-title text-xl sm:text-2xl md:text-3xl">{title}</h2>
      {sub && (
        <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">{sub}</p>
      )}
    </div>
  );
}

export function Section({
  children,
  className = "",
  muted = false,
}: {
  children: ReactNode;
  className?: string;
  muted?: boolean;
}) {
  return (
    <section className={`${muted ? "bg-cream" : ""} py-12 sm:py-16 ${className}`}>
      <div className="mx-auto max-w-7xl px-4">{children}</div>
    </section>
  );
}

export function PageHero({ title, sub }: { title: string; sub?: string }) {
  return (
    <section className="page-canvas border-b border-border">
      <div className="mx-auto max-w-7xl px-4 py-12 text-center sm:py-16">
        <h1 className="font-display text-3xl font-bold text-maroon sm:text-4xl md:text-5xl">
          {title}
        </h1>
        {sub && (
          <p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground sm:text-base">{sub}</p>
        )}
      </div>
    </section>
  );
}

export function BlogHero({
  eyebrow,
  title,
  sub,
  stats,
}: {
  eyebrow: string;
  title: ReactNode;
  sub?: string;
  stats?: Array<{ value: string; label: string }>;
}) {
  return (
    <section className="relative overflow-hidden bg-[#0e2f5e]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(720px 340px at 12% -10%, rgba(229,92,36,.42), transparent 60%), radial-gradient(640px 320px at 88% 0%, rgba(22,132,84,.38), transparent 60%), linear-gradient(180deg, rgba(255,255,255,.07), transparent 45%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.35) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage: "radial-gradient(80% 90% at 50% 0%, black, transparent)",
          WebkitMaskImage: "radial-gradient(80% 90% at 50% 0%, black, transparent)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4 pt-12 pb-10 sm:pt-16 sm:pb-14">
        <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[11px] font-extrabold tracking-[0.22em] text-white/90 uppercase backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-[#ff8a3d]" />
          {eyebrow}
        </p>
        <h1 className="mt-5 max-w-3xl font-display text-3xl leading-[1.2] font-black text-white sm:text-4xl md:text-[44px]">
          {title}
        </h1>
        {sub && (
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed font-medium text-white/75 sm:text-base">
            {sub}
          </p>
        )}
        {stats && stats.length > 0 && (
          <dl className="mt-8 grid max-w-2xl grid-cols-3 gap-3">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-white/15 bg-white/[0.07] px-4 py-3 backdrop-blur"
              >
                <dt className="order-2 mt-1 block text-[11px] font-bold text-white/65">
                  {s.label}
                </dt>
                <dd className="font-display text-xl font-black text-white sm:text-2xl">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </div>
      <div className="relative h-6 overflow-hidden">
        <svg viewBox="0 0 1440 24" preserveAspectRatio="none" className="h-full w-full">
          <path d="M0 24h1440V8C1200 22 960 22 720 12 480 2 240 4 0 14v10z" fill="#f4f8ff" />
        </svg>
      </div>
    </section>
  );
}
