#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# النشر على GitHub Pages — يبني الموقع كـ Static Export ويدفع out/ إلى فرع gh-pages
# الاستخدام:  bash scripts/deploy-gh-pages.sh
# المطلوب:    bun مثبّت + صلاحية push على المستودع
# ─────────────────────────────────────────────────────────────────────────────
set -euo pipefail
cd "$(dirname "$0")/.."

REPO_URL="https://github.com/baloamsm/MCP-pormpt.git"
BASE_PATH="/MCP-pormpt"

echo "🔨 1/3 بناء الموقع (Static Export)..."
NEXT_PUBLIC_BASE_PATH="$BASE_PATH" NEXT_TELEMETRY_DISABLED=1 bun run build

[ -f out/index.html ] || { echo "❌ البناء لم ينتج out/index.html"; exit 1; }

echo "📦 2/3 تجهيز فرع gh-pages..."
cd out
rm -rf .git
git init -q -b gh-pages
touch .nojekyll   # تعطيل Jekyll حتى تُقدَّم ملفات _next/ كما هي

git add -A
git -c user.name="${GIT_USER:-baloamsm}" \
    -c user.email="${GIT_EMAIL:-baloamsm@users.noreply.github.com}" \
    commit -q -m "Deploy: $(date -u '+%Y-%m-%d %H:%M') UTC"

echo "🚀 3/3 الدفع إلى gh-pages..."
git remote add origin "$REPO_URL"
git push -q -f origin gh-pages

rm -rf .git
echo "✅ تم النشر! الرابط: https://baloamsm.github.io${BASE_PATH}/"
