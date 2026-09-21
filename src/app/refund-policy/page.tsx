import type { Metadata } from "next";
import { seo } from "@/lib/seo";

export { default } from "@/routes/refund-policy";

export const metadata: Metadata = seo({
  title: "Refund, Cancellation & Payment Policy",
  description:
    "BharatPahchan सेवाओं के लिए refund, cancellation aur payment नीति — amount wapsi, failed transactions aur disputes की जानकारी।",
  canonical: "/refund-policy",
  ogDescription: "BharatPahchan सेवाओं के लिए refund और payment नीति।",
});
