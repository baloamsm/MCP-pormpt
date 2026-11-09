import { CopyButton } from "@/components/copy-button";
import { MdBody } from "@/components/md-body";
import { PROMPT_MD } from "@/content/prompt";
import { promptSections, promptStats } from "@/lib/prompt-sections";

// صفحة واحدة فقط — كلها Server Component وجافاسكربت العميل يقتصر على أزرار النسخ
export default function Home() {
  const intro = promptSections[0];
  const sections = promptSections.slice(1);
  const toc = [
    { id: "intro", number: "•", title: "المقدمة وطريقة الاستخدام" },
    ...sections.map((s) => ({
      id: s.id,
      number: s.number ?? "",
      title: s.title ?? "",
    })),
  ];

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-clip">
      {/* زخرفة الخلفية */}
      <div aria-hidden className="page-glow pointer-events-none fixed inset-0 -z-10" />
      <div aria-hidden className="page-grid pointer-events-none fixed inset-0 -z-10" />

      {/* الهيدر الثابت */}
      <header className="sticky top-0 z-40 border-b border-white/5 bg-[#070b14]/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between gap-3 px-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[linear-gradient(135deg,#8b5cf6,#22d3ee)] shadow-[0_4px_18px_-4px_rgba(139,92,246,0.6)]">
              <svg
                viewBox="0 0 24 24"
                className="size-5"
                fill="none"
                stroke="white"
                strokeWidth="2.4"
                strokeLinecap="round"
                aria-hidden
              >
                <path d="M8 6h8M8 12h8M8 18h5" />
              </svg>
            </span>
            <div className="min-w-0 leading-tight">
              <p
                dir="ltr"
                className="truncate text-end text-sm font-extrabold text-white sm:text-base"
              >
                MCP Media Generator
              </p>
              <p className="truncate text-[11px] text-slate-400">
                البرومبت الكامل جاهز للنسخ
              </p>
            </div>
          </div>
          <CopyButton
            text={PROMPT_MD}
            label="نسخ كاملًا"
            variant="outline"
            className="shrink-0"
          />
        </div>
      </header>

      <main className="mx-auto w-full max-w-4xl flex-1 px-4 sm:px-6">
        {/* الواجهة الرئيسية */}
        <section className="pb-9 pt-11 text-center sm:pt-14">
          <span className="inline-flex items-center gap-2 rounded-full border border-violet-400/25 bg-violet-500/10 px-4 py-1.5 text-xs font-bold text-violet-200">
            <span
              aria-hidden
              className="size-1.5 animate-pulse rounded-full bg-emerald-400"
            />
            برومبت جاهز — انسخته بنقرة واحدة
          </span>

          <h1 className="mt-5 text-4xl font-black leading-[1.2] sm:text-6xl">
            <span
              dir="ltr"
              className="inline-block bg-[linear-gradient(100deg,#a78bfa_10%,#e879f9_45%,#22d3ee_95%)] bg-clip-text text-transparent"
            >
              MCP Media Generator
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-8 text-slate-400 sm:text-base sm:leading-9">
            البرومبت الكامل لبناء{" "}
            <strong className="text-slate-200">
              خادم MCP لتوليد الصور والفيديو بالذكاء الاصطناعي ودمج المقاطع + لوحة
              إدارة عربية
            </strong>{" "}
            — انسخه كما هو (من أول سطر لآخر سطر) وأرسله لأي نموذج برمجي:{" "}
            <span dir="ltr" className="whitespace-nowrap">
              Claude Code / ChatGPT / Cursor / Windsurf / GLM
            </span>
            .
          </p>

          {/* شرائح الأرقام */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm">
            {[
              `${promptStats.sections} أقسام`,
              `${promptStats.words.toLocaleString("en-US")} كلمة`,
              `${promptStats.chars.toLocaleString("en-US")} حرف`,
              `${promptStats.blocks} كتلة كود`,
              "5 أدوات MCP",
            ].map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 font-bold text-slate-300"
              >
                {chip}
              </span>
            ))}
          </div>

          {/* أزرار الإجراء الرئيسية */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <CopyButton
              text={PROMPT_MD}
              label="انسخ البرومبت كاملًا"
              variant="primary"
              className="w-full sm:w-auto"
            />
            <a
              href={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/prompt.md`}
              download="mcp-media-generator-prompt.md"
              className="inline-flex w-full select-none items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-6 py-3.5 text-base font-bold text-slate-200 transition-all hover:border-white/25 hover:bg-white/10 active:scale-[0.98] sm:w-auto"
            >
              <svg
                viewBox="0 0 24 24"
                className="size-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M12 3v12m0 0 4-4m-4 4-4-4M4 19h16" />
              </svg>
              تنزيل كملف md.
            </a>
          </div>
          <p className="mt-3 text-xs text-slate-500">
            النسخ يُخرج النص الخام الحرفي كاملًا ({promptStats.chars.toLocaleString("en-US")}{" "}
            حرفًا) — جاهزًا للإرسال مباشرة لأي نموذج ذكاء اصطناعي.
          </p>
        </section>

        {/* الفهرس السريع */}
        <section
          id="toc"
          aria-label="الفهرس السريع"
          className="prompt-card scroll-mt-24"
        >
          <h2 className="mb-4 flex items-center gap-2 text-lg font-extrabold text-white">
            <span
              aria-hidden
              className="h-5 w-1 rounded-full bg-[linear-gradient(180deg,#8b5cf6,#22d3ee)]"
            />
            الفهرس السريع
          </h2>
          <nav className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {toc.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="group flex items-center gap-2.5 rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2.5 text-sm text-slate-300 transition-colors hover:border-violet-400/40 hover:bg-violet-500/10 hover:text-white"
              >
                <span className="grid size-6 shrink-0 place-items-center rounded-md bg-violet-500/15 text-xs font-bold text-violet-300">
                  {item.number}
                </span>
                <span className="truncate font-semibold">{item.title}</span>
              </a>
            ))}
          </nav>
        </section>

        {/* نص البرومبت */}
        <article aria-label="نص البرومبت الكامل">
          {/* المقدمة */}
          <section id="intro" className="prompt-card scroll-mt-24">
            <div className="mb-4 flex items-center justify-between gap-3 border-b border-white/10 pb-3.5">
              <h2 className="text-base font-extrabold text-white sm:text-lg">
                بداية البرومبت
              </h2>
              <CopyButton
                text={intro.raw}
                label="نسخ المقدمة"
                variant="ghost"
                className="shrink-0"
              />
            </div>
            <MdBody text={intro.display} />
          </section>

          {/* الأقسام 1..13 */}
          {sections.map((s) => (
            <section key={s.id} id={s.id} className="prompt-card scroll-mt-24">
              <div className="mb-4 flex items-start justify-between gap-3 border-b border-white/10 pb-3.5">
                <h2 className="flex items-start gap-2.5 text-lg font-extrabold leading-relaxed text-white sm:text-[1.35rem]">
                  <span className="mt-0.5 inline-grid shrink-0 place-items-center rounded-lg bg-violet-500/15 px-2.5 py-1 text-sm font-black text-violet-300">
                    {s.number}
                  </span>
                  <span>{s.title}</span>
                </h2>
                <CopyButton
                  text={s.raw}
                  label="نسخ القسم"
                  variant="ghost"
                  className="shrink-0"
                />
              </div>
              <MdBody text={s.display} />
            </section>
          ))}
        </article>
      </main>

      {/* التذييل */}
      <footer className="mt-10 border-t border-white/5 py-8">
        <div className="mx-auto max-w-4xl space-y-1.5 px-4 text-center sm:px-6">
          <p className="text-sm text-slate-400">
            نهاية البرومبت — انسخه كاملًا وأرسله لنموذج البرمجة.
          </p>
          <p className="text-xs text-slate-600">
            صفحة واحدة خفيفة وسريعة · كل أزرار النسخ تُخرج النص الخام الحرفي
          </p>
        </div>
      </footer>
    </div>
  );
}
