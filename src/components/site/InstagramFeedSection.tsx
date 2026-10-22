import { site } from "@/data/site";
import { listInstagramPosts } from "@/lib/instagram.server";
import { InstagramFeedClient, type FeedPost } from "./InstagramFeedClient";

function formatRelativeTime(timestamp?: string): string {
  if (!timestamp) return "";

  const postedAt = new Date(timestamp).getTime();
  if (Number.isNaN(postedAt)) return "";

  const diffMs = Date.now() - postedAt;
  const minutes = Math.floor(diffMs / 60_000);
  if (minutes < 1) return "अभी";
  if (minutes < 60) return `${minutes} मिनट पहले`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} घंटे पहले`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} दिन पहले`;

  const weeks = Math.floor(days / 7);
  if (weeks < 5) return `${weeks} सप्ताह पहले`;

  return new Intl.DateTimeFormat("hi-IN", {
    day: "numeric",
    month: "short",
  }).format(new Date(postedAt));
}

function formatCompactNumber(value: number): string {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  }
  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  }
  return `${value}`;
}

function mapMediaType(mediaType: string): FeedPost["type"] {
  if (mediaType === "VIDEO") return "reel";
  if (mediaType === "CAROUSEL_ALBUM") return "carousel";
  return "photo";
}

function mediaLabel(type: FeedPost["type"]): string {
  if (type === "reel") return "Reel";
  if (type === "carousel") return "Album";
  return "Photo";
}

export async function InstagramFeedSection() {
  const livePosts = await listInstagramPosts(12);

  const posts: FeedPost[] = livePosts.map((post) => {
    const type = mapMediaType(post.mediaType);
    const isVideo = post.mediaType === "VIDEO";
    const previewImage = isVideo
      ? post.thumbnailUrl || post.mediaUrl
      : post.mediaUrl || post.thumbnailUrl || "";

    return {
      id: post.id,
      type,
      mediaType: isVideo ? "VIDEO" : "IMAGE",
      image: previewImage,
      ...(isVideo && post.mediaUrl ? { videoUrl: post.mediaUrl } : {}),
      caption: post.caption.trim() || "Instagram अपडेट",
      time: formatRelativeTime(post.timestamp),
      label: mediaLabel(type),
      link: post.permalink || site.socialLinks.instagram,
      ...(typeof post.likeCount === "number"
        ? { likes: formatCompactNumber(post.likeCount) }
        : {}),
      ...(typeof post.commentsCount === "number" ? { comments: post.commentsCount } : {}),
      username: post.username || "bharatpahchan",
    };
  });

  return <InstagramFeedClient posts={posts} profileUrl={site.socialLinks.instagram} />;
}
