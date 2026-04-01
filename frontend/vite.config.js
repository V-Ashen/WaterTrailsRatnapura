import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['logo.jpg', 'logo.png'],
      manifest: {
        name: 'Water Trails Ratnapura',
        short_name: 'Water Trails',
        description: 'Discover the Hidden Gems of Ratnapura offline.',
        theme_color: '#0A192F',
        background_color: '#0A192F',
        display: 'standalone',
        icons: [
          {
            src: '/logo.jpg', // We assume user puts logo.jpg in public later
            sizes: '192x192',
            type: 'image/jpeg'
          }
        ]
      },
      workbox: {
        // Cache our API requests so directions work seamlessly in the jungle!
        runtimeCaching: [{
          urlPattern: /^http:\/\/localhost:5000\/api\/trails.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'ratnapura-gem-cache',
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 60 * 60 * 24 * 30 // Caches offline gems for 30 Days
            },
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        }]
      }
    })
  ],
})
