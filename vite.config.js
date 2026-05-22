import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['images/niraj-nagtilak-profile.jpg', 'images/apple-touch-icon.png'],
      manifest: {
        name: 'Niraj Nagtilak — Technical Lead & Software Architect',
        short_name: 'Niraj Nagtilak',
        description: '14+ years shipping production systems for national governments, tier-1 banks, and enterprise clients across 10+ countries.',
        theme_color: '#C8A96E',
        background_color: '#0D1117',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        icons: [
          { src: '/images/icons/icon-72x72.png',   sizes: '72x72',   type: 'image/png' },
          { src: '/images/icons/icon-96x96.png',   sizes: '96x96',   type: 'image/png' },
          { src: '/images/icons/icon-128x128.png', sizes: '128x128', type: 'image/png' },
          { src: '/images/icons/icon-144x144.png', sizes: '144x144', type: 'image/png' },
          { src: '/images/icons/icon-152x152.png', sizes: '152x152', type: 'image/png' },
          { src: '/images/icons/icon-192x192.png', sizes: '192x192', type: 'image/png', purpose: 'any maskable' },
          { src: '/images/icons/icon-384x384.png', sizes: '384x384', type: 'image/png' },
          { src: '/images/icons/icon-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
        ],
      },
      devOptions: { enabled: true },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,webp,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: { cacheName: 'google-fonts-cache', expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 } },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: { cacheName: 'gstatic-fonts-cache', expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 } },
          },
          {
            urlPattern: /^https:\/\/api\.fontshare\.com\/.*/i,
            handler: 'CacheFirst',
            options: { cacheName: 'fontshare-cache', expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 } },
          },
        ],
      },
    }),
  ],
  base: '/',
});
