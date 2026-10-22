export type InstagramPost = {
  id: string;
  caption: string;
  mediaUrl: string;
  permalink: string;
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM" | string;
  thumbnailUrl?: string;
  timestamp?: string;
  likeCount?: number;
  commentsCount?: number;
  username?: string;
};

type InstagramApiMedia = {
  id?: string;
  caption?: string;
  media_url?: string;
  permalink?: string;
  media_type?: string;
  thumbnail_url?: string;
  timestamp?: string;
  like_count?: number;
  comments_count?: number;
  username?: string;
};

type InstagramApiResponse = {
  data?: InstagramApiMedia[];
  error?: {
    message?: string;
  };
};

export async function listInstagramPosts(limit = 12): Promise<InstagramPost[]> {
  const userId = process.env["INSTAGRAM_USER_ID"];
  const accessToken = process.env["INSTAGRAM_ACCESS_TOKEN"];

  if (!userId || !accessToken) {
    return [];
  }

  const url = new URL(`https://graph.instagram.com/${userId}/media`);
  url.searchParams.set(
    "fields",
    "id,caption,media_url,permalink,media_type,thumbnail_url,timestamp,like_count,comments_count,username",
  );
  url.searchParams.set("limit", String(Math.min(Math.max(limit, 1), 25)));
  url.searchParams.set("access_token", accessToken);

  try {
    const response = await fetch(url, {
      next: { revalidate: 60 * 30 },
    });

    if (!response.ok) {
      console.error("Instagram feed request failed", response.status, await response.text());
      return [];
    }

    const payload = (await response.json()) as InstagramApiResponse;

    if (payload.error) {
      console.error("Instagram feed error", payload.error.message);
      return [];
    }

    return (payload.data ?? [])
      .filter((post) => post.id && post.permalink && (post.media_url || post.thumbnail_url))
      .map((post) => {
        const mediaUrl = post.media_url ?? "";
        const thumbnailUrl = post.thumbnail_url;

        return {
          id: post.id!,
          caption: post.caption ?? "",
          mediaUrl,
          permalink: post.permalink!,
          mediaType: post.media_type ?? "IMAGE",
          ...(thumbnailUrl ? { thumbnailUrl } : {}),
          ...(post.timestamp ? { timestamp: post.timestamp } : {}),
          ...(typeof post.like_count === "number" ? { likeCount: post.like_count } : {}),
          ...(typeof post.comments_count === "number"
            ? { commentsCount: post.comments_count }
            : {}),
          ...(post.username ? { username: post.username } : {}),
        } satisfies InstagramPost;
      });
  } catch (error) {
    console.error("Instagram feed unavailable", error);
    return [];
  }
}
