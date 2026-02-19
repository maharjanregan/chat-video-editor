import type { NextConfig } from "next";

const repo = "chat-video-editor";

const nextConfig: NextConfig = {
  output: "export",
  // GitHub Pages serves this project at /<repo>
  basePath: `/${repo}`,
  assetPrefix: `/${repo}/`,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
