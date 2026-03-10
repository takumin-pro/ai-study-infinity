import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "AI Study ∞ (AIスタディインフィニティ) | 小学生向け算数特化のさかのぼり学習",
  description: "お子様専用のGPTsでニガテを克服。AI Study ∞（AIスタディインフィニティ）は、小学3〜6年生向けの算数やり直し学習サービスです。24時間365日いつでも質問可能。",
  openGraph: {
    type: "website",
    url: "https://example.com/",
    title: "AI Study ∞ | 小学生向け算数特化AI学習",
    description: "お子様専用のGPTsでニガテを克服。24時間365日サポート。まずはお試し診断から。",
    images: ["https://example.com/og-image-placeholder.jpg"],
  },
  twitter: {
    card: "summary_large_image",
  },
};

import Header from "./components/Header";
import Footer from "./components/Footer";
import MobileStickyCTA from "./components/MobileStickyCTA";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${notoSansJP.variable}`}>
        <Header />
        {children}
        <Footer />
        <MobileStickyCTA />
      </body>
    </html>
  );
}
