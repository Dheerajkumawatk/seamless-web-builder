import Link from "next/link";
import { Award, BookOpenText, CheckCircle2, Clock3, Sparkles, TrendingUp } from "lucide-react";
import { CtaBand } from "@/components/site/CtaBand";
import { BlogExplorer, type BlogExplorerPost } from "@/components/site/BlogExplorer";
import { listBlogPosts } from "@/lib/blog.server";
import { fallbackImage, images } from "@/data/images";

export const dynamic = "force-dynamic";

export default async function Blog() {
  const blogPosts = await listBlogPosts();
  const totalMinutes = blogPosts.reduce((sum, post) => sum + readMinutes(post.content), 0);
  const categories = Array.from(new Set(blogPosts.map((post) => post.category)));

  const explorerPosts: BlogExplorerPost[] = blogPosts.map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    date: post.publishDate || post.date,
    category: post.category,
    imageUrl: resolveBlogImage(post.image),
    imageAlt: post.imageAltText || post.title,
    readTime: readMinutes(post.content),
  }));

  return (
    <>
      <section className="relative overflow-hidden bg-[#0a2140]">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#e55c24] via-[#ffc53d] to-[#168454]" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(1000px 460px at 8% -16%, rgba(229,92,36,.5), transparent 60%), radial-gradient(820px 420px at 96% -10%, rgba(22,132,84,.42), transparent 60%), radial-gradient(640px 520px at 50% 125%, rgba(27,76,138,.55), transparent 65%), linear-gradient(180deg, rgba(255,255,255,.08), transparent 55%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage: "radial-gradient(82% 92% at 50% 0%, black, transparent)",
            WebkitMaskImage: "radial-gradient(82% 92% at 50% 0%, black, transparent)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-28 -right-24 h-80 w-80 rounded-full bg-[#e55c24]/25 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-48 -left-28 h-80 w-80 rounded-full bg-[#168454]/25 blur-3xl"
        />
        <div className="relative mx-auto max-w-7xl px-4 pt-10 pb-40 sm:pt-14 sm:pb-48">
          <nav className="flex items-center gap-2 text-[11px] font-extrabold tracking-[0.16em] text-white/55 uppercase">
            <Link href="/" className="transition hover:text-white">
              होम
            </Link>
            <span aria-hidden="true" className="text-[#ff8a3d]">
              /
            </span>
            <span className="text-white/90">ब्लॉग</span>
          </nav>
          <div className="mt-8 grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
            <div className="max-w-3xl">
              <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[11px] font-extrabold tracking-[0.22em] text-white/90 uppercase backdrop-blur">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ff8a3d] opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#ff8a3d]" />
                </span>
                ज्ञान भंडार • हर हफ्ते नया
              </p>
              <h1 className="mt-5 font-display text-4xl leading-[1.12] font-black text-balance text-white sm:text-5xl md:text-[56px]">
                चुनाव जीतने वाला{" "}
                <span className="bg-gradient-to-r from-[#ff8a3d] to-[#ffc53d] bg-clip-text text-transparent">
                  ज्ञान
                </span>
                , आसान हिंदी में
              </h1>
              <p className="mt-4 max-w-2xl text-[15px] leading-relaxed font-medium text-white/75 sm:text-lg">
                डिजिटल रणनीति, बूथ प्रबंधन और मतदाता संपर्क पर विशेषज्ञ लेख — पंचायत से जिला परिषद
                तक हर उम्मीदवार के लिए।
              </p>
              <div className="mt-7 grid max-w-xl grid-cols-3 gap-3">
                {[
                  { icon: BookOpenText, value: `${blogPosts.length}+`, label: "विशेषज्ञ लेख" },
                  { icon: Clock3, value: `${totalMinutes} मि.`, label: "कुल अध्ययन" },
                  { icon: Award, value: `${categories.length}`, label: "विषय श्रेणियां" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-white/15 bg-white/[0.07] px-3 py-3.5 text-center backdrop-blur transition hover:bg-white/[0.12] sm:px-4"
                  >
                    <stat.icon className="mx-auto h-4 w-4 text-[#ffc53d]" />
                    <p className="mt-1.5 font-display text-lg font-black text-white sm:text-xl">
                      {stat.value}
                    </p>
                    <p className="mt-0.5 text-[10px] font-bold text-white/60 sm:text-[11px]">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-2.5">
                {categories.slice(0, 5).map((cat) => (
                  <span
                    key={cat}
                    className="rounded-full border border-white/15 bg-white/[0.07] px-3.5 py-1.5 text-xs font-bold text-white/85 backdrop-blur"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>
            <div className="relative hidden lg:block" aria-hidden="true">
              <div className="relative ml-auto max-w-[440px]">
                <div className="overflow-hidden rounded-[26px] border border-white/20 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.7)]">
                  <img
                    src={resolveBlogImage(blogPosts[0]?.image ?? "rally")}
                    alt=""
                    loading="eager"
                    className="h-[300px] w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#081c38]/70 via-transparent to-transparent" />
                </div>
                <div className="absolute -bottom-7 -left-10 flex items-center gap-3 rounded-2xl border border-white/40 bg-white/95 p-3 pr-5 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#168454]/12 text-[#168454]">
                    <TrendingUp className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-sm font-black text-[#10294f]">
                      हर हफ्ते नया लेख
                    </span>
                    <span className="block text-[11px] font-bold text-muted-foreground">
                      आसान हिंदी • काम की रणनीति
                    </span>
                  </span>
                </div>
                <div className="absolute -top-6 -right-4 flex items-center gap-2 rounded-full border border-white/30 bg-[#0e2f5e]/85 py-2 pr-5 pl-2 shadow-xl backdrop-blur">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-[#e55c24] to-[#ffc53d] text-white">
                    <Sparkles className="h-4 w-4" />
                  </span>
                  <span className="text-xs font-extrabold text-white">विशेषज्ञ मार्गदर्शन</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-6 overflow-hidden">
          <svg viewBox="0 0 1440 24" preserveAspectRatio="none" className="h-full w-full">
            <path d="M0 24h1440V8C1200 22 960 22 720 12 480 2 240 4 0 14v10z" fill="#f4f8ff" />
          </svg>
        </div>
      </section>

      <section className="bg-[#f4f8ff] py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                icon: BookOpenText,
                value: `${blogPosts.length}+ लेख`,
                label: "हर हफ्ते नया कंटेंट",
                tint: "bg-[#123a72]/10 text-[#123a72]",
              },
              {
                icon: Clock3,
                value: `${totalMinutes} मिनट`,
                label: "कुल पढ़ने का समय",
                tint: "bg-[#e55c24]/10 text-[#e55c24]",
              },
              {
                icon: Award,
                value: "आसान हिंदी",
                label: "बिना कठिन शब्दों के",
                tint: "bg-[#168454]/10 text-[#168454]",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-4 rounded-2xl border border-[#e2e9f4] bg-white p-5 shadow-[0_14px_40px_-24px_rgba(14,47,94,0.5)]"
              >
                <span
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${stat.tint}`}
                >
                  <stat.icon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-display text-xl font-black text-[#10294f]">
                    {stat.value}
                  </span>
                  <span className="block text-xs font-bold text-muted-foreground">
                    {stat.label}
                  </span>
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <BlogExplorer posts={explorerPosts} />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

function readMinutes(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(2, Math.round(words / 180));
}

function resolveBlogImage(image: string) {
  if (image.startsWith("data:") || image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }

  return images[image] ?? fallbackImage;
}
