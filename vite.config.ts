import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import EnvironmentPlugin from "vite-plugin-environment";
// EnvironmentPlugin so import.meta.key jest problem
export default defineConfig({
  plugins: [
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
