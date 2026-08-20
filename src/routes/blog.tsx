import { CalendarDays } from "lucide-react";
import { PageHero, Section } from "@/components/site/Section";
import { CtaBand } from "@/components/site/CtaBand";
import { blogPosts } from "@/data/site";
import { images } from "@/data/images";

export default function Blog() {
  return (
    <>
      <PageHero title="ब्लॉग" sub="चुनाव अभियान, डिजिटल रणनीति और मतदाता संपर्क पर उपयोगी लेख।" />

      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <article key={post.slug} className="card-warm flex flex-col overflow-hidden">
              <img
                src={images[post.image]}
                width={800}
                height={600}
                loading="lazy"
                alt={post.title}
                className="h-44 w-full object-cover"
              />
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                  <span className="rounded-sm bg-saffron/12 px-2 py-1 font-semibold text-saffron">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <CalendarDays className="h-3 w-3" /> {post.date}
                  </span>
                </div>
                <h2 className="mt-3 text-base leading-snug text-maroon">{post.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
