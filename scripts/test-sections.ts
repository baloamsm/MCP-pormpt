// اختبار تطابق أقسام البرومبت مع الملف الأصلي حرفيًا — يُشغَّل بـ bun
import { PROMPT_MD } from "../src/content/prompt";
import { promptSections } from "../src/lib/prompt-sections";
import { readFileSync } from "node:fs";

const fromDisk = readFileSync("/home/z/my-project/src/content/prompt.md", "utf8");

// 1) الثابت المولّد مطابق للملف على القرص
console.log("PROMPT_MD === file:", PROMPT_MD === fromDisk);

// 2) دمج الأقسام الخام يعيد النص الأصلي بالضبط
const rejoined = promptSections.map((s) => s.raw).join("");
console.log("sections count:", promptSections.length);
console.log("rejoined === original:", rejoined === PROMPT_MD);
if (rejoined !== PROMPT_MD) {
  for (let i = 0; i < Math.max(rejoined.length, PROMPT_MD.length); i++) {
    if (rejoined[i] !== PROMPT_MD[i]) {
      console.log("first diff at", i, JSON.stringify(rejoined.slice(i - 20, i + 20)), "!=", JSON.stringify(PROMPT_MD.slice(i - 20, i + 20)));
      break;
    }
  }
}

// 3) كل قسم يبدأ بـ ## ويلتزم بالترقيم
const numbered = promptSections.filter((s) => s.number !== null);
console.log("numbered sections:", numbered.length);
console.log(
  "order ok:",
  numbered.every((s, i) => s.raw.startsWith(`## ${i + 1})`))
);
