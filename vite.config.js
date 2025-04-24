import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// IMPORTANT: replace below with your repo name
const repo = "eman-hospital";   // 👈

export default defineConfig({
  plugins: [react()],
  base: `/${repo}/`, // ensures correct asset paths on GitHub Pages
});
