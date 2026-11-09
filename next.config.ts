import type { NextConfig } from "next";

// ─────────────────────────────────────────────────────────────────────────────
// وضعان للبناء في نفس المشروع:
//
// 1) الوضع الافتراضي (بدون متغيرات بيئة): output: "standalone"
//    — يُستخدم للتشغيل كخادم Next.js (المعاينة المحلية وRender وDocker).
//
// 2) وضع GitHub Pages: عند ضبط NEXT_PUBLIC_BASE_PATH=/MCP-pormpt
//    — يتحول البناء إلى Static Export (مجلد out/) مع basePath الخاص
//      بمواقع المشاريع على GitHub Pages: https://<user>.github.io/<repo>/
//    — يُضبط داخل GitHub Actions في .github/workflows/deploy.yml
// ─────────────────────────────────────────────────────────────────────────────
const GH_PAGES_BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH;

const nextConfig: NextConfig = {
  ...(GH_PAGES_BASE_PATH
    ? {
        output: "export" as const,
        basePath: GH_PAGES_BASE_PATH,
        images: { unoptimized: true },
      }
    : {
        output: "standalone" as const,
      }),
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
