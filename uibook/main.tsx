import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { css, Global } from "@emotion/react";
import { ToastProvider } from "../src";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <Global
          styles={css`
            body {
              margin: 0;
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
                Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
                sans-serif;
              color: #222;
              -webkit-font-smoothing: antialiased;
            }

            * {
              box-sizing: border-box;
            }
          `}
        />
        <App />
      </ToastProvider>
    </BrowserRouter>
  </React.StrictMode>
);
