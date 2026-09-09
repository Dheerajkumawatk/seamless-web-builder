import { blogPosts } from "@/data/site";
import {
  deleteLocalRow,
  insertLocalRow,
  readLocalRows,
  updateLocalRow,
  writeLocalRows,
} from "@/lib/local-store.server";

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  publishDate: string;
  category: string;
  image: string;
  imageAltText: string;
  content: string;
  seoTitle: string;
  metaDescription: string;
  createdAt: string;
};

const STORE = "blog-posts";

function defaultBlogPosts(): BlogPost[] {
  return blogPosts.map((post, index) => ({
    ...post,
    id: `default-${post.slug}`,
    publishDate: post.date,
    imageAltText: post.title,
    content: post.excerpt,
    seoTitle: post.title,
    metaDescription: post.excerpt,
    createdAt: new Date(Date.UTC(2026, 7, 12 - index)).toISOString(),
  }));
}

export async function listBlogPosts(): Promise<BlogPost[]> {
  const rows = await readLocalRows<BlogPost>(STORE);
  if (rows.length > 0) {
    return rows.map(normalizeBlogPost);
  }

  const defaults = defaultBlogPosts();
  await writeLocalRows(STORE, defaults);
  return defaults;
}

export async function createBlogPost(
  input: Omit<BlogPost, "id" | "createdAt" | "slug"> & { slug?: string | undefined },
) {
  return insertLocalRow<BlogPost>(STORE, {
    ...input,
    slug: input.slug || slugify(input.title),
  });
}

export async function updateBlogPost(
  id: string,
  input: {
    title?: string | undefined;
    slug?: string | undefined;
    excerpt?: string | undefined;
    date?: string | undefined;
    publishDate?: string | undefined;
    category?: string | undefined;
    image?: string | undefined;
    imageAltText?: string | undefined;
    content?: string | undefined;
    seoTitle?: string | undefined;
    metaDescription?: string | undefined;
  },
) {
  return updateLocalRow<BlogPost>(STORE, id, {
    ...input,
    ...(input.title && !input.slug ? { slug: slugify(input.title) } : {}),
  });
}

export async function deleteBlogPost(id: string) {
  await deleteLocalRow<BlogPost>(STORE, id);
}

export function slugify(value: string) {
  const slug = value
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "");

  return slug || `blog-${Date.now()}`;
}

function normalizeBlogPost(post: BlogPost): BlogPost {
  return {
    ...post,
    publishDate: post.publishDate || post.date,
    imageAltText: post.imageAltText || post.title,
    content: post.content || post.excerpt,
    seoTitle: post.seoTitle || post.title,
    metaDescription: post.metaDescription || post.excerpt,
  };
}
