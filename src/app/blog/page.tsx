import type { Metadata } from "next";
import { seo } from "@/lib/seo";

export const dynamic = "force-dynamic";

export { default } from "@/routes/blog";

export const metadata: Metadata = seo({
  title: "ब्लॉग",
  description: "चुनाव अभियान, डिजिटल रणनीति और मतदाता संपर्क पर उपयोगी लेख।",
  canonical: "/blog",
});
