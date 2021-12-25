import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from 'vite-plugin-pwa';


export default defineConfig({
  plugins: [react(),
  VitePWA({
    registerType: "autoUpdate",
    includeAssets: ["/images/**/*"],
    base: "/",

    manifest: {
      name: "SPTFYPLAYER",
      short_name: "SPTFYPLAYER",
      theme_color: "#333333",
      display: "standalone",
      icons: [
        {
          src: "/images/icon-512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
    },
  })],
  server: { port: 3001 },
  envDir: '../server'
});
