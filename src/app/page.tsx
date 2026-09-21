import type { Metadata } from "next";
import { seo } from "@/lib/seo";

export { default } from "@/routes/index";

export const metadata: Metadata = seo({
  title: "पंचायत एवं स्थानीय चुनाव डिजिटल अभियान सेवाएं",
  description:
    "BharatPahchan पंचायत एवं स्थानीय चुनाव उम्मीदवारों के लिए वेबसाइट, सोशल मीडिया, वीडियो, ग्राफिक्स और डिजिटल आउटरीच सेवाएँ प्रदान करता है।",
  canonical: "/",
});
