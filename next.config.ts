/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'out',
  images: {
    unoptimized: true,
  },
  // igore eslint error on build    
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
