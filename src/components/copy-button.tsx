"use client";

// زر النسخ — العنصر الوحيد في الصفحة الذي يحتاج جافاسكربت على العميل (خفيف جدًا)
import { useCallback, useRef, useState } from "react";
import { Check, Copy, X } from "lucide-react";
import { cn } from "@/lib/utils";

async function copyText(text: string): Promise<boolean> {
  // المحاولة الأولى: Clipboard API — والثانية: fallback قديم يعمل في السياقات غير الآمنة
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      ta.remove();
      return ok;
    } catch {
      return false;
    }
  }
}

type Variant = "primary" | "outline" | "ghost";

interface CopyButtonProps {
  text: string;
  label: string;
  copiedLabel?: string;
  variant?: Variant;
  className?: string;
}

const sizeCls: Record<Variant, string> = {
  primary: "px-7 py-3.5 rounded-2xl text-base sm:text-lg",
  outline: "px-4 py-2 rounded-xl text-sm",
  ghost: "px-2.5 py-1.5 rounded-lg text-xs",
};

const lookCls: Record<Variant, string> = {
  primary:
    "text-white bg-[linear-gradient(100deg,#8b5cf6,#a855f7_45%,#22d3ee)] border border-violet-300/30 shadow-[0_10px_36px_-12px_rgba(139,92,246,0.75)] hover:brightness-110 active:scale-[0.98]",
  outline:
    "text-slate-200 bg-white/5 border border-white/15 hover:bg-white/10 hover:border-white/25 active:scale-[0.98]",
  ghost:
    "text-slate-400 bg-transparent border border-white/10 hover:text-white hover:border-violet-400/40 hover:bg-violet-500/10 active:scale-[0.98]",
};

const iconSize: Record<Variant, number> = { primary: 20, outline: 15, ghost: 14 };

export function CopyButton({
  text,
  label,
  copiedLabel = "تم النسخ",
  variant = "outline",
  className,
}: CopyButtonProps) {
  const [state, setState] = useState<"idle" | "done" | "error">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onClick = useCallback(async () => {
    const ok = await copyText(text);
    setState(ok ? "done" : "error");
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("idle"), 2000);
  }, [text]);

  const Icon = state === "done" ? Check : state === "error" ? X : Copy;
  const shownLabel =
    state === "done" ? copiedLabel : state === "error" ? "تعذّر النسخ" : label;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${label} — ${text.length.toLocaleString("en-US")} حرف`}
      className={cn(
        "inline-flex select-none items-center justify-center gap-2 font-bold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/70",
        sizeCls[variant],
        state === "done"
          ? "border border-emerald-300/30 bg-emerald-500/90 text-white"
          : state === "error"
            ? "border border-red-400/30 bg-red-500/15 text-red-300"
            : lookCls[variant],
        className
      )}
    >
      <Icon size={iconSize[variant]} strokeWidth={2.5} aria-hidden />
      <span>{shownLabel}</span>
    </button>
  );
}
