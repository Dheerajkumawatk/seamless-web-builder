import type { Metadata } from "next";
import { seo } from "@/lib/seo";

export { default } from "@/routes/contact";

export const metadata: Metadata = seo({
  title: "संपर्क करें",
  description:
    "भारत पहचान से संपर्क करें — वेबसाइट, पैकेज और डिजिटल अभियान सेवाओं के लिए। सपोर्ट फोन, व्हाट्सएप और ईमेल।",
  canonical: "/contact",
});
