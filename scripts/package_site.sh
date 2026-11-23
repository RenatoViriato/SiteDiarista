#!/bin/bash
# Gera os pacotes de entrega do site Renata Santos:
#  1) ZIP do código-fonte completo (sem node_modules/.next/.git)
#  2) ZIP da versão estática (next build + output export) pronta p/ hospedar
# Uso: bash /home/z/my-project/scripts/package_site.sh
set -euo pipefail
PROJ=/home/z/my-project
OUT=$PROJ/download
STAMP=$(date +%Y%m%d-%H%M)
mkdir -p "$OUT"

echo "== [0] encerrando dev server (evita conflito no .next) =="
pkill -f "next dev" 2>/dev/null || true
pkill -f ".zscripts/dev.sh" 2>/dev/null || true
sleep 2

echo "== [1] backup e patch do next.config.ts (export estático) =="
cp "$PROJ/next.config.ts" "$PROJ/scripts/next.config.ts.bak"
cat > "$PROJ/next.config.ts" << 'EOF'
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
EOF

echo "== [2] isolando route handler de API (incompatível com export) =="
mv "$PROJ/src/app/api" "$PROJ/scripts/_api_static_exclude"

restore() {
  echo "== [restore] devolvendo config e api =="
  mv "$PROJ/scripts/_api_static_exclude" "$PROJ/src/app/api" 2>/dev/null || true
  cp "$PROJ/scripts/next.config.ts.bak" "$PROJ/next.config.ts"
}
trap restore EXIT

echo "== [3] next build (export) =="
cd "$PROJ"
rm -rf out
bun run next build 2>&1 | tail -15

echo "== [4] validando export =="
[ -f out/index.html ] || { echo "ERRO: out/index.html ausente"; exit 1; }
ls out | head -10

echo "== [5] ZIP código-fonte completo =="
cd "$PROJ"
rm -f "$OUT/renata-santos-site-codigo-fonte.zip"
zip -qr "$OUT/renata-santos-site-codigo-fonte.zip" \
  src public prisma db .zscripts scripts \
  package.json bun.lock tsconfig.json next.config.ts postcss.config.mjs \
  eslint.config.mjs components.json tailwind.config.ts Caddyfile .env README-SITE.md \
  vercel.json .vercelignore \
  -x "scripts/shots/*" -x "scripts/next.config.ts.bak" -x "scripts/_api_static_exclude/*" \
  -x "scripts/logo-candidate-a.png" -x ".zscripts/*.log" -x "dev.log" -x "server.log"
echo "codigo: $(du -h "$OUT/renata-santos-site-codigo-fonte.zip" | cut -f1)"

echo "== [6] ZIP versão estática (index.html na RAIZ — pronto p/ publicar) =="
cp "$PROJ/README-SITE.md" out/LEIA-ME.txt
rm -f "$OUT/renata-santos-site-estatico.zip"
# Zipa o CONTEÚDO de out/ a partir de dentro dela: index.html fica na raiz do zip,
# requisito das plataformas de publicação (antes ia com prefixo out/ e quebrava).
cd "$PROJ/out"
zip -qr "$OUT/renata-santos-site-estatico.zip" .
echo "estatico: $(du -h "$OUT/renata-santos-site-estatico.zip" | cut -f1)"

echo "== CONCLUÍDO =="
ls -la "$OUT" | grep renata
