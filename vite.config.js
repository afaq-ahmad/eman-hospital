import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

const repo = "eman-hospital";            // <-- your repo name

export default defineConfig({
  plugins: [react()],
  base: `/${repo}/`,                      // GitHub Pages base
  resolve: {                              //  <-- add this block
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
});
