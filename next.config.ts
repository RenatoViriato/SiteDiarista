import type { NextConfig } from "next";

const repoName = "SiteDiarista";

/**
 * O prefixo `/SiteDiarista` só é necessário no **GitHub Pages**, que publica o
 * site em `usuario.github.io/SiteDiarista/`. Rodando na Vercel (ou em qualquer
 * host que sirva o site na raiz), o prefixo quebra todos os assets — o HTML
 * procura `/_SiteDiarista/_next/...` e recebe 404.
 *
 * Para gerar o build do GitHub Pages: `npm run build:github`
 */
const usarPrefixo = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  /** Site 100% estático: `next build` gera a pasta `out/` pronta para hospedar. */
  output: "export",
  images: { unoptimized: true },
  reactStrictMode: false,
  basePath: usarPrefixo ? `/${repoName}` : "",
  assetPrefix: usarPrefixo ? `/${repoName}/` : "",
};

export default nextConfig;
