import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PackageCategories } from "@/components/site/PackageCategories";
import { packageCategories } from "@/data/package-catalog";
import { seo } from "@/lib/seo";

type Props = { params: Promise<{ category: string }> };

export function generateStaticParams() {
  return packageCategories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: slug } = await params;
  const category = packageCategories.find((item) => item.slug === slug);
  if (!category) notFound();
  return seo({
    title: category.title,
    description: `${category.subtitle} सभी पैकेज की कीमत, सेवाएं और पूरी जानकारी देखें।`,
    canonical: `/packages/category/${category.slug}`,
  });
}

export default async function CategoryPlans({ params }: Props) {
  const { category: slug } = await params;
  const category = packageCategories.find((item) => item.slug === slug);
  if (!category) notFound();
  return (
    <div className="bg-[#fbfdff] text-[#0b1e50] [&_h1]:font-sans">
      <header className="mx-auto max-w-[1120px] px-5 pt-10 sm:px-10 sm:pt-14">
        <Link
          href="/#packages"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#5c7296] hover:text-[#d8410c]"
        >
          <ArrowLeft className="h-4 w-4" /> सभी कैटेगरी देखें
        </Link>
        <p className="mt-7 text-xs font-bold tracking-[0.16em] text-[#d8410c] uppercase">
          Plans & Pricing · {category.number}
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#0b1e50] sm:text-4xl">
          {category.title}
        </h1>
        <p className="mt-3 text-base text-[#5c7296]">{category.subtitle}</p>
        <nav aria-label="Plan categories" className="mt-7 mb-2 flex flex-wrap gap-2">
          {packageCategories.map((item) => (
            <Link
              key={item.id}
              href={`/packages/category/${item.slug}`}
              aria-current={item.id === category.id ? "page" : undefined}
              className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${item.id === category.id ? "border-[#0b1e50] bg-[#0b1e50] text-white" : "border-[#dce6f2] bg-white text-[#5c7296] hover:border-[#ff571c]"}`}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </header>
      <PackageCategories categoryId={category.id} showHeading={false} />
      <p className="mx-auto max-w-[1120px] px-5 pb-12 text-xs leading-relaxed text-[#5c7296] sm:px-10">
        {category.note}
      </p>
    </div>
  );
}
