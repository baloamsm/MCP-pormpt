import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MCP Media Generator — البرومبت الكامل جاهز للنسخ",
  description:
    "صفحة واحدة خفيفة وسريعة لنسخ برومبت بناء مشروع «MCP Media Generator»: خادم MCP لتوليد الصور والفيديو بالذكاء الاصطناعي ودمج المقاطع مع لوحة إدارة عربية — انسخه كاملًا أو قسمًا بقسم.",
  keywords: [
    "MCP",
    "Media Generator",
    "برومبت",
    "ذكاء اصطناعي",
    "توليد صور",
    "توليد فيديو",
  ],
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#070b14",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="scroll-smooth">
      <body className="antialiased">
        {/* خط Cairo يُحمَّل من CDN في متصفح الزائر مع display=swap — لا يعطّل التحميل */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&display=swap"
        />
        {children}
      </body>
    </html>
  );
}
