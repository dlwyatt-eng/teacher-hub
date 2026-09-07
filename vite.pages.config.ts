import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig(({ command }) => ({
  root: "pages",
  base: command === "serve" ? "/" : "/teacher-hub/",
  publicDir: "../public",
  server: { host: "0.0.0.0", allowedHosts: ["terminal.local"] },
  plugins: [react()],
  resolve: {
    alias: {
      "next/image": path.resolve(__dirname, "pages/next-image.tsx"),
    },
  },
  build: {
    outDir: "../pages-dist",
    emptyOutDir: true,
    rollupOptions: { input: path.resolve(__dirname, "pages/index.html") },
  },
}));
