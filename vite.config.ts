import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";


export default defineConfig({
  plugins: [react()],
  server: { port: 3001 },
  envDir: './server',
  root: "./src",
  build: {
    outDir: "../dist"
  }
});