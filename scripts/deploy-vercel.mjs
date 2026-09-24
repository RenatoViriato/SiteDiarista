// Publica o build (`out/`) na Vercel.
//
// Fluxo: npm run build && npm run deploy
//
// O CLI da Vercel fica isolado em `.tools/vercel-cli` (não mexe nas dependências
// do site) e as credenciais em `.tools/vercel-home` (ambos no .gitignore).
// O login é feito uma única vez: `npm run deploy:login`.
import { cpSync, existsSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(raiz, "out");
const deployDir = join(raiz, ".tools", "deploy", "rr-casa-em-ordem");
const cli = join(raiz, ".tools", "vercel-cli", "node_modules", "vercel", "dist", "vc.js");
const globalConfig = join(raiz, ".tools", "vercel-home");

if (!existsSync(join(outDir, "index.html"))) {
  console.error("Pasta `out/` não encontrada. Rode `npm run build` antes.");
  process.exit(1);
}

if (!existsSync(cli)) {
  console.error(
    "CLI da Vercel não encontrado em .tools/vercel-cli.\n" +
      "Rode: npm run deploy:setup"
  );
  process.exit(1);
}

// Espelha o build em uma pasta com o nome do projeto na Vercel.
rmSync(deployDir, { recursive: true, force: true });
mkdirSync(deployDir, { recursive: true });
for (const nome of readdirSync(outDir)) {
  cpSync(join(outDir, nome), join(deployDir, nome), {
    recursive: true,
    force: true,
  });
}
console.log("▸ build copiado para .tools/deploy/rr-casa-em-ordem");

// stdio "inherit" mantém a saída do CLI no terminal (e evita o problema de
// pipes em ambientes restritos).
const resultado = spawnSync(
  process.execPath,
  [cli, "--global-config", globalConfig, "deploy", deployDir, "--prod", "--yes"],
  {
    stdio: "inherit",
    env: { ...process.env, NO_UPDATE_NOTIFIER: "1", CI: "1" },
  }
);

process.exit(resultado.status ?? 1);
