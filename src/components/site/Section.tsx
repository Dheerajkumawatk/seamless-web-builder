import type { ReactNode } from "react";

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

export function PageHero({ title, sub }: { title: string; sub: string }) {
  return (
    <section className="page-canvas border-b border-border">
      <div className="mx-auto max-w-7xl px-4 py-12 text-center sm:py-16">
        <h1 className="font-display text-3xl font-bold text-maroon sm:text-4xl md:text-5xl">
          {title}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground sm:text-base">{sub}</p>
      </div>
    </section>
  );
}
