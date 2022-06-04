import ReactDOMServer from "react-dom/server";
import React from "react";
import App from "./App";
import { StaticRouter } from "react-router-dom/server";

export const render = (url: string) => {
  return ReactDOMServer.renderToPipeableStream(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  );
};