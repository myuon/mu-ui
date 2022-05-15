import { css } from "@emotion/react";
import Color from "color";

const palette = {
  primary: {
    main: "#6d28d9",
    dark: "#5b21b6",
  },
  semantical: {
    open: {
      main: "#059669",
    },
    closed: {
      main: "#4f46e5",
    },
    draft: {
      main: "#9aa1ad",
    },
    success: {
      main: "#16a34a",
    },
    error: {
      main: "#dc2626",
    },
    warning: {
      main: "#f59e0b",
    },
  },
  gray: {
    50: "#f9fafb",
    100: "#f3f4f6",
    200: "#e5e7eb",
    300: "#d1d5db",
    400: "#9aa1ad",
    500: "#697080",
    600: "#485261",
    700: "#374151",
    800: "#1f2937",
    900: "#111827",
  },
  text: {
    main: "#1f2937",
    light: "#485261",
  },
};

const shadow = {
  0: "none",
  1: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  2: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
  3: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  4: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  5: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  6: "0 25px 50px -12px rgb(0 0 0 / 0.25)",
};
const coloredShadow = (code: string) => {
  return {
    3: shadow[3].replaceAll(
      `rgb(0 0 0 / 0.1)`,
      `rgb(${Color(code).array().join(" ")} / 0.2)`
    ),
    4: shadow[4].replaceAll(
      `rgb(0 0 0 / 0.1)`,
      `rgb(${Color(code).array().join(" ")} / 0.2)`
    ),
    5: shadow[5].replaceAll(
      `rgb(0 0 0 / 0.1)`,
      `rgb(${Color(code).array().join(" ")} / 0.2)`
    ),
  };
};

export const theme = {
  typography: {
    h1: {
      fontSize: 36,
      fontWeight: 700,
    },
    h2: {
      fontSize: 28,
      fontWeight: 700,
    },
    h3: { fontSize: 24, fontWeight: 600 },
    h4: { fontSize: 20, fontWeight: 600 },
    body: {
      fontSize: 16,
      fontWeight: 400,
      letterSpacing: 0.5,
      lineHeight: 1.65,
    },
    button: {
      fontSize: 16,
      fontWeight: 500,
      letterSpacing: 1.1,
      lineHeight: 1.15,
    },
    caption: css`
      font-size: 14px;
      line-height: 1.35;
      letter-spacing: 0.5px;
    `,
  },
  palette,
  shadow,
  primaryShadow: coloredShadow(palette.primary.main),
  glass: css`
    background: rgba(255, 255, 255, 0.5);
    border: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    -webkit-backdrop-filter: blur(8px);
    backdrop-filter: blur(8px);
  `,
};
