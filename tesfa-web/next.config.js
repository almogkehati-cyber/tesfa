/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed 'output: export' for dynamic client-side features
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: false, // Re-enable to catch errors
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  reactStrictMode: true,
  turbopack: {}
};

module.exports = nextConfig;
