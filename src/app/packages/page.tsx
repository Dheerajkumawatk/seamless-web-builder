import type { Metadata } from "next";
import { seo } from "@/lib/seo";

export { default } from "@/routes/packages";

export const metadata: Metadata = seo({
  title: "पैकेज और कीमतें",
  description:
    "चुनाव अभियान और बिज़नेस के लिए BharatPahchan के पैकेज — वेबसाइट, सोशल मीडिया, वीडियो, ग्राफिक्स और डिजिटल सेवाएं। सभी कीमतों में GST अलग से लागू होगा।",
  canonical: "/packages",
  ogDescription: "वेबसाइट, सोशल मीडिया, वीडियो, ग्राफिक्स और डिजिटल सेवाओं के पैकेज।",
});
