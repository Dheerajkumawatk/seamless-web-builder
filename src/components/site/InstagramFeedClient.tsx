"use client";

import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Heart,
  Instagram,
  Layers,
  MessageCircle,
  Play,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { site } from "@/data/site";

export type FeedPost = {
  id: string;
  type: "reel" | "photo" | "carousel";
  mediaType?: "VIDEO" | "IMAGE";
  image: string;
  videoUrl?: string;
  caption: string;
  time: string;
  label: string;
  link: string;
  likes?: string;
  comments?: number;
  username?: string;
};

type TabKey = "all" | "reel" | "photo";

const tabs: Array<{ key: TabKey; label: string }> = [
  { key: "all", label: "सभी" },
  { key: "reel", label: "रील्स" },
  { key: "photo", label: "फ़ोटो" },
];

export function InstagramFeedClient({
  posts,
  profileUrl,
}: {
  posts: FeedPost[];
  profileUrl: string;
}) {
  const [activeTab, setActiveTab] = useState<TabKey>("all");
  const [selectedPost, setSelectedPost] = useState<FeedPost | null>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const handle = posts[0]?.username ? `@${posts[0].username}` : "@bharatpahchan";

  const visiblePosts = useMemo(() => {
    if (activeTab === "all") return posts;
    if (activeTab === "reel") return posts.filter((post) => post.type === "reel");
    return posts.filter((post) => post.type === "photo" || post.type === "carousel");
  }, [activeTab, posts]);

  useEffect(() => {
    if (!selectedPost) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedPost(null);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedPost]);

  const scrollByCard = (direction: "prev" | "next") => {
    const node = scrollerRef.current;
    if (!node) return;
    const amount = Math.min(node.clientWidth * 0.85, 360);
    node.scrollBy({
      left: direction === "next" ? amount : -amount,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="instagram-section"
      className="relative overflow-hidden border-y border-[#dbe8dd] bg-gradient-to-b from-[#f4f8f6] via-white to-[#f7faf7] py-14 sm:py-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          background:
            "radial-gradient(560px 240px at 8% 0%, rgba(21,154,86,0.14), transparent 55%), radial-gradient(480px 220px at 92% 8%, rgba(14,47,94,0.12), transparent 50%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 text-xs font-black tracking-[0.2em] text-[#159a56] uppercase">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#159a56]" />
              Instagram Live Feed
            </p>
            <h2 className="mt-3 font-display text-3xl font-black text-[#0e2f5e] sm:text-4xl">
              हमारे Instagram से ताज़ा अपडेट
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed font-semibold text-[#4b5364] sm:text-base">
              रील्स, फ़ोटो और अभियान अपडेट सीधे {handle} से — लाइव Instagram डेटा।
            </p>
          </div>

          <a
            href={profileUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 self-start rounded-lg bg-gradient-to-r from-[#f09433] via-[#dc2743] to-[#bc1888] px-5 py-3.5 text-sm font-black text-white shadow-sm transition hover:opacity-95 lg:self-auto"
          >
            <Instagram className="h-4 w-4" />
            Follow {handle}
          </a>
        </div>

        {posts.length > 0 ? (
          <>
            <div className="mt-8 flex flex-col gap-4 border-b border-[#d5e3d8] pb-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex gap-2 overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveTab(tab.key)}
                    className={[
                      "rounded-lg px-4 py-2 text-sm font-extrabold transition",
                      activeTab === tab.key
                        ? "bg-[#0e2f5e] text-white"
                        : "bg-white text-[#0e2f5e] ring-1 ring-[#d5e0ec] hover:bg-[#eef5f0]",
                    ].join(" ")}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <span className="mr-1 text-xs font-bold text-[#6b7280]">
                  {visiblePosts.length} पोस्ट
                </span>
                <button
                  type="button"
                  aria-label="पिछली पोस्ट"
                  onClick={() => scrollByCard("prev")}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d5e0ec] bg-white text-[#0e2f5e] transition hover:bg-[#eef5f0]"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  aria-label="अगली पोस्ट"
                  onClick={() => scrollByCard("next")}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d5e0ec] bg-white text-[#0e2f5e] transition hover:bg-[#eef5f0]"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div
              ref={scrollerRef}
              className="mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-5 [&::-webkit-scrollbar]:hidden"
            >
              {visiblePosts.length ? (
                visiblePosts.map((post) => (
                  <FeedCard
                    key={post.id}
                    post={post}
                    handle={handle}
                    onOpen={() => setSelectedPost(post)}
                  />
                ))
              ) : (
                <div className="w-full rounded-xl border border-dashed border-[#c9d8cc] bg-white px-6 py-12 text-center text-sm font-semibold text-[#6b7280]">
                  इस कैटेगरी में अभी कोई पोस्ट नहीं है।
                </div>
              )}
            </div>
          </>
        ) : (
          <EmptyFeed profileUrl={profileUrl} handle={handle} />
        )}

        <div className="mt-10 flex flex-col items-start justify-between gap-5 rounded-xl border border-[#dbe8dd] bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:p-7">
          <div>
            <h3 className="font-display text-xl font-black text-[#0e2f5e]">
              WhatsApp पर डेली रील्स पाएं
            </h3>
            <p className="mt-1 text-sm font-semibold text-[#4b5364]">
              अभियान अपडेट, रील्स और वीडियो सीधे अपने फ़ोन पर।
            </p>
          </div>
          <a
            href={`${site.whatsappUrl}?text=${encodeURIComponent("नमस्ते जी, मुझे daily campaign reels और updates भेजिए।")}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#159a56] px-5 py-3 text-sm font-black text-white transition hover:bg-[#128a4c]"
          >
            WhatsApp पर जुड़ें
          </a>
        </div>
      </div>

      {selectedPost && (
        <PostModal post={selectedPost} handle={handle} onClose={() => setSelectedPost(null)} />
      )}
    </section>
  );
}

function EmptyFeed({ profileUrl, handle }: { profileUrl: string; handle: string }) {
  return (
    <div className="mt-8 rounded-xl border border-dashed border-[#c9d8cc] bg-white px-6 py-14 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#f09433] via-[#dc2743] to-[#bc1888] text-white">
        <Instagram className="h-7 w-7" />
      </div>
      <h3 className="mt-5 font-display text-2xl font-black text-[#0e2f5e]">
        लेटेस्ट पोस्ट Instagram पर देखें
      </h3>
      <p className="mx-auto mt-2 max-w-md text-sm font-semibold text-[#4b5364]">
        अभियान रील्स, फ़ोटो और अपडेट सीधे {handle} पर उपलब्ध हैं।
      </p>
      <a
        href={profileUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#0e2f5e] px-5 py-3 text-sm font-black text-white"
      >
        Instagram खोलें <ExternalLink className="h-4 w-4" />
      </a>
    </div>
  );
}

function FeedCard({
  post,
  handle,
  onOpen,
}: {
  post: FeedPost;
  handle: string;
  onOpen: () => void;
}) {
  const isReel = post.type === "reel" || post.mediaType === "VIDEO";

  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative aspect-[4/5] w-[min(78vw,280px)] shrink-0 snap-start overflow-hidden rounded-xl bg-[#0e2f5e] text-left shadow-sm ring-1 ring-[#d5e0ec] transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:w-[260px]"
    >
      <img
        src={post.image}
        alt={post.caption}
        loading="lazy"
        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/25" />

      <div className="absolute inset-x-0 top-0 flex items-center justify-between p-3">
        <span className="inline-flex items-center gap-1.5 rounded-md bg-black/45 px-2 py-1 text-[11px] font-bold text-white backdrop-blur-sm">
          {isReel ? <Play className="h-3 w-3 fill-current" /> : null}
          {post.type === "carousel" ? <Layers className="h-3 w-3" /> : null}
          {post.label}
        </span>
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm">
          <Instagram className="h-3.5 w-3.5" />
        </span>
      </div>

      {isReel && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/40 bg-white/20 text-white backdrop-blur-md transition group-hover:scale-110">
            <Play className="ml-0.5 h-5 w-5 fill-current" />
          </span>
        </div>
      )}

      <div className="absolute inset-x-0 bottom-0 p-3.5 text-white">
        <p className="text-[11px] font-semibold text-white/70">
          {handle}
          {post.time ? ` · ${post.time}` : ""}
        </p>
        <p className="mt-1 line-clamp-2 text-xs font-semibold leading-relaxed">{post.caption}</p>
        {(post.likes || typeof post.comments === "number") && (
          <div className="mt-2 flex items-center gap-3 text-[11px] text-white/75">
            {post.likes ? (
              <span className="inline-flex items-center gap-1">
                <Heart className="h-3 w-3" /> {post.likes}
              </span>
            ) : null}
            {typeof post.comments === "number" ? (
              <span className="inline-flex items-center gap-1">
                <MessageCircle className="h-3 w-3" /> {post.comments}
              </span>
            ) : null}
          </div>
        )}
      </div>
    </button>
  );
}

function PostModal({
  post,
  handle,
  onClose,
}: {
  post: FeedPost;
  handle: string;
  onClose: () => void;
}) {
  const canPlayInline = Boolean(post.videoUrl);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 backdrop-blur-sm sm:p-6"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Instagram पोस्ट"
        className="relative flex max-h-[92vh] w-full max-w-4xl overflow-hidden rounded-2xl bg-[#0b1220] text-white shadow-2xl md:flex-row"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="बंद करें"
          className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-white hover:text-black"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative min-h-[320px] w-full bg-black md:min-h-[560px] md:w-[58%]">
          {canPlayInline ? (
            <video
              src={post.videoUrl}
              poster={post.image}
              controls
              autoPlay
              playsInline
              className="h-full w-full object-contain"
            />
          ) : (
            <div className="relative h-full min-h-[320px] md:min-h-[560px]">
              <img src={post.image} alt={post.caption} className="h-full w-full object-contain" />
              {post.type === "reel" && (
                <a
                  href={post.link}
                  target="_blank"
                  rel="noreferrer"
                  className="absolute inset-0 flex items-center justify-center bg-black/35"
                >
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2.5 text-sm font-black text-[#0e2f5e]">
                    <Play className="h-4 w-4 fill-current" />
                    Instagram पर Reel चलाएं
                  </span>
                </a>
              )}
            </div>
          )}
        </div>

        <div className="flex w-full flex-col justify-between gap-5 overflow-y-auto p-5 sm:p-6 md:w-[42%]">
          <div>
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-[#f09433] via-[#dc2743] to-[#bc1888] p-[2px]">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-[#0b1220] text-xs font-black">
                  BP
                </div>
              </div>
              <div>
                <p className="text-sm font-black">{handle.replace("@", "")}</p>
                <p className="text-[11px] font-semibold text-white/55">
                  {post.label}
                  {post.time ? ` · ${post.time}` : ""}
                </p>
              </div>
            </div>

            <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-white/85">
              {post.caption}
            </p>

            {(post.likes || typeof post.comments === "number") && (
              <div className="mt-4 flex items-center gap-4 text-xs font-bold text-white/70">
                {post.likes ? (
                  <span className="inline-flex items-center gap-1.5">
                    <Heart className="h-3.5 w-3.5" /> {post.likes} likes
                  </span>
                ) : null}
                {typeof post.comments === "number" ? (
                  <span className="inline-flex items-center gap-1.5">
                    <MessageCircle className="h-3.5 w-3.5" /> {post.comments} comments
                  </span>
                ) : null}
              </div>
            )}
          </div>

          <a
            href={post.link}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#f09433] via-[#dc2743] to-[#bc1888] px-4 py-3 text-sm font-black text-white transition hover:opacity-95"
          >
            <Instagram className="h-4 w-4" />
            Instagram पर पूरा पोस्ट देखें
          </a>
        </div>
      </div>
    </div>
  );
}
