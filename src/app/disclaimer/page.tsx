import type { Metadata } from "next";
import { seo } from "@/lib/seo";

export { default } from "@/routes/disclaimer";

export const metadata: Metadata = seo({
  title: "Disclaimer",
  description:
    "BharatPahchan एक निजी डिजिटल सेवा प्लेटफॉर्म है और किसी सरकार, सरकारी विभाग या राजनीतिक दल से संबद्ध नहीं है।",
  canonical: "/disclaimer",
  ogDescription: "BharatPahchan के बारे में अस्वीकरण।",
});
