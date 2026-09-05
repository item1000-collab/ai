import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: '/ai/gdc/20260905',
  assetPrefix: '/ai/gdc/20260905',
  trailingSlash: true,
  typescript: { ignoreBuildErrors: true },
  reactStrictMode: false,
};

export default nextConfig;
