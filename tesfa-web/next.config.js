const withPWA = require('@ducanh2912/next-pwa').default({
  dest: 'public',
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  disable: process.env.NODE_ENV === 'development',
  workboxOptions: {
    runtimeCaching: [
      {
        // Never cache RPC endpoints - always fetch fresh blockchain data
        urlPattern: /^https:\/\/rpc-amoy\.polygon\.technology\/.*/i,
        handler: 'NetworkOnly',
      },
      {
        urlPattern: /^https:\/\/.*\.alchemy\.com\/.*/i,
        handler: 'NetworkOnly',
      },
      {
        urlPattern: /^https:\/\/.*\.infura\.io\/.*/i,
        handler: 'NetworkOnly',
      },
      {
        // Cache Polygonscan API with short TTL
        urlPattern: /^https:\/\/amoy\.polygonscan\.com\/.*/i,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'polygonscan',
          expiration: {
            maxEntries: 50,
            maxAgeSeconds: 60 * 5, // 5 minutes
          },
        },
      },
      {
        // Cache static assets
        urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|ico)$/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'static-images',
          expiration: {
            maxEntries: 100,
            maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
          },
        },
      },
      {
        // Cache fonts
        urlPattern: /\.(?:woff|woff2|ttf|otf|eot)$/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'fonts',
          expiration: {
            maxEntries: 20,
            maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
          },
        },
      },
    ],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Allow Turbopack in dev (PWA only needed in prod)
  turbopack: {},
};

module.exports = withPWA(nextConfig);
