import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
    }),
  ],
  esbuild: {},
  build: {
    lib: {
      entry: "./src/index.ts",
      name: "MuUi",
    },
  },
});
