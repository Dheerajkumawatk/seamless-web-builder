import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { packageCategories } from "@/data/package-catalog";

function SolutionIcon({ category }: { category: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-14 w-14 sm:h-16 sm:w-16"
    >
      {category === "affordable" ? (
        <>
          <path d="M12 38h56v32H12zM12 38l8-15h12m19 0h9l8 15M28 29h24" stroke="#0b285f" />
          <path d="m29 24 18-21 16 13-18 21zM52 14l3 3" stroke="#ff571c" />
        </>
      ) : category === "election" ? (
        <>
          <path d="m15 51 36-24M15 51l46 16" stroke="#0b285f" />
          <path
            d="M23 39c0 7-8 15-8 15S7 46 7 39a8 8 0 1 1 16 0ZM59 14c0 7-8 15-8 15s-8-8-8-15a8 8 0 1 1 16 0ZM69 54c0 7-8 15-8 15s-8-8-8-15a8 8 0 1 1 16 0Z"
            stroke="#ff571c"
          />
          <circle cx="15" cy="39" r="2" fill="#ff571c" stroke="#ff571c" />
          <circle cx="51" cy="14" r="2" fill="#ff571c" stroke="#ff571c" />
          <circle cx="61" cy="54" r="2" fill="#ff571c" stroke="#ff571c" />
        </>
      ) : (
        <>
          <rect x="11" y="25" width="58" height="43" rx="3" stroke="#0b285f" />
          <path d="M30 25V14h20v11M11 44h23m12 0h23" stroke="#0b285f" />
          <rect x="34" y="39" width="12" height="15" rx="1" stroke="#ff571c" />
        </>
      )}
    </svg>
  );
}

export function PackageSolutions() {
  return (
    <section
      id="packages"
      aria-labelledby="home-packages-title"
      className="relative isolate scroll-mt-28 overflow-hidden bg-[#fbfdff] py-14 sm:py-20 [&_h2]:font-sans [&_h3]:font-sans"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-28 -right-20 -z-10 h-72 w-72 rotate-45 rounded-[42px] border-2 border-[#d9eaff] p-10"
      >
        <div className="h-full w-full rounded-3xl bg-[#e6f2ff]" />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-28 -z-10 h-64 w-64 rotate-45 rounded-[38px] border-2 border-[#d9eaff] p-9"
      >
        <div className="h-full w-full rounded-3xl bg-[#e6f2ff]" />
      </div>
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <p className="text-xs font-bold tracking-[0.18em] text-[#ff571c] uppercase sm:text-sm">
          Our Solutions
        </p>
        <h2
          id="home-packages-title"
          className="mt-4 max-w-5xl text-3xl leading-tight font-bold tracking-tight text-[#080f40] sm:text-4xl lg:text-[48px]"
        >
          The Right Plan. The Right Direction.
        </h2>
        <p className="mt-4 max-w-4xl text-base leading-relaxed text-[#5c6c88] sm:text-xl">
          Explore solutions for your campaign, territory and business.
        </p>
        <div className="mt-9 grid gap-5 md:grid-cols-3 sm:mt-12">
          {packageCategories.map((category) => {
            const featured = category.id === "election";
            return (
              <article
                key={category.id}
                className="relative flex flex-col overflow-hidden rounded-2xl border border-[#d4e5fb] bg-white/90 p-6 shadow-[0_10px_35px_-28px_rgba(40,85,140,0.25)] sm:p-7 lg:p-8"
              >
                {featured && (
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-[3px] bg-[#ff571c]"
                  />
                )}
                <div className="flex items-start justify-between gap-3">
                  <span className="grid h-20 w-20 place-items-center rounded-2xl bg-[#f0f7ff] sm:h-24 sm:w-24">
                    <SolutionIcon category={category.id} />
                  </span>
                  <span className="pt-1 text-base font-bold tracking-wide text-[#8ca7ca]">
                    {category.number}
                  </span>
                </div>
                <h3 className="mt-6 text-2xl leading-tight font-bold tracking-tight text-[#080f40] lg:min-h-[88px] lg:text-[30px]">
                  {category.title}
                </h3>
                <p className="mt-4 mb-7 flex-1 text-base leading-relaxed text-[#526582] lg:text-lg">
                  {category.overview}
                </p>
                <Link
                  href={`/packages/category/${category.slug}`}
                  aria-label={`${category.title} — View More`}
                  className={`inline-flex min-h-12 items-center justify-center gap-4 rounded-lg border px-4 py-3 text-base font-bold transition focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ff571c] ${featured ? "border-[#ff571c] bg-[#ff571c] text-white hover:bg-[#e74a10]" : "border-[#0b1e50] text-[#0b1e50] hover:border-[#ff571c] hover:bg-[#fff7f2]"}`}
                >
                  View More <ArrowRight aria-hidden="true" className="h-5 w-5" />
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
