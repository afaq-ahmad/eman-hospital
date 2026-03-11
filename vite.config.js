import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  // Cloudflare deploys the app at the domain root.
  // Keep this configurable in case a sub-path is needed in another environment.
  base: process.env.VITE_BASE_PATH || "/",
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
});
