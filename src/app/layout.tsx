import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LeadPopup } from "@/components/site/LeadPopup";
import { getBaseUrl } from "@/lib/site-url";
import { ogImage } from "@/lib/seo";
import "../styles.css";

const baseUrl = getBaseUrl();

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "पंचायत एवं स्थानीय चुनाव डिजिटल अभियान सेवाएं | BharatPahchan",
    template: "%s | BharatPahchan",
  },
  description:
    "BharatPahchan पंचायत एवं स्थानीय चुनाव उम्मीदवारों के लिए वेबसाइट, सोशल मीडिया, वीडियो, ग्राफिक्स और डिजिटल आउटरीच सेवाएँ प्रदान करता है।",
  keywords: [
    "पंचायत चुनाव",
    "चुनाव वेबसाइट",
    "उम्मीदवार वेबसाइट",
    "सरपंच अभियान",
    "डिजिटल अभियान",
    "चुनाव कैंपेन",
    "local election website",
    "election campaign services",
    "BharatPahchan",
  ],
  authors: [{ name: "भारत पहचान" }],
  creator: "भारत पहचान",
  publisher: "भारत पहचान",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "hi_IN",
    url: baseUrl,
    siteName: "BharatPahchan",
    title: "पंचायत एवं स्थानीय चुनाव डिजिटल अभियान सेवाएं | BharatPahchan",
    description: "उम्मीदवार वेबसाइट, सोशल मीडिया, वीडियो, ग्राफिक्स और डिजिटल आउटरीच सेवाएँ।",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "पंचायत एवं स्थानीय चुनाव डिजिटल अभियान सेवाएं | BharatPahchan",
    description:
      "पंचायत एवं स्थानीय चुनाव उम्मीदवारों के लिए वेबसाइट, सोशल मीडिया और डिजिटल आउटरीच सेवाएँ।",
    images: [ogImage.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hi">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="google-site-verification"
          content="92pWEvnsKfa9nMnmWQpH2405sL1TFsc1YGEoxtaQn8s"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Mukta:wght@300;400;500;600;700;800&family=Tiro+Devanagari+Hindi:ital@0;1&display=swap"
        />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "भारत पहचान",
              alternateName: "BharatPahchan",
              url: baseUrl,
              logo: `${baseUrl}/favicon.ico`,
              email: "bharatpahchan.helpline@gmail.com",
              telephone: "+91-7891-131-132",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Jaipur",
                addressRegion: "Rajasthan",
                addressCountry: "IN",
              },
              sameAs: [
                "https://www.instagram.com/bharatpahchan/",
                "https://www.facebook.com/profile.php?id=61593206296368",
                "https://www.youtube.com/@bharatpahchan",
              ],
            }),
          }}
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-YZGGSCVZ2D"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YZGGSCVZ2D');
          `}
        </Script>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="min-w-0 flex-1">{children}</main>
          <Footer />
          <LeadPopup />
        </div>
      </body>
    </html>
  );
}
