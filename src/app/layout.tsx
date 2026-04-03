import type { Metadata } from "next";
import { Noto_Sans_KR, Inter } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const notoSansKR = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Korea Nomad — 한국에서 노마드하자",
  description:
    "한국에서 디지털 노마드로 살기 좋은 도시를 찾고, 평가하고, 커뮤니티를 형성할 수 있는 올인원 플랫폼",
  openGraph: {
    title: "Korea Nomad — 한국에서 노마드하자",
    description:
      "한국에서 디지털 노마드로 살기 좋은 도시를 찾고, 평가하고, 커뮤니티를 형성할 수 있는 올인원 플랫폼",
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${notoSansKR.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-[family-name:var(--font-noto-sans-kr)]">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
