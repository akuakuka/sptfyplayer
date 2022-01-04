import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import EnvironmentPlugin from "vite-plugin-environment";
import { VitePWA } from "vite-plugin-pwa";

// EnvironmentPlugin so import.meta.key jest problem
export default defineConfig({
  plugins: [
    VitePWA({
      manifest: {
        lang: "fi",
        name: "sptfyplayer",
        display: "fullscreen",
        start_url: "./login",
        short_name: "sptfyplayer",
        background_color: "#ffffff",
        theme_color: "#ffffff",
      },
    }),
    react(),
    EnvironmentPlugin(["VITE_BACKEND_URL", "NODE_ENV"]),
  ],
  server: { port: 3001 },
  envDir: "./server",
  root: "./src",
  build: {
    outDir: "./dist",
  },
});
