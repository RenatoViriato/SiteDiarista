#!/bin/bash
# Supervisor mínimo: mantém o dev server vivo como sessão destacada.
# Estrutura que sobrevive ao reaper do sandbox: bash como líder de sessão
# em foreground + servidor Next.js como filho em background.
cd /home/z/my-project || exit 1

bun run dev &
DEV_PID=$!

# Reinicia o servidor caso ele morra (até 200 tentativas)
for i in $(seq 1 200); do
  sleep 30
  if ! curl -s --connect-timeout 2 --max-time 5 http://localhost:3000 >/dev/null 2>&1; then
    if ! kill -0 "$DEV_PID" 2>/dev/null; then
      echo "[dev-keepalive $(date '+%H:%M:%S')] servidor morreu, reiniciando..." >> /home/z/my-project/.zscripts/dev-keepalive.log
      bun run dev &
      DEV_PID=$!
    fi
  fi
done
