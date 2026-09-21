import type { Metadata } from "next";
import { seo } from "@/lib/seo";

export { default } from "@/routes/election-results";

export const dynamic = "force-dynamic";

export const metadata: Metadata = seo({
  title: "राजस्थान निकाय चुनाव परिणाम",
  description:
    "जिला, निकाय और वार्डवार राजस्थान निकाय चुनाव परिणाम — विजेता उम्मीदवार, पार्टी और प्राप्त वोट।",
  canonical: "/election-results",
  ogDescription: "जिला, निकाय और वार्डवार विजेता उम्मीदवार।",
});
