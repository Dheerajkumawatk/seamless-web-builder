import type { MetadataRoute } from "next";
import { absoluteUrl, getBaseUrl } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api/", "/demo/", "/vikas-mitra/id-card/"],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: getBaseUrl(),
  };
}