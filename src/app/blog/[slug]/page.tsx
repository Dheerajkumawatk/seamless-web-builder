import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock3 } from "lucide-react";
import { BlogShare, ReadingProgress } from "@/components/site/BlogShare";
import { CtaBand } from "@/components/site/CtaBand";
import { fallbackImage, images } from "@/data/images";
import { getBlogPostBySlug, listBlogPosts } from "@/lib/blog.server";
import { absoluteUrl } from "@/lib/site-url";

type BlogDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "ब्लॉग लेख नहीं मिला",
      robots: { index: false, follow: false },
    };
  }

  const canonical = `/blog/${post.slug}`;
  const title = post.seoTitle || post.title;
  const description = post.metaDescription || post.excerpt;
  const image = resolveBlogImage(post.image);

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "article",
      publishedTime: post.createdAt,
      images: [
        {
          url: image.startsWith("http") ? image : absoluteUrl(image),
          width: 1200,
          height: 630,
          alt: post.imageAltText || post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.startsWith("http") ? image : absoluteUrl(image)],
    },
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = await listBlogPosts();
  const relatedPosts = allPosts
    .filter((item) => item.slug !== post.slug)
    .filter((item) => item.category === post.category)
    .slice(0, 3);
  const fallbackRelated = allPosts.filter((item) => item.slug !== post.slug).slice(0, 3);
  const recommendations = relatedPosts.length > 0 ? relatedPosts : fallbackRelated;
  const readTime = readMinutes(post.content);
  const image = resolveBlogImage(post.image);
  const path = `/blog/${post.slug}`;

  return (
    <>
      <ReadingProgress />
      <article className="bg-[#f4f8ff]">
        <section className="relative overflow-hidden bg-[#0a2140] text-white">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#e55c24] via-[#ffc53d] to-[#168454]" />
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:py-14 lg:grid-cols-[minmax(0,0.92fr)_minmax(320px,0.58fr)] lg:items-center">
            <div>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-extrabold text-white/75 transition hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
                ब्लॉग पर वापस जाएं
              </Link>
              <p className="mt-7 inline-flex rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-extrabold text-[#ffc53d]">
                {post.category}
              </p>
              <h1 className="mt-4 font-display text-4xl leading-tight font-black text-balance sm:text-5xl">
                {post.title}
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-relaxed font-medium text-white/75 sm:text-lg">
                {post.excerpt}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-bold text-white/70">
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="h-4 w-4" />
                  {post.publishDate || post.date}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock3 className="h-4 w-4" />
                  {readTime} मिनट में पढ़ें
                </span>
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl border border-white/15 shadow-[0_34px_80px_-32px_rgba(0,0,0,0.8)]">
              <img
                src={image}
                alt={post.imageAltText || post.title}
                className="h-72 w-full object-cover sm:h-80 lg:h-[360px]"
              />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-4 py-10 sm:py-14">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-[#dbe5ee] pb-5">
            <p className="text-sm font-bold text-muted-foreground">भारत पहचान ज्ञान भंडार</p>
            <BlogShare title={post.title} path={path} />
          </div>

          <div className="prose prose-lg max-w-none prose-headings:font-display prose-p:text-[#334155] prose-p:leading-8">
            {post.content
              .split(/\n+/)
              .map((paragraph) => paragraph.trim())
              .filter(Boolean)
              .map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
          </div>

          {recommendations.length > 0 && (
            <div className="mt-12 border-t border-[#dbe5ee] pt-8">
              <h2 className="font-display text-2xl font-black text-[#10294f]">और उपयोगी लेख</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                {recommendations.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/blog/${item.slug}`}
                    className="rounded-lg border border-[#dbe5ee] bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:border-[#e55c24]/50"
                  >
                    <span className="text-xs font-extrabold text-[#c2410c]">{item.category}</span>
                    <h3 className="mt-2 line-clamp-2 font-display text-base font-black text-[#10294f]">
                      {item.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                      {item.excerpt}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>
      </article>
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
