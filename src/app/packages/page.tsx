import type { Metadata } from "next";
import { seo } from "@/lib/seo";

export { default } from "@/routes/packages";

export const metadata: Metadata = seo({
  title: "पैकेज और कीमतें",
  description:
    "चुनाव प्रचार, क्षेत्र की डिजिटल पहचान और बिजनेस के लिए BharatPahchan के 10 प्लान की तुलना करें। हर पैकेज की पूरी जानकारी देखें और Razorpay से भुगतान करें। लागू GST अतिरिक्त है।",
  canonical: "/packages",
  ogDescription: "चुनाव, क्षेत्र और बिजनेस के लिए 10 डिजिटल प्लान। पूरी जानकारी और ऑनलाइन भुगतान।",
});
