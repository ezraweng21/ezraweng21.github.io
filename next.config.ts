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
  return { ...nextConfig, distDir: phase === "phase-development-server" ? ".next" : ".next-production" };
}
