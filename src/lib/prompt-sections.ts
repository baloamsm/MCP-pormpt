// تقسيم البرومبت إلى أقسام + تجهيز نسخة "عرض" لكل قسم
// النسخة الخام (raw) تُستخدم في أزرار النسخ وهي مطابقة حرفيًا للأصل.
// نسخة العرض (display) تختلف فقط في: إخفاء وسوم <...> الوهمية عن الماركداون وحذف الفاصل الأخير.
import { PROMPT_MD } from "@/content/prompt";

export interface PromptSection {
  id: string; // معرّف الرابط الداخلي: intro أو sec-1 ... sec-13
  number: string | null; // رقم القسم إن وُجد
  title: string | null; // عنوان القسم (بدون الرقم) أو null للمقدمة
  raw: string; // النص الخام الحرفي (لأزرار النسخ)
  display: string; // نص العرض المُهيّأ للماركداون
}

// إخفاء <...> التي قد يعتبرها الماركداون وسوم HTML (مثل <model>) — خارج كتل الأكواد و`الكود المضمن`
function escapeHtmlAngles(md: string): string {
  const lines = md.split("\n");
  let inFence = false;
  return lines
    .map((line) => {
      if (/^\s*(```|~~~)/.test(line)) {
        inFence = !inFence;
        return line;
      }
      if (inFence) return line;
      // نقسم على كود مضمن (backticks) حتى لا نلمس ما بداخله — يُعرض حرفيًا كما هو
      return line
        .split(/(`+[^`]*`+)/g)
        .map((seg, i) => (i % 2 === 1 ? seg : seg.replace(/</g, "&lt;")))
        .join("");
    })
    .join("\n");
}

// حذف الفاصل --- والأسطر الفارغة في نهاية القسم (للعرض فقط)
function stripTrailingHr(text: string): string {
  const lines = text.split("\n");
  while (lines.length && lines[lines.length - 1].trim() === "") lines.pop();
  if (lines.length && /^-{3,}\s*$/.test(lines[lines.length - 1].trim())) {
    lines.pop();
    while (lines.length && lines[lines.length - 1].trim() === "") lines.pop();
  }
  return lines.join("\n");
}

export function splitSections(md: string): PromptSection[] {
  const lines = md.split("\n");
  const sections: PromptSection[] = [];
  let start = 0;
  let meta: { id: string; number: string | null; title: string | null } = {
    id: "intro",
    number: null,
    title: null,
  };

  const flush = (endExclusive: number) => {
    // نضيف سطر الترقيد الختامي للقسم (إن لم يكن الأخير) حتى يطابق النص الخام الملف الأصلي حرفيًا
    const raw =
      lines.slice(start, endExclusive).join("\n") +
      (endExclusive < lines.length ? "\n" : "");
    let body = stripTrailingHr(raw);
    if (meta.number) {
      // العنوان يُرسم يدويًا في رأس البطاقة، فنحذف سطر ## من نص العرض فقط
      body = body.split("\n").slice(1).join("\n");
    }
    sections.push({ ...meta, raw, display: escapeHtmlAngles(body) });
  };

  lines.forEach((line, i) => {
    const m = line.match(/^## (\d+)\)\s*(.*)$/);
    if (m) {
      flush(i);
      start = i;
      // نزيل علامات backticks من العنوان المعروض فقط — النص الخام يبقى كما هو
      meta = {
        id: `sec-${m[1]}`,
        number: m[1],
        title: m[2].trim().replace(/`+/g, ""),
      };
    }
  });
  flush(lines.length);
  return sections;
}

export const promptSections = splitSections(PROMPT_MD);

export const promptStats = {
  words: PROMPT_MD.split(/\s+/).filter(Boolean).length,
  chars: PROMPT_MD.length,
  sections: promptSections.filter((s) => s.number !== null).length,
  blocks: (PROMPT_MD.match(/```/g)?.length ?? 0) / 2,
};
