import type { Metadata } from "next";
import { seo } from "@/lib/seo";

export { default } from "@/routes/services";

export const metadata: Metadata = seo({
  title: "हमारी सेवाएँ",
  description:
    "चुनाव अभियान की हर ज़रूरत के लिए संपूर्ण डिजिटल समाधान — उम्मीदवार वेबसाइट, सोशल मीडिया, वीडियो प्रोडक्शन, ग्राफिक डिज़ाइन और डिजिटल आउटरीच।",
  canonical: "/services",
  ogDescription: "उम्मीदवार वेबसाइट, सोशल मीडिया, वीडियो, ग्राफिक्स और डिजिटल आउटरीच सेवाएँ।",
});
