import type { NextConfig } from "next";

const repoName = "SiteDiarista";
const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  /** Site 100% estático: `next build` gera a pasta `out/` pronta para hospedar. */
  output: "export",
  images: { unoptimized: true },
  reactStrictMode: false,
  basePath: isProd ? `/${repoName}` : "",
  assetPrefix: isProd ? `/${repoName}/` : "",
};

export default nextConfig;
