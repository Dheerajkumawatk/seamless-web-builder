import type { Metadata } from "next";
import { seo } from "@/lib/seo";

export { default } from "@/routes/about";

export const metadata: Metadata = seo({
  title: "हमारे बारे में",
  description:
    "भारत पहचान — ग्रामीण और स्थानीय चुनाव अभियानों के लिए समर्पित डिजिटल टीम। हमारा मिशन, विज़न और मूल्य जानें।",
  canonical: "/about",
});
