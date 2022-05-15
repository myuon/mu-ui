import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react";
import * as fs from "fs";
import * as path from "path";
import { parse } from "@typescript-eslint/parser";

const srcDir = "./src";
const uiBook = (): Plugin => {
  return {
    name: "uibook",
    config: () => {
      const modules = {};

      fs.readdirSync(srcDir).forEach((filePath) => {
        if (filePath.endsWith(".story.tsx")) {
          const name = filePath.split("/").pop().replace(".story.tsx", "");
          const file = fs.readFileSync(path.join(srcDir, filePath)).toString();

          const parseResult = parse(file, {
            ecmaFeatures: {
              jsx: true,
            },
            sourceType: "module",
            range: true,
          });

          const decls = {};
          parseResult.body.forEach((node) => {
            if (
              node.type === "ExportNamedDeclaration" &&
              node.declaration.type === "VariableDeclaration" &&
              node.declaration.declarations[0].id.type === "Identifier"
            ) {
              decls[node.declaration.declarations[0].id.name] = file.slice(
                ...node.range
              );
            }
          });
          modules[name] = decls;
        }
      });

      return {
        define: {
          STORY_CODE: modules,
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
