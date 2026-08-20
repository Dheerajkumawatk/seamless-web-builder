import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "../styles.css";

export const metadata: Metadata = {
  title: "भारत पहचान — डिजिटल चुनाव अभियान एजेंसी",
  description:
    "सरपंच, पंचायत समिति और जिला परिषद उम्मीदवारों के लिए डिजिटल मार्केटिंग और ब्रांडिंग समाधान।",
  authors: [{ name: "भारत पहचान" }],
  openGraph: {
    title: "भारत पहचान — डिजिटल चुनाव अभियान एजेंसी",
    description: "वेबसाइट, सोशल मीडिया, व्हाट्सएप अभियान और वीडियो प्रोडक्शन।",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Mukta:wght@300;400;500;600;700;800&family=Tiro+Devanagari+Hindi:ital@0;1&display=swap"
        />
      </head>
      <body>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
