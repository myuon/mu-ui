import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react";

const uiBook = (): Plugin => {
  return {
    name: "uibook",
    handleHotUpdate: (ctx) => {
      return ctx.file.includes(".stroy.tsx") ? [require("./uibook/App")] : [];
    },
  };
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
    }),
    uiBook(),
  ],
  esbuild: {},
});
