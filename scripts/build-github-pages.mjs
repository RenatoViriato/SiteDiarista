// Gera o build para publicar no GitHub Pages (site em /SiteDiarista/).
//
//   npm run build:github
//
// O GitHub Pages serve o site em https://usuario.github.io/SiteDiarista/, por
// isso o build precisa do prefixo `/SiteDiarista` nos assets. Na Vercel o site
// fica na raiz e esse prefixo quebraria tudo — por isso ele é opcional.
import { spawnSync } from "node:child_process";
import { existsSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const next = join(raiz, "node_modules", "next", "dist", "bin", "next");

if (!existsSync(next)) {
  console.error("Next.js não encontrado em node_modules. Rode `npm install` antes.");
  process.exit(1);
}

console.log("▸ build com prefixo /SiteDiarista (GitHub Pages)");
const r = spawnSync(process.execPath, [next, "build"], {
  cwd: raiz,
  stdio: "inherit",
  env: { ...process.env, GITHUB_PAGES: "true", NODE_ENV: "production" },
});
if (r.status !== 0) process.exit(r.status ?? 1);

// O GitHub Pages não usa 404.html automaticamente em subpastas, mas o arquivo
// ajuda quem abre uma URL inexistente. Também desligamos o Jekyll.
writeFileSync(join(raiz, "out", ".nojekyll"), "");
console.log(
  "\n▸ pronto: publique o conteúdo de `out/` na branch gh-pages\n" +
    "  (o site ficará em https://SEU-USUARIO.github.io/SiteDiarista/)"
);
