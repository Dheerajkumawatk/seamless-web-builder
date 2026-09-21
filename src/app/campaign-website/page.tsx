import type { Metadata } from "next";
import { seo } from "@/lib/seo";

export { default } from "@/routes/campaign-website";

export const metadata: Metadata = seo({
  title: "अभियान वेबसाइट डेमो",
  description:
    "मोबाइल-फर्स्ट, तेज़ और हिंदी में बनी उम्मीदवार वेबसाइट — आपकी पहचान, विज़न और काम एक प्रोफेशनल वेबसाइट पर।",
  canonical: "/campaign-website",
  ogDescription: "अपनी पहचान, अपना विज़न और अपना काम — सब कुछ एक प्रोफेशनल वेबसाइट पर।",
});
