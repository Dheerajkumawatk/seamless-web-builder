import Link from "next/link";
import { Check } from "lucide-react";
import type { packageCatalog } from "@/data/package-catalog";

type Plan = (typeof packageCatalog)[number];

export function PackagePlanCard({ plan, detail = false }: { plan: Plan; detail?: boolean }) {
  // The reference highlights the growth and professional cards only.
  const highlighted = plan.featured && plan.category !== "business";
  return (
    <article
      className={`relative flex h-full flex-col overflow-hidden rounded-[10px] border px-6 pt-6 pb-6 shadow-[0_8px_28px_-16px_rgba(63,113,164,0.18)] sm:px-7 ${detail ? "" : "min-h-[280px]"} ${highlighted ? "border-[#ffd4c2] bg-gradient-to-b from-[#fff9f5] to-white" : "border-[#dfe8f3] bg-white"}`}
    >
      {highlighted && (
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-[#ff571c]" />
      )}
      <div className="flex flex-wrap items-start justify-between gap-2">
        <h3 className="font-sans text-xl font-bold text-[#0b1e50]">{plan.name}</h3>
        {highlighted && plan.category === "election" && (
          <span className="absolute top-3 right-4 rounded-full bg-[#ffe0cf] px-2.5 py-1 text-[9px] font-bold text-[#c43c08]">
            RECOMMENDED
          </span>
        )}
      </div>
      <p
        className={`mt-2 text-[32px] leading-tight font-bold tracking-tight ${highlighted ? "text-[#ff571c]" : "text-[#0b1e50]"}`}
      >
        {plan.price}
      </p>
      {detail && (
        <>
          <p className="mt-1 text-sm text-[#5c7296]">{plan.period || "एक बार की पैकेज फीस"}</p>
          <p className="mt-4 text-sm leading-relaxed text-[#5c7296]">{plan.desc}</p>
        </>
      )}
      <ul className={`mb-6 flex-1 ${detail ? "mt-5 space-y-3" : "mt-5 space-y-2"}`}>
        {(detail ? plan.features : plan.features.slice(0, 3)).map((feature) => (
          <li
            key={feature}
            className={`flex items-start gap-2 leading-relaxed text-[#354b70] ${detail ? "text-sm" : "text-xs"}`}
          >
            <Check aria-hidden="true" className="mt-1 h-3.5 w-3.5 shrink-0 text-[#7792b3]" />
            <span className={detail ? "" : "line-clamp-2"} title={feature}>
              {feature}
            </span>
          </li>
        ))}
      </ul>
      {detail ? (
        <p className="border-t border-[#e5edf5] pt-4 text-xs text-[#5c7296]">
          लागू GST अतिरिक्त है। भुगतान से पहले अंतिम राशि देखें।
        </p>
      ) : (
        <Link
          href={`/packages/${plan.slug}`}
          aria-label={`${plan.name} — View More`}
          className={`inline-flex min-h-11 items-center justify-center rounded-lg border px-4 py-2.5 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ff571c] ${highlighted && plan.category === "election" ? "border-[#ff571c] bg-[#ff571c] text-white hover:bg-[#e74a10]" : "border-[#6b80a5] text-[#0b1e50] hover:border-[#ff571c] hover:bg-[#fff7f2]"}`}
        >
          View More
        </Link>
      )}
    </article>
  );
}
