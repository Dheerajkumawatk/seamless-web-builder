import type { Metadata } from "next";
import { seo } from "@/lib/seo";

export { default } from "@/routes/privacy-policy";

export const metadata: Metadata = seo({
  title: "Privacy Policy",
  description:
    "भारत पहचान (BharatPahchan.com) की प्राइवेसी पॉलिसी — personal data collection, use, storage और protection की पूरी जानकारी।",
  canonical: "/privacy-policy",
  ogDescription: "BharatPahchan.com की प्राइवेसी पॉलिसी।",
});
