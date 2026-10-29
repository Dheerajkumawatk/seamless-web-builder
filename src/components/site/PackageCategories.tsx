import { PackagePlanCard } from "@/components/site/PackagePlanCard";
import { packageCatalog, packageCategories } from "@/data/package-catalog";

export function PackageCategories({
  headingAs = "h2",
  idPrefix = "",
  categoryId,
  showHeading = true,
}: {
  headingAs?: "h2" | "h3";
  idPrefix?: string;
  categoryId?: string;
  showHeading?: boolean;
}) {
  const Heading = headingAs;
  return (
    <div className="bg-[#fbfdff] text-[#0b1e50] [&_h2]:font-sans [&_h3]:font-sans">
      <div className="mx-auto max-w-[1120px] space-y-9 px-5 py-6 sm:space-y-10 sm:px-10 sm:py-7">
        {packageCategories
          .filter((category) => !categoryId || category.id === categoryId)
          .map((category) => (
            <section
              key={category.id}
              id={`${idPrefix}${category.id}`}
              aria-labelledby={showHeading ? `${idPrefix}${category.id}-title` : undefined}
              aria-label={showHeading ? undefined : category.title}
              className="scroll-mt-32"
            >
              {showHeading && (
                <div className="mb-4 flex items-start gap-4 sm:gap-5">
                  <span
                    aria-hidden="true"
                    className="text-5xl leading-none font-bold tracking-tighter text-[#d3e2f2] sm:text-[60px]"
                  >
                    {category.number}
                  </span>
                  <div>
                    <Heading
                      id={`${idPrefix}${category.id}-title`}
                      className="text-xl leading-tight font-bold tracking-tight text-[#0b1e50] sm:text-[30px]"
                    >
                      {category.title}
                    </Heading>
                    <p className="mt-1 text-sm text-[#5c7296] sm:text-base">{category.subtitle}</p>
                  </div>
                </div>
              )}
              <div
                className={`grid gap-4 sm:grid-cols-2 ${category.id === "affordable" ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}
              >
                {packageCatalog
                  .filter((plan) => plan.category === category.id)
                  .map((plan) => (
                    <PackagePlanCard key={plan.slug} plan={plan} />
                  ))}
              </div>
            </section>
          ))}
      </div>
    </div>
  );
}
