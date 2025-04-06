import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    nodeMiddleware: true,
  },
  
  images: {
    domains: ["placeholder.co", "images.unsplash.com", "plus.unsplash.com", "unsplash.com"],
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
