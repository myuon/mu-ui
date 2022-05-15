import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { css, Global } from "@emotion/react";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Global
        styles={css`
          body {
            margin: 0;
          }
        `}
      />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
