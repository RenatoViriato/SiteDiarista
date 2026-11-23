#!/bin/bash
# Publica o site R&R Casa em Ordem na Vercel (deploy de produção).
# Uso: VERCEL_TOKEN=seu-token bash /home/z/my-project/scripts/deploy_vercel.sh
# O token NÃO é gravado em nenhum arquivo — usado só nos comandos abaixo.
set -euo pipefail
PROJ=/home/z/my-project

[ -n "${VERCEL_TOKEN:-}" ] || { echo "ERRO: exporte VERCEL_TOKEN antes de rodar (token de https://vercel.com/account/tokens)"; exit 1; }

cd "$PROJ"
echo "== vinculando projeto (nome: rr-casa-em-ordem) =="
vercel link --yes --project rr-casa-em-ordem --token "$VERCEL_TOKEN"

echo "== deploy de produção (build na nuvem da Vercel) =="
vercel --prod --yes --token "$VERCEL_TOKEN"

echo "== CONCLUÍDO =="
