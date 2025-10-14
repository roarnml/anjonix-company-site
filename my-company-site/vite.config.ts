import { defineConfig } from "vite";
import * as path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import react from "@vitejs/plugin-react";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    port: 4000,
    open: true,
  },
  preview: {
    port: 4000,
  },
});
