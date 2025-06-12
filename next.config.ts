import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // igore eslint error on build    
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
