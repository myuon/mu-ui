import fs from "fs";
import path from "path";
import express from "express";
import { ViteDevServer } from "vite";
import ReactDOMServer from "react-dom/server";

export type RenderFunction = (
  url: string,
  options?: ReactDOMServer.RenderToPipeableStreamOptions
) => ReactDOMServer.PipeableStream;

const isTest = process.env.NODE_ENV === "test" || !!process.env.VITE_TEST_BUILD;
const isProd = process.env.NODE_ENV === "production";

export async function createServer(root = process.cwd(), hmrPort?: number) {
  const resolve = (p: string) => path.resolve(__dirname, p);
  const app = express();

  let vite: ViteDevServer | undefined = undefined;
  if (!isProd) {
    vite = await (
      await import("vite")
    ).createServer({
      root,
      logLevel: isTest ? "error" : "info",
      server: {
        middlewareMode: "ssr",
        watch: {
          // During tests we edit the files too fast and sometimes chokidar
          // misses change events, so enforce polling for consistency
          usePolling: true,
          interval: 100,
        },
        hmr: {
          port: hmrPort,
        },
      },
      configFile: "vite.config.uibook.ts",
    });
    // use vite's connect instance as middleware
    app.use(vite.middlewares);
  } else {
    app.use((await import("compression")).default());
    app.use(
      (await import("serve-static")).default(resolve("dist/client"), {
        index: false,
      })
    );
  }

  app.use("*", async (req, res) => {
    try {
      const url = req.originalUrl;

      if (!isProd) {
        const htmlFile = fs.readFileSync("./uibook/index.html", "utf-8");
        const template = await vite.transformIndexHtml(url, htmlFile);
        const render = (await vite?.ssrLoadModule("/uibook/entry.server.tsx"))
          ?.render;

        const html = render(url);
        res
          .status(200)
          .setHeader("Content-Type", "text/html")
          .send(template.replace(`<!--app-html-->`, html));
      } else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        (await import("./dist/server/entry.server.js")).render;
        throw new Error("not supported");
      }
    } catch (e) {
      if (e instanceof Error) {
        !isProd && vite?.ssrFixStacktrace(e);
        console.log(e.stack);
        res.status(500).end(e.stack);
      }
    }
  });

  return { app, vite };
}

if (!isTest) {
  createServer(process.cwd()).then(({ app }) =>
    app.listen(3000, () => {
      console.log("http://localhost:3000");
    })
  );
}
