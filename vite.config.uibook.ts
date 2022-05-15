import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react";
import * as fs from "fs";
import * as path from "path";

const uiBook = (): Plugin => {
  return {
    name: "uibook",
    config: () => {
      const dir = path.join(__dirname, "./src");

      return {
        define: {
          STORY_FILES: fs
            .readdirSync(dir)
            .filter((f) => f.match(/(.*)\.story\.tsx$/))
            .map((f) => path.join(dir, f)),
        },
      };
    },
    handleHotUpdate: (ctx) => {
      ctx.server.ws.send({
        type: "full-reload",
      });
      return [];
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
