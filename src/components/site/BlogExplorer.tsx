"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock3, Search, Sparkles } from "lucide-react";

export type BlogExplorerPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  imageUrl: string;
  imageAlt: string;
  readTime: number;
};

const CATEGORY_STYLES: Record<string, string> = {
  रणनीति: "bg-[#123a72]/90 text-white",
  वेबसाइट: "bg-[#168454]/90 text-white",
  वीडियो: "bg-[#7c2d12]/90 text-white",
  युवा: "bg-[#6d28d9]/90 text-white",
  कानूनी: "bg-[#0f766e]/90 text-white",
};

function categoryStyle(category: string) {
  return CATEGORY_STYLES[category] ?? "bg-[#0e2f5e]/90 text-white";
}

function Meta({ post, light = false }: { post: BlogExplorerPost; light?: boolean }) {
  return (
    <div
      className={`flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-semibold ${
        light ? "text-white/80" : "text-muted-foreground"
      }`}
    >
      <span className="inline-flex items-center gap-1.5">
        <CalendarDays className="h-3.5 w-3.5" /> {post.date}
      </span>
      <span className="inline-flex items-center gap-1.5">
        <Clock3 className="h-3.5 w-3.5" /> {post.readTime} मिनट में पढ़ें
      </span>
    </div>
  );
}

function PostCard({ post, index = 0 }: { post: BlogExplorerPost; index?: number }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-[24px] border border-[#e3eaf5] bg-white shadow-[0_16px_44px_-26px_rgba(14,47,94,0.5)] transition-all duration-500 hover:-translate-y-2 hover:border-[#ffc53d]/60 hover:shadow-[0_34px_70px_-26px_rgba(194,65,12,0.45)]"
      style={{ animationDelay: `${Math.min(index, 8) * 60}ms` }}
    >
      <div className="relative h-52 shrink-0 overflow-hidden">
        <img
          src={post.imageUrl}
          alt={post.imageAlt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.09]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#081c38]/85 via-[#081c38]/10 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#e55c24] via-[#ffc53d] to-[#168454]" />
        <span
          className={`absolute top-3.5 left-3.5 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-extrabold tracking-wide shadow-lg backdrop-blur-md ${categoryStyle(post.category)}`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-white/90" />
          {post.category}
        </span>
        <span className="absolute right-3.5 bottom-3.5 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur-md">
          <Clock3 className="h-3 w-3" /> {post.readTime} min
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <Meta post={post} />
        <h3 className="mt-2.5 line-clamp-2 font-display text-[19px] leading-snug font-bold text-balance text-[#10294f] transition-colors group-hover:text-[#c2410c]">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {post.excerpt}
        </p>
        <span className="mt-4 inline-flex items-center gap-1.5 border-t border-dashed border-[#e3eaf5] pt-4 text-[13px] font-extrabold text-[#c2410c]">
          पूरा लेख पढ़ें
          <span className="grid h-7 w-7 place-items-center rounded-full bg-[#c2410c]/10 transition-all duration-300 group-hover:bg-[#c2410c] group-hover:text-white">
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </span>
        </span>
      </div>
    </Link>
  );
}

export function BlogExplorer({ posts }: { posts: BlogExplorerPost[] }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState("सभी");

  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    for (const post of posts) counts.set(post.category, (counts.get(post.category) ?? 0) + 1);
    return ["सभी", ...counts.keys()];
  }, [posts]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((post) => {
      const okCat = active === "सभी" || post.category === active;
      const okQ =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q);
      return okCat && okQ;
    });
  }, [posts, query, active]);

  const isDefaultView = active === "सभी" && query.trim() === "";
  const [featured, ...rest] = filtered;
  const gridPosts = isDefaultView ? rest : filtered;

  return (
    <div>
      <div className="overflow-hidden rounded-[22px] border border-white/60 bg-white/85 shadow-[0_20px_55px_-30px_rgba(14,47,94,0.65)] backdrop-blur-xl">
        <div className="flex flex-col gap-4 p-4 sm:p-5 lg:flex-row lg:items-center lg:gap-5">
          <label className="relative flex-1">
            <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="लेख खोजें — जैसे व्हाट्सएप, बूथ, वेबसाइट…"
              className="w-full rounded-xl border border-border bg-cream/60 py-2.5 pr-4 pl-10 text-sm font-semibold outline-none placeholder:font-normal focus:border-saffron focus:bg-white focus:ring-2 focus:ring-saffron/25"
            />
          </label>
          <p className="shrink-0 text-xs font-bold text-muted-foreground">{filtered.length} लेख</p>
        </div>
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              className={`shrink-0 rounded-full px-4 py-1.5 text-[13px] font-bold transition-all ${
                cat === active
                  ? "bg-maroon text-white shadow"
                  : "border border-border bg-cream/70 text-maroon hover:border-saffron hover:text-saffron"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {isDefaultView && featured && (
        <Link
          href={`/blog/${featured.slug}`}
          className="group mt-6 grid overflow-hidden rounded-[24px] border border-border/70 bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 lg:grid-cols-2"
        >
          <div className="relative h-64 overflow-hidden sm:h-80 lg:h-full lg:min-h-[340px]">
            <img
              src={featured.imageUrl}
              alt={featured.imageAlt}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
            <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-saffron px-3.5 py-1.5 text-[11px] font-extrabold tracking-wide text-white uppercase shadow-lg">
              <Sparkles className="h-3.5 w-3.5" /> ताज़ा लेख
            </span>
          </div>
          <div className="flex flex-col justify-center p-6 sm:p-9">
            <span className="inline-flex w-fit rounded-full bg-saffron/12 px-3 py-1 text-[11px] font-extrabold text-saffron">
              {featured.category}
            </span>
            <h2 className="mt-3 font-display text-2xl leading-tight font-bold text-maroon group-hover:text-saffron sm:text-[28px]">
              {featured.title}
            </h2>
            <p className="mt-3 line-clamp-3 text-[15px] leading-relaxed text-muted-foreground">
              {featured.excerpt}
            </p>
            <div className="mt-4">
              <Meta post={featured} />
            </div>
            <span className="mt-6 inline-flex w-fit items-center gap-2 rounded-xl bg-maroon px-5 py-2.5 text-sm font-extrabold text-white group-hover:bg-saffron">
              पढ़ना शुरू करें <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </Link>
      )}

      {gridPosts.length > 0 ? (
        <>
          {isDefaultView && (
            <div className="mt-10 mb-5">
              <p className="text-[11px] font-extrabold tracking-[0.2em] text-saffron uppercase">
                ज्ञान भंडार
              </p>
              <h2 className="mt-1 font-display text-2xl font-bold text-maroon">और उपयोगी लेख</h2>
            </div>
          )}
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {gridPosts.map((post, index) => (
              <PostCard key={post.slug} post={post} index={index} />
            ))}
          </div>
        </>
      ) : (
        <div className="mt-6 rounded-2xl border border-dashed border-border bg-white p-10 text-center">
          <p className="font-display text-lg font-bold text-maroon">कोई लेख नहीं मिला</p>
          <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
            खोज या श्रेणी बदलकर देखें।
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setActive("सभी");
            }}
            className="mt-5 rounded-xl bg-maroon px-5 py-2.5 text-sm font-extrabold text-white hover:bg-saffron"
          >
            सभी लेख दिखाएं
          </button>
        </div>
      )}
    </div>
  );
}
