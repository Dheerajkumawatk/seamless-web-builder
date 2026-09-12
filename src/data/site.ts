import {
  BarChart3,
  ClipboardCheck,
  Globe,
  LineChart,
  Megaphone,
  Monitor,
  PenTool,
  Search,
  Share2,
  Target,
  Video,
} from "lucide-react";

export const site = {
  name: "भारत पहचान",
  tagline: "डिजिटल अभियान, सुरक्षित पहचान",
  phone: "+91 7891-131-132",
  whatsapp: "+91 7891-131-132",
  whatsappUrl: "https://wa.me/917891131132",
  email: "bharatpahchan.helpline@gmail.com",
  website: "bharatpahchan.com",
  socialLinks: {
    instagram: "https://www.instagram.com/bharatpahchan/",
    facebook: "https://www.facebook.com/profile.php?id=61593206296368",
    youtube: "https://www.youtube.com/@bharatpahchan",
  },
  address: "जयपुर, राजस्थान, भारत",
  topbar: "भारत के हर गांव, हर वोट के लिए डिजिटल अभियान",
};

export const nav = [
  { label: "होम", to: "/" },
  { label: "सेवाएं", to: "/services" },
  { label: "डेमो", to: "/#demo-form" },
  { label: "पैकेज", to: "/packages" },
  { label: "संपर्क", to: "/contact" },
] as const;

export const secondaryNav = [
  { label: "हमारे बारे में", to: "/about" },
  { label: "पोर्टफोलियो", to: "/portfolio" },
  { label: "ब्लॉग", to: "/blog" },
  { label: "Vikas Mitra", to: "/vikas-mitra" },
  { label: "District Partner Program", to: "/contact" },
] as const;

export const heroFeatures = [
  { icon: Monitor, label: "उम्मीदवार\nवेबसाइट" },
  { icon: Share2, label: "सोशल मीडिया\nमैनेजमेंट" },
  { icon: Megaphone, label: "डिजिटल\nआउटरीच" },
  { icon: Video, label: "वीडियो\nप्रोडक्शन" },
  { icon: PenTool, label: "ग्राफिक\nडिजाइन" },
  { icon: BarChart3, label: "एनालिटिक्स\nरिपोर्टिंग" },
];

export const trustCapabilities = [
  { icon: Monitor, label: "उम्मीदवार वेबसाइट" },
  { icon: Share2, label: "सोशल मीडिया" },
  { icon: Video, label: "वीडियो" },
  { icon: PenTool, label: "ग्राफिक्स" },
  { icon: Megaphone, label: "डिजिटल आउटरीच" },
  { icon: BarChart3, label: "अभियान रिपोर्टिंग" },
];

export const audiences = [
  {
    iconColor: "bg-teal-500",
    title: "सरपंच उम्मीदवार",
    desc: "ग्राम पंचायत चुनाव के लिए डिजिटल ब्रांडिंग",
    image: "village",
  },
  {
    iconColor: "bg-emerald-600",
    title: "पंचायत समिति उम्मीदवार",
    desc: "ब्लॉक स्तर पर मजबूत डिजिटल उपस्थिति",
    image: "panchayat",
  },
  {
    iconColor: "bg-blue-700",
    title: "जिला परिषद उम्मीदवार",
    desc: "जिला स्तर पर व्यापक डिजिटल अभियान",
    image: "zila",
  },
  {
    iconColor: "bg-purple-700",
    title: "अन्य स्थानीय चुनाव उम्मीदवार",
    desc: "व्यक्तिगत ब्रांडिंग और कैंपेन मैनेजमेंट",
    image: "rally",
  },
] as const;

