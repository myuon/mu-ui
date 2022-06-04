import ReactDOMServer from "react-dom/server";
import React from "react";
import App from "./App";
import { StaticRouter } from "react-router-dom/server";

const Html = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ja">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Vite App</title>
      </head>
      <body>
        <div id="root">{children}</div>
        <script type="module" src="/uibook/entry.client.tsx" />
      </body>
    </html>
  );
};

export const render = (
  url: string,
  options?: ReactDOMServer.RenderToPipeableStreamOptions
) => {
  return ReactDOMServer.renderToPipeableStream(
    <Html>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </Html>,
    options
  );
};
