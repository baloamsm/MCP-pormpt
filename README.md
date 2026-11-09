# MCP Media Generator 🚀

موقع صفحة واحدة (Single Page) أنيق وسريع لعرض ونسخ «برومبت بناء MCP Media Generator» كاملاً — مولّد وسائط MCP لتوليد الصور والفيديو ودمج الفيديوهات مع لوحة تحكم عربية.

> **التقنيات:** Next.js 16 · React 19 · Tailwind CSS 4 · TypeScript · Bun

---

## ✨ المميزات

- 🌙 تصميم داكن عصري بتدرجات بنفسجية/سماوية
- 📋 زر نسخ رئيسي للبرومبت الكامل + زر نسخ مستقل لكل قسم من الأقسام الـ 13
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

## ☁️ النشر على render.com

### الطريقة الأولى: Blueprint (الأسهل — ملف جاهز) ✅

المستودع يحتوي على ملف [`render.yaml`](./render.yaml) جاهز:

1. ادخل على [dashboard.render.com](https://dashboard.render.com)
2. **New +** ← **Blueprint**
3. اختر هذا المستودع `MCP-pormpt`
4. اضغط **Apply** — Render هيبني ويشغّل الموقع تلقائياً 🎉

### الطريقة الثانية: Web Service يدوياً

1. **New +** ← **Web Service** واختر المستودع
2. الإعدادات:

| الإعداد | القيمة |
|---|---|
| **Runtime** | `Bun` (يتعرّف عليه تلقائياً من `bun.lock`) |
| **Build Command** | `bun install && bun run build` |
| **Start Command** | `bun run start` |
| **Plan** | Free |

3. اضغط **Create Web Service**

> لا يحتاج أي متغيرات بيئة — الموقع لا يستخدم قواعد بيانات.
> الخطة المجانية على Render تدعم Bun وأيضاً Docker (يوجد [`Dockerfile`](./Dockerfile) جاهز كبديل).

## 📄 الترخيص

المشروع للاستخدام الشخصي.
