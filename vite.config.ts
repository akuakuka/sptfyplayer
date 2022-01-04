import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import EnvironmentPlugin from "vite-plugin-environment";
import { VitePWA } from "vite-plugin-pwa";

// EnvironmentPlugin so import.meta.key jest problem
export default defineConfig({
  plugins: [
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        lang: "fi",
        name: "sptfyplayer",
        scope: "/",
        display: "fullscreen",
        start_url: ".",
        short_name: "test",
        background_color: "#ffffff",
        theme_color: "#ffffff",
        /*         icons: [
          {
            src: "/favicon.png",
            sizes: "48x48",
            type: "image/png",
          },
        ], */
      },
    }),
    react(),
    EnvironmentPlugin([
      "VITE_BACKEND_URL_DEV",
      "VITE_BACKEND_URL_PROD",
      "NODE_ENV",
    ]),
  ],
  server: { port: 3001 },
  envDir: "./server",
  root: "./src",
  build: {
    outDir: "./dist",
  },
});
