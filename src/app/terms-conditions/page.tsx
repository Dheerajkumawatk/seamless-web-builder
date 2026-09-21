import type { Metadata } from "next";
import { seo } from "@/lib/seo";

export { default } from "@/routes/terms-conditions";

export const metadata: Metadata = seo({
  title: "Terms & Conditions",
  description:
    "BharatPahchan.com के Terms of Use — platform ke upyog ke niyam, privacy policy aur disclaimer के बारे में जानकारी।",
  canonical: "/terms-conditions",
  ogDescription: "BharatPahchan.com के Terms of Use।",
});
