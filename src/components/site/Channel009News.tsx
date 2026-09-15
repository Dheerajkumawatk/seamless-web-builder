import Link from "next/link";
import { ArrowUpRight, Newspaper } from "lucide-react";
import { Section } from "@/components/site/Section";

type ChannelPost = {
  title: string;
  excerpt: string;
  link: string;
  date: string;
  image: string;
  category: string;
};

const CHANNEL_URL = "https://channel009.news/";
const FALLBACK_PRIMARY_POST: ChannelPost = {
  title:
    "कोटा में बागी उम्मीदवारों ने बढ़ाई पार्टियों की चिंता, निकाय चुनाव में बदल सकते हैं समीकरण",
  excerpt: "राजनीति, राज्य और देश की जरूरी खबरों के लिए Channel009.news देखें।",
  link: CHANNEL_URL,
  date: "ताजा खबर",
  image:
    "https://channel009.news/wp-content/uploads/2026/09/ChatGPT-Image-Sep-8-2026-03_28_27-PM-1.png",
  category: "State News",
};

const FALLBACK_POSTS: ChannelPost[] = [
  FALLBACK_PRIMARY_POST,
  {
    title: "अलवर में कांग्रेस-BJP के बीच कड़ा मुकाबला, निकाय चुनाव में बढ़ी सियासी सरगर्मी",
    excerpt: "राजस्थान सहित देशभर की लाइव अपडेट और स्थानीय खबरें।",
    link: CHANNEL_URL,
    date: "ताजा खबर",
    image:
      "https://channel009.news/wp-content/uploads/2026/09/ChatGPT-Image-Sep-8-2026-03_28_31-PM-1.png",
    category: "State News",
  },
  {
    title:
      "बीकानेर में स्थानीय समीकरण महत्वपूर्ण बने, निकाय चुनाव में क्षेत्रीय मुद्दों का बढ़ा प्रभाव",
    excerpt: "स्थानीय मुद्दों और चुनावी अपडेट की तेज कवरेज।",
    link: CHANNEL_URL,
    date: "ताजा खबर",
    image:
      "https://channel009.news/wp-content/uploads/2026/09/ChatGPT-Image-Sep-8-2026-03_28_34-PM-1.png",
    category: "State News",
  },
];

type WordPressPost = {
  date?: string;
  link?: string;
  title?: { rendered?: string };
  excerpt?: { rendered?: string };
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url?: string;
    }>;
    "wp:term"?: Array<Array<{ name?: string }>>;
  };
};

export async function Channel009News() {
  const posts = await getChannelPosts();
  const newsItems = posts.slice(0, 3);

  return (
    <Section className="bg-[#f5f9ff]">
      <div>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-xs font-bold tracking-[0.22em] text-[#04953f] uppercase">
              News Channel
            </div>
            <h2 className="mt-4 font-display text-3xl font-black leading-tight text-[#0e2f6f] sm:text-4xl">
              Channel009 से ताज़ा खबरें
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#4c5870]">
              राजनीति, राज्य और देश की जरूरी खबरों के लिए Channel009.news देखें।
            </p>
          </div>
          <Link
            href={CHANNEL_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-[#bcc7d8] bg-white px-5 py-3 text-sm font-bold text-[#0e2f6f] shadow-sm"
          >
            Channel009 देखें <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-7 flex overflow-hidden rounded-lg bg-[#0e2f6f] py-3 text-white shadow-sm">
          <div className="channel-news-track flex w-max shrink-0 items-center">
            {[...newsItems, ...newsItems].map((post, index) => (
              <Link
                key={`${post.link}-${index}`}
                href={post.link}
                target="_blank"
                rel="noreferrer"
                className="flex shrink-0 items-center gap-3 px-7 text-sm font-bold hover:text-emerald-200"
              >
                <span className="rounded bg-[#ff5b20] px-2 py-0.5 text-xs font-black">LIVE</span>
                <span className="max-w-[75vw] truncate sm:max-w-md">{post.title}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {newsItems.map((post) => (
            <Link
              key={`${post.title}-${post.link}`}
              href={post.link}
              target="_blank"
              rel="noreferrer"
              className="group flex min-h-[360px] flex-col overflow-hidden rounded-lg border border-[#d8e1ef] bg-white shadow-card transition hover:border-[#0e2f6f]/35"
            >
              <img
                src={post.image}
                alt={post.title}
                className="aspect-[16/9] w-full bg-[#eaf0f8] object-cover transition duration-300 group-hover:scale-[1.03]"
              />
              <div className="flex flex-1 flex-col p-5">
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-bold">
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#e8f8ef] px-3 py-1 text-[#04953f]">
                    <Newspaper className="h-3.5 w-3.5" />
                    {post.category}
                  </span>
                  <span className="text-[#7a8496]">{post.date}</span>
                </div>
                <h3 className="mt-4 text-lg font-black leading-snug text-[#0e2f6f]">
                  {post.title}
                </h3>
                <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-bold text-[#ff5b20]">
                  पूरी खबर पढ़ें <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Section>
  );
}

async function getChannelPosts(): Promise<ChannelPost[]> {
  try {
    const response = await fetch(
      "https://channel009.news/wp-json/wp/v2/posts?per_page=3&_embed=1",
      { next: { revalidate: 300 } },
    );

    if (!response.ok) {
      return FALLBACK_POSTS;
    }

    const data = (await response.json()) as WordPressPost[];
    const posts = data.map(mapPost).filter((post): post is ChannelPost => Boolean(post));

    return posts.length > 0 ? posts : FALLBACK_POSTS;
  } catch {
    return FALLBACK_POSTS;
  }
}

function mapPost(post: WordPressPost): ChannelPost | null {
  const title = cleanHtml(post.title?.rendered ?? "");
  const link = post.link;

  if (!title || !link) {
    return null;
  }

  return {
    title,
    link,
    excerpt: cleanHtml(post.excerpt?.rendered ?? ""),
    date: formatDate(post.date),
    image: post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? FALLBACK_PRIMARY_POST.image,
    category: post._embedded?.["wp:term"]?.[0]?.[0]?.name ?? "News",
  };
}

function cleanHtml(value: string) {
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&#8211;/g, "-")
    .replace(/&#8217;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

function formatDate(value?: string) {
  if (!value) {
    return "ताजा खबर";
  }

  return new Intl.DateTimeFormat("hi-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}
