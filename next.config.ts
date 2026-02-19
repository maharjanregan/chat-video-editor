import type { NextConfig } from "next";

const repo = "chat-video-editor";
const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  ...(isProd
    ? {
        // GitHub Pages serves this project at /<repo>
        basePath: `/${repo}`,
        assetPrefix: `/${repo}/`,
      }
    : {}),
};

export default nextConfig;
