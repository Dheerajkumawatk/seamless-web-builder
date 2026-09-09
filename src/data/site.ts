import {
  BarChart3,
  ClipboardCheck,
  Globe,
  Handshake,
  LineChart,
  Megaphone,
  MessageCircle,
  Monitor,
  PenTool,
  Search,
  Share2,
  Target,
  Trophy,
  UserRound,
  Video,
} from "lucide-react";

export const site = {
  name: "भारत पहचान",
  tagline: "डिजिटल अभियान, सुरक्षित पहचान",
  phone: "+91 7891-131-132",
  whatsapp: "+91 7891-131-132",
  whatsappUrl: "https://wa.me/917891131132",
  email: "bharatpahchan.helpline@gmail.com",
  website: "www.bharatpahchan.com",
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
  { label: "हमारे बारे में", to: "/about" },
  { label: "सेवाएं", to: "/services" },
  { label: "अभियान वेबसाइट", to: "/campaign-website" },
  { label: "पोर्टफोलियो", to: "/portfolio" },
  { label: "पैकेज", to: "/packages" },
  { label: "ब्लॉग", to: "/blog" },
  { label: "संपर्क करें", to: "/contact" },
] as const;

export const heroFeatures = [
  { icon: Monitor, label: "उम्मीदवार\nवेबसाइट" },
  { icon: Share2, label: "सोशल मीडिया\nमैनेजमेंट" },
  { icon: MessageCircle, label: "व्हाट्सएप\nअभियान" },
  { icon: Megaphone, label: "वीडियो\nप्रोडक्शन" },
  { icon: PenTool, label: "ग्राफिक\nडिजाइन" },
  { icon: BarChart3, label: "एनालिटिक्स\nरिपोर्टिंग" },
];

export const stats = [
  { icon: Trophy, value: "500+", label: "अभियान क्रिएटिव्स" },
  { icon: Globe, value: "50+", label: "वेबसाइट तैयार" },
  { icon: UserRound, value: "20+", label: "राज्यों में सेवा" },
  { icon: Handshake, value: "100+", label: "उम्मीदवारों का भरोसा" },
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
    title: "स्वतंत्र उम्मीदवार",
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
      "शिकायत और सुझाव पोर्टल",
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
    slug: "whatsapp",
    icon: MessageCircle,
    title: "व्हाट्सएप अभियान",
    short: "बूथ प्रबंधन, ब्रॉडकास्ट, वोटर नेटवर्क और मतदाता संपर्क",
    points: [
      "बूथ-वार ग्रुप स्ट्रक्चर",
      "ब्रॉडकास्ट मैसेज और क्रिएटिव",
      "कार्यकर्ता नेटवर्क मैनेजमेंट",
      "फीडबैक कलेक्शन",
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
  "गांव का इतिहास और जानकारी",
  "विकास योजना",
  "गैलरी और वीडियो",
  "इवेंट और न्यूज",
  "शिकायत पोर्टल",
  "सुझाव पोर्टल",
  "संपर्क और जुड़ें",
];

export const packages = [
  {
    name: "स्टार्टर पैकेज",
    desc: "शुरुआत करें मजबूत डिजिटल पहचान के साथ",
    price: "₹49,999",
    period: "/6 माह",
    featured: false,
    ctaLabel: "चुनें",
    theme: "green",
    features: [
      "उम्मीदवार वेबसाइट",
      "सोशल मीडिया सेटअप",
      "15 क्रिएटिव्स/माह",
      "व्हाट्सएप ब्रॉडकास्ट (लिमिटेड)",
      "बेसिक सपोर्ट",
    ],
  },
  {
    name: "प्रोफेशनल पैकेज",
    desc: "संपूर्ण डिजिटल चुनाव मैनेजमेंट",
    price: "₹99,999",
    period: "/6 माह",
    featured: true,
    badge: "लोकप्रिय",
    ctaLabel: "चुनें",
    theme: "orange",
    features: [
      "वेबसाइट (प्रीमियम)",
      "सोशल मीडिया मैनेजमेंट",
      "30 क्रिएटिव्स/माह",
      "व्हाट्सएप अभियान (अनलिमिटेड)",
      "वीडियो (2/माह)",
      "मंथली रिपोर्ट",
    ],
  },
  {
    name: "प्रीमियम पैकेज",
    desc: "एंड-टू-एंड प्रोफेशनल चुनाव अभियान",
    price: "₹149,999",
    period: "/6 माह",
    featured: false,
    ctaLabel: "चुनें",
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

export const testimonials = [
  {
    quote:
      "भारत पहचान टीम ने हमारी पूरी डिजिटल पहचान को नई ऊंचाई दी। वेबसाइट, सोशल मीडिया और व्हाट्सएप अभियान बहुत प्रभावी रहा।",
    name: "मोहनलाल जी",
    role: "सरपंच, राजस्थान",
  },
  {
    quote: "बहुत ही प्रोफेशनल टीम है, समय पर काम पूरा करते हैं और हर समय सपोर्ट में रहते हैं।",
    name: "सीता देवी",
    role: "पंचायत समिति सदस्य, मध्य प्रदेश",
  },
  {
    quote: "हमारे जिला परिषद चुनाव में डिजिटल अभियान ने बहुत बड़ा योगदान दिया।",
    name: "अजय सिंह",
    role: "जिला परिषद सदस्य, उत्तर प्रदेश",
  },
];

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
    excerpt: "बूथ-वार ग्रुप, कार्यकर्ता नेटवर्क और ब्रॉडकास्ट - एक व्यवहारिक गाइड।",
    date: "02 अगस्त 2026",
    category: "व्हाट्सएप",
    image: "rally",
  },
  {
    slug: "candidate-website-must-have",
    title: "उम्मीदवार वेबसाइट में क्या-क्या होना चाहिए",
    excerpt: "परिचय से लेकर शिकायत पोर्टल तक - एक भरोसेमंद वेबसाइट के जरूरी सेक्शन।",
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
    q: "क्या आप छोटे गांव के उम्मीदवारों के लिए भी काम करते हैं?",
    a: "बिल्कुल। हमारा मुख्य फोकस ग्राम पंचायत, पंचायत समिति और जिला परिषद उम्मीदवार हैं।",
  },
  {
    q: "वेबसाइट कितने दिन में तैयार हो जाती है?",
    a: "सामान्य रूप से 3 से 7 कार्य दिवस में आपकी अभियान वेबसाइट लाइव कर दी जाती है।",
  },
  {
    q: "क्या कंटेंट हिंदी और स्थानीय भाषा में मिलेगा?",
    a: "हां, हम हिंदी सहित मराठी, गुजराती, भोजपुरी और अन्य क्षेत्रीय भाषाओं में कंटेंट बनाते हैं।",
  },
  {
    q: "पैकेज की अवधि कितनी होती है?",
    a: "पैकेज मासिक आधार पर होते हैं, और चुनाव अवधि के अनुसार कस्टमाइज भी किए जा सकते हैं।",
  },
];
