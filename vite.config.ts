import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [react(), VitePWA({
    mode: 'development',
    includeAssets: ['favicon.png'],
    registerType: "prompt",
    base: "/src",
    manifest: {
      display: "standalone",
      name: 'sptfyplayer',
      short_name: 'sptfyplayer',
      theme_color: '#ffffff',
      /*       icons: [
              {
                src: 'pwa-192x192.png', // <== don't add slash, for testing
                sizes: '192x192',
                type: 'image/png',
              },
              {
                src: '/pwa-512x512.png', // <== don't remove slash, for testing
                sizes: '512x512',
                type: 'image/png',
              },
              {
                src: 'pwa-512x512.png', // <== don't add slash, for testing
                sizes: '512x512',
                type: 'image/png',
                purpose: 'any maskable',
              },
            ], */
    },
  })],
  server: { port: 3001 },
  envDir: './server',
  root: "./src",
  build: {
    outDir: "./dist"
  }
});