export const services = [
  {
    slug: "candidate-website",
    icon: Monitor,
    title: "उम्मीदवार वेबसाइट",
    short: "प्रोफेशनल वेबसाइट जो आपकी पहचान और विजन को दर्शाए",
    points: [
      "मोबाइल फ्रेंडली रिस्पॉन्सिव डिजाइन",
      "उम्मीदवार परिचय और विकास योजना सेक्शन",
      "गैलरी, वीडियो और न्यूज अपडेट",
      "जन सुझाव एवं संपर्क",
    ],
  },
  {
    slug: "social-media",
    icon: Share2,
    title: "सोशल मीडिया मैनेजमेंट",
    short: "फेसबुक, इंस्टाग्राम, ट्विटर, यूट्यूब सभी प्लेटफॉर्म पर मजबूत उपस्थिति",
    points: [
      "पेज सेटअप और ऑप्टिमाइजेशन",
      "रोजाना पोस्टिंग कैलेंडर",
      "पेड ऐड कैंपेन",
      "कमेंट और मैसेज मॉडरेशन",
    ],
  },
  {
    slug: "digital-outreach",
    icon: Megaphone,
    title: "डिजिटल आउटरीच",
    short: "क्षेत्र के अनुसार डिजिटल प्रचार, संदेश और मतदाता संपर्क सहायता",
    points: [
      "क्षेत्र के अनुसार डिजिटल प्रचार योजना",
      "WhatsApp और सोशल शेयरिंग सामग्री",
      "कार्यकर्ता नेटवर्क के लिए कंटेंट सपोर्ट",
      "जन सुझाव एवं संपर्क फॉलोअप",
    ],
  },
  {
    slug: "video",
    icon: Video,
    title: "वीडियो प्रोडक्शन",
    short: "प्रचार वीडियो, डॉक्यूमेंट्री, इंटरव्यू और शॉर्ट वीडियो",
    points: [
      "कैंपेन एंथम और थीम सॉन्ग",
      "उम्मीदवार परिचय फिल्म",
      "रील्स और शॉर्ट्स",
      "इवेंट कवरेज",
    ],
  },
  {
    slug: "graphic-design",
    icon: PenTool,
    title: "ग्राफिक डिजाइन",
    short: "पोस्टर, बैनर, पम्पलेट, सोशल मीडिया क्रिएटिव और होर्डिंग",
    points: [
      "चुनाव चिन्ह आधारित ब्रांडिंग",
      "त्योहार और शुभकामना पोस्ट",
      "होर्डिंग और फ्लेक्स डिजाइन",
      "पम्पलेट और विजिटिंग कार्ड",
    ],
  },
  {
    slug: "analytics",
    icon: BarChart3,
    title: "एनालिटिक्स रिपोर्टिंग",
    short: "डेटा एनालिटिक्स और परफॉर्मेंस रिपोर्ट ताकि रणनीति और बेहतर हो",
    points: [
      "रीच और एंगेजमेंट रिपोर्ट",
      "क्षेत्रवार परफॉर्मेंस",
      "प्रतिद्वंदी विश्लेषण",
      "मासिक समीक्षा बैठक",
    ],
  },
];

export const process = [
  { num: "01", icon: Search, title: "रिसर्च और एनालिसिस" },
  { num: "02", icon: Target, title: "रणनीति और प्लानिंग" },
  { num: "03", icon: PenTool, title: "ब्रांडिंग और डिजाइन" },
  { num: "04", icon: Globe, title: "वेबसाइट और सेटअप" },
  { num: "05", icon: Megaphone, title: "कंटेंट और कैंपेन लॉन्च" },
  { num: "06", icon: LineChart, title: "मैनेजमेंट और मॉनिटरिंग" },
  { num: "07", icon: ClipboardCheck, title: "रिपोर्टिंग और सुधार" },
];

export const websiteSections = [
  "उम्मीदवार परिचय",
  "विजन/संकल्प",
  "क्षेत्र के मुद्दे",
  "कार्य/उपलब्धियाँ",
  "Gallery",
  "Videos",
  "Social links",
  "जन सुझाव एवं संपर्क",
];

export const packages = [
  {
    name: "Starter",
    desc: "डिजिटल पहचान की मजबूत शुरुआत",
    price: "₹49,999",
    period: "/6 माह",
    featured: false,
    ctaLabel: "इस पैकेज की जानकारी लें",
    theme: "green",
    features: [
      "उम्मीदवार वेबसाइट",
      "सोशल मीडिया सेटअप",
      "15 क्रिएटिव्स/माह",
      "डिजिटल आउटरीच सपोर्ट",
      "बेसिक सपोर्ट",
    ],
  },
  {
    name: "Professional",
    desc: "पूरा Managed Digital Campaign",
    price: "₹99,999",
    period: "/6 माह",
    featured: true,
    badge: "लोकप्रिय",
    ctaLabel: "इस पैकेज की जानकारी लें",
    theme: "orange",
    features: [
      "वेबसाइट (प्रीमियम)",
      "सोशल मीडिया मैनेजमेंट",
      "30 क्रिएटिव्स/माह",
      "डिजिटल आउटरीच मैनेजमेंट",
      "वीडियो (2/माह)",
      "मंथली रिपोर्ट",
    ],
  },
  {
    name: "Premium",
    desc: "Advanced Campaign Support",
    price: "₹149,999",
    period: "/6 माह",
    featured: false,
    ctaLabel: "इस पैकेज की जानकारी लें",
    theme: "navy",
    features: [
      "सब कुछ प्रोफेशनल पैकेज में शामिल",
      "वीडियो (4/माह)",
      "ड्रोन वीडियो (1/माह)",
      "डिजिटल विज्ञापन मैनेजमेंट",
      "डेडिकेटेड अकाउंट मैनेजर",
      "एडवांस एनालिटिक्स रिपोर्ट",
    ],
  },
];

