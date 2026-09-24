// Copia a exportação estática de `out/` para a raiz do projeto.
//
// A raiz deste repositório guarda uma cópia do site pronto (index.html, _next/,
// 404.html...), para quem publica a pasta do projeto direto na hospedagem.
// O `next build` NÃO atualiza essa cópia — rode este script depois do build:
//
//   npm run build && npm run sync:root
import { cpSync, existsSync, readdirSync, rmSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(projectRoot, "out");

if (!existsSync(join(outDir, "index.html"))) {
  console.error("Pasta `out/` não encontrada. Rode `npm run build` antes.");
  process.exit(1);
}

/** Nomes que a exportação estática gera na raiz (estrutura do site é fixa). */
const ARTEFATOS = [
  "_next",
  "_not-found",
  "_not-found.html",
  "_not-found.txt",
  "index.html",
  "index.txt",
  "404.html",
  "robots.txt",
  "logo.svg",
  "logo-renata.png",
];

const gerados = readdirSync(outDir);

// Espelho exato: primeiro apaga TODOS os artefatos da exportação que existem na
// raiz (isso remove também chunks antigos, cujo nome/hash muda a cada build) e
// depois copia o conteúdo atual de out/.
const presentes = [
  ...ARTEFATOS,
  ...readdirSync(projectRoot).filter((nome) => nome.startsWith("__next.")),
];

for (const nome of new Set(presentes)) {
  // Segurança: nunca remover nada que não seja artefato da exportação.
  if (!ARTEFATOS.includes(nome) && !nome.startsWith("__next.")) continue;
  if (!existsSync(join(projectRoot, nome))) continue;
  rmSync(join(projectRoot, nome), { recursive: true, force: true });
  console.log(`removido: ${nome}`);
}

for (const nome of gerados) {
  cpSync(join(outDir, nome), join(projectRoot, nome), {
    recursive: true,
    force: true,
  });
  console.log(`copiado: ${nome}`);
}

console.log("\nRaiz sincronizada com out/.");
