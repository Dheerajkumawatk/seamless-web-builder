import type { Metadata } from "next";
import { seo } from "@/lib/seo";

export { default } from "@/routes/portfolio";

export const metadata: Metadata = seo({
  title: "हमारा पोर्टफोलियो",
  description: "अलग-अलग राज्यों में किए गए सफल डिजिटल चुनाव अभियानों की झलक।",
  canonical: "/portfolio",
});
