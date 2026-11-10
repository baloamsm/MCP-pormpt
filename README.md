# MCP Media Generator 🚀

موقع صفحة واحدة (Single Page) أنيق وسريع لعرض ونسخ «برومبت بناء MCP Media Generator» كاملاً — مولّد وسائط MCP لتوليد الصور والفيديو ودمج الفيديوهات مع لوحة تحكم عربية.

> **التقنيات:** Next.js 16 · React 19 · Tailwind CSS 4 · TypeScript · Bun

---

## ✨ المميزات

- 🌙 تصميم داكن عصري بتدرجات بنفسجية/سماوية
- 📋 زر نسخ رئيسي للبرومبت الكامل + زر نسخ مستقل لكل قسم من الأقسام الـ 14 — القسم 14 هو البرومبت الثاني الكامل (موقع دمج الفيديوهات على Vercel) بزر نسخ واحد
- 📑 فهرس سريع (TOC) للتنقل بين الأقسام
- 🎨 عرض منسّق وجميل للـ Markdown (مع الحفاظ على النص الأصلي عند النسخ حرفياً)
- ⬇️ زر تحميل ملف البرومبت مباشرة
- ⚡ خفيف وسريع: الصفحة معروضة على السيرفر (Server Components) مع جافاسكريبت على المتصفح بمقدار زر النسخ فقط
- 🌍 دعم كامل للعربية RTL بخط Cairo

## 📂 هيكل المشروع

```
src/
├── app/
│   ├── page.tsx          # الصفحة الرئيسية (Hero + TOC + أقسام)
│   ├── layout.tsx        # RTL + خط Cairo
│   └── globals.css       # الثيم الداكن وأنماط Markdown
├── components/
│   ├── copy-button.tsx   # زر النسخ (Client Component الوحيد)
│   └── md-body.tsx       # عرض Markdown على السيرفر
├── content/
│   ├── prompt.md         # البرومبت الأصلي (مرجع)
│   └── prompt.ts         # البرومبت كموديول TypeScript (مطابق حرفياً)
└── lib/
    └── prompt-sections.ts# تقسيم البرومبت لأقسام
```

## 🖥️ التشغيل محلياً

```bash
bun install
bun run dev        # http://localhost:3000
```

للإنتاج:

```bash
bun run build
bun run start
```

## ☁️ النشر على GitHub Pages (مجاني للأبد — بدون بطاقة) ✅

المشروع مبني بحيث ينشر كـ **Static Export** على GitHub Pages تلقائياً:

- كل `push` على فرع `main` يشغّل [.github/workflows/deploy.yml](./.github/workflows/deploy.yml) الذي يبني الموقع وينشره
- الرابط المباشر: **https://baloamsm.github.io/MCP-pormpt/**

> **تفعيل لمرة واحدة (لو مش مفعّل):** إعدادات المستودع ← **Pages** ← **Source** ← اختر **GitHub Actions**.

**آلية العمل:** عند ضبط `NEXT_PUBLIC_BASE_PATH=/MCP-pormpt` يتحول البناء إلى Static Export (مجلد `out/`) مع `basePath` صحيح لمواقع المشاريع. بدون المتغير، يبني الوضع العادي (`standalone`) للتشغيل كخادم — فالوضعان لا يتعارضان.

## 🖥️ بديل: النشر على render.com

يعمل أيضاً كخادم عادي (يوجد [`render.yaml`](./render.yaml) جاهز لـ Blueprint و[`Dockerfile`](./Dockerfile) كبديل):

1. **New +** ← **Blueprint** ← اختر المستودع ← **Apply**
2. أو يدوياً: Runtime `Bun` · Build `bun install && bun run build` · Start `bun run start`

> ملاحظة: Render يطلب بطاقة للتحقق حتى في الخطة المجانية، لذلك GitHub Pages هو الخيار المعتمد هنا.

## 📄 الترخيص

المشروع للاستخدام الشخصي.
