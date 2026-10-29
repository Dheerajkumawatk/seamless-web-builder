import { packages } from "@/data/site";

export const packageCategories = [
  {
    id: "affordable",
    slug: "election-related-plans",
    overview: "Explore packages for your election campaign.",
    number: "01",
    title: "Election Related Plans",
    subtitle: "अपने अभियान की शुरुआत के लिए सही पैकेज चुनें।",
    note: "सभी कीमतों पर लागू GST अतिरिक्त है। मैसेजिंग और वेबसाइट का काम ऑर्डर कन्फर्म होने के बाद शुरू होगा।",
  },
  {
    id: "election",
    slug: "territory-digital-ecosystem-plans",
    overview: "Explore digital solutions for your territory.",
    number: "02",
    title: "Territory Digital Ecosystem Plans",
    subtitle: "अपने पूरे क्षेत्र में मजबूत डिजिटल पहचान बनाएं।",
    note: "ये पैकेज 6 माह के लिए हैं। लागू GST अतिरिक्त है। विज्ञापन बजट, डोमेन, होस्टिंग और अन्य थर्ड-पार्टी खर्च के लिए टीम से पुष्टि करें।",
  },
  {
    id: "business",
    slug: "business-plans",
    overview: "Explore packages for your business needs.",
    number: "03",
    title: "Business Plans",
    subtitle: "अपने बिजनेस के अगले कदम के लिए सही सपोर्ट चुनें।",
    note: "6 माह की पूरी पैकेज फीस। लागू GST अतिरिक्त है। विज्ञापन, डोमेन, होस्टिंग और थर्ड-पार्टी सब्सक्रिप्शन अलग से चार्ज होंगे।",
  },
] as const;

const packageSlugs: Record<string, string> = {
  "स्टार्टर पैकेज": "election-starter",
  "ग्रोथ पैकेज": "election-growth",
  "कैंपेन प्लस": "campaign-plus",
  "डिजिटल प्रेज़ेंस": "digital-presence",
  Starter: "territory-starter",
  Professional: "territory-professional",
  Premium: "territory-premium",
  "बिजनेस फाउंडेशन": "business-foundation",
  "बिजनेस ग्रोथ": "business-growth",
  "बिजनेस एक्सीलेंस": "business-excellence",
};

export const packageCatalog = packages.map((plan) => {
  const slug = packageSlugs[plan.name];
  if (!slug) throw new Error(`Missing package URL for ${plan.name}`);
  return { ...plan, slug };
});

export function formatPackagePrice(amountInr: number) {
  return `₹${new Intl.NumberFormat("en-IN").format(amountInr)}`;
}
