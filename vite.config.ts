import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['Cloud+Lighting.png'],
      manifest: {
        name: 'FreeServiceIndex',
        short_name: 'FSI',
        theme_color: '#08080a',
        background_color: '#08080a',
        display: 'standalone',
        icons: [
          {
            src: 'Cloud+Lighting.png',
            sizes: '192x192',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/.*\.(png|jpg|jpeg|svg|ico|gif)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'external-images',
              expiration: { maxEntries: 50, maxAgeSeconds: 86400 * 30 },
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    transformer: 'lightningcss',
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    cssMinify: 'lightningcss',
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    sourcemap: false,
    cssCodeSplit: true,
    assetsInlineLimit: 4096,
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
  assetsInclude: ['**/*.md'],
});
