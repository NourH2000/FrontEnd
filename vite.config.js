import { defineConfig } from "vite";
import { fileURLToPath } from "url";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        appSchoool: fileURLToPath(new URL("./index.html", import.meta.url)),
      },
    },
  },
});
