import type { Metadata } from "next";
import { seo } from "@/lib/seo";

export { default } from "@/routes/packages";

export const metadata: Metadata = seo({
  title: "पैकेज और कीमतें",
  description:
    "BharatPahchan के किफायती डिजिटल पैकेज — मार्केटिंग मैसेज, यूटिलिटी मैसेज, वीडियो, सोशल मीडिया पोस्ट और WhatsApp CTA वेबसाइट। सभी कीमतों में GST अलग से लागू होगा।",
  canonical: "/packages",
  ogDescription: "मार्केटिंग मैसेज, वीडियो, पोस्ट और WhatsApp CTA वेबसाइट के किफायती डिजिटल पैकेज।",
});
