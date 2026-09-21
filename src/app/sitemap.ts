import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site-url";

// Public crawlable pages. /demo/* pages are noindex (not included),
// /admin and /api are disallowed in robots.ts (not included).
const routes: Array<{
  path: string;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
  priority: number;
}> = [
  { path: "/", changeFrequency: "daily", priority: 1 },
  { path: "/services", changeFrequency: "weekly", priority: 0.9 },
  { path: "/campaign-website", changeFrequency: "weekly", priority: 0.8 },
  { path: "/packages", changeFrequency: "weekly", priority: 0.9 },
  { path: "/portfolio", changeFrequency: "weekly", priority: 0.8 },
  { path: "/election-results", changeFrequency: "daily", priority: 0.8 },
  { path: "/vikas-mitra", changeFrequency: "weekly", priority: 0.8 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.7 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.7 },
  { path: "/about", changeFrequency: "monthly", priority: 0.6 },
  { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/refund-policy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms-conditions", changeFrequency: "yearly", priority: 0.3 },
  { path: "/disclaimer", changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}