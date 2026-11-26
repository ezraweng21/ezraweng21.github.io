import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.inaturalist.org",
      },
      {
        protocol: "https",
        hostname: "inaturalist-open-data.s3.amazonaws.com",
      },
    ],
  },
};

export default function config(phase: string): NextConfig {
  // Keep local production builds from overwriting a running dev server.
  if (process.env.VERCEL !== "1" && phase !== "phase-development-server") {
    return { ...nextConfig, distDir: ".next-production" };
  }
  return nextConfig;
}