export const testimonials: Array<{ quote: string; name: string; role: string }> = [];

export const portfolio = [
  { title: "सरपंच अभियान - राजस्थान", type: "वेबसाइट + सोशल मीडिया", image: "village" },
  {
    title: "पंचायत समिति अभियान - मध्य प्रदेश",
    type: "व्हाट्सएप + क्रिएटिव्स",
    image: "panchayat",
  },
  { title: "जिला परिषद अभियान - उत्तर प्रदेश", type: "फुल डिजिटल कैंपेन", image: "zila" },
  { title: "स्वतंत्र उम्मीदवार - बिहार", type: "वीडियो प्रोडक्शन", image: "rally" },
  { title: "युवा नेता ब्रांडिंग - हरियाणा", type: "पर्सनल ब्रांडिंग", image: "demo" },
  { title: "ग्राम विकास अभियान - गुजरात", type: "वेबसाइट + रिपोर्टिंग", image: "village" },
] as const;

export const blogPosts = [
  {
    slug: "panchayat-chunav-digital-strategy",
    title: "पंचायत चुनाव में डिजिटल रणनीति क्यों जरूरी है?",
    excerpt:
      "आज गांव-गांव में स्मार्टफोन है। जानिए कैसे डिजिटल अभियान आपके प्रचार को हर मतदाता तक पहुंचा सकता है।",
    date: "12 अगस्त 2026",
    category: "रणनीति",
    image: "village",
  },
  {
    slug: "whatsapp-booth-management",
    title: "व्हाट्सएप से बूथ मैनेजमेंट कैसे करें",
    excerpt: "कार्यकर्ता नेटवर्क, डिजिटल सामग्री और क्षेत्रीय आउटरीच - एक व्यवहारिक गाइड।",
    date: "02 अगस्त 2026",
    category: "व्हाट्सएप",
    image: "rally",
  },
  {
    slug: "candidate-website-must-have",
    title: "उम्मीदवार वेबसाइट में क्या-क्या होना चाहिए",
    excerpt: "परिचय से लेकर जन सुझाव एवं संपर्क तक - एक भरोसेमंद वेबसाइट के जरूरी सेक्शन।",
    date: "24 जुलाई 2026",
    category: "वेबसाइट",
    image: "panchayat",
  },
  {
    slug: "social-media-content-calendar",
    title: "चुनाव के लिए सोशल मीडिया कंटेंट कैलेंडर",
    excerpt: "90 दिन का कंटेंट प्लान जो आपकी पहुंच लगातार बढ़ाता रहे।",
    date: "10 जुलाई 2026",
    category: "सोशल मीडिया",
    image: "zila",
  },
];

export const faqs = [
  {
    q: "क्या BharatPahchan चुनाव जिताने की गारंटी देता है?",
    a: "नहीं। BharatPahchan डिजिटल सेवाएं देता है, चुनाव परिणाम या जीत की गारंटी नहीं देता।",
  },
  {
    q: "वेबसाइट कितने दिन में तैयार हो जाती है?",
    a: "समय आपकी सामग्री, फोटो और जरूरतों पर निर्भर करता है। सही समय टीम से पुष्टि करके बताया जाता है।",
  },
  {
    q: "Package कितने समय के लिए है?",
    a: "मौजूदा पैकेज 6 माह के आधार पर दिखाए गए हैं। कस्टम अवधि के लिए टीम से बात करें।",
  },
  {
    q: "क्या BharatPahchan किसी राजनीतिक दल से जुड़ा है?",
    a: "नहीं। BharatPahchan निजी डिजिटल सेवा प्लेटफॉर्म है और किसी राजनीतिक दल की आधिकारिक वेबसाइट नहीं है।",
  },
];
