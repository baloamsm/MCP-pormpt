#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
توليد src/content/prompt.ts من المصدر src/content/prompt.md
- JSON.stringify آمن مع كل الرموز (backticks و ${} و ...) حتى يبقى النص المنسوخ حرفيًا 100%
- يتحقق من تطابق المحتوى بعد التوليد (roundtrip) ويطبع MD5 للمصدر والناتج
"""
import hashlib
import json
import pathlib
import sys

ROOT = pathlib.Path("/home/z/my-project")
SRC_MD = ROOT / "src" / "content" / "prompt.md"
OUT_TS = ROOT / "src" / "content" / "prompt.ts"

md = SRC_MD.read_text(encoding="utf-8")

# نضمن أن الملف ينتهي بسطر واحد جديد بالضبط (نفس شكل الأصل)
if not md.endswith("\n"):
    md += "\n"

# JSON.stringify المكافئ في JS: json.dumps مع ensure_ascii=False يعطي نفس النتيجة عمليًا
js_literal = json.dumps(md, ensure_ascii=False)

ts = (
    "// ملف مولّد تلقائيًا من src/content/prompt.md — لا تعدّله يدويًا.\n"
    "// أعد التوليد بـ: python3 scripts/gen_prompt_ts.py\n"
    "// النص هنا مطابق حرفيًا للبرومبت الأصلي (ل يُستخدم في أزرار النسخ).\n"
    "export const PROMPT_MD = "
    + js_literal
    + ";\n"
)

OUT_TS.write_text(ts, encoding="utf-8", newline="\n")

# تحقق roundtrip: اقرأ الملف المولّد واستخرج القيمة مرة أخرى
generated = OUT_TS.read_text(encoding="utf-8")
prefix = "export const PROMPT_MD = "
start = generated.index(prefix) + len(prefix)
end = generated.rindex(";\n")
value = json.loads(generated[start:end])

ok = value == md
md5_src = hashlib.md5(md.encode("utf-8")).hexdigest()
md5_out = hashlib.md5(value.encode("utf-8")).hexdigest()

print(f"source chars : {len(md)}")
print(f"output chars : {len(value)}")
print(f"md5 source   : {md5_src}")
print(f"md5 output   : {md5_out}")
print(f"roundtrip ok : {ok}")

sys.exit(0 if ok else 1)
