import { Global } from "@emotion/react";
import Color from "color";
import React from "react";

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

export const defaultTheme = {
  typography: {
    h1: {
      fontSize: "36px",
      fontWeight: 700,
    },
    h2: {
      fontSize: "28px",
      fontWeight: 700,
    },
    h3: { fontSize: "24px", fontWeight: 600 },
    h4: { fontSize: "20px", fontWeight: 600 },
    body: {
      fontSize: "16px",
      fontWeight: 400,
      letterSpacing: "0.1px",
      lineHeight: 1.65,
    },
    button: {
      fontSize: "16px",
      fontWeight: 500,
      letterSpacing: "1.1px",
      lineHeight: 1.15,
    },
    caption: {
      fontSize: "13px",
      lineHeight: 1.35,
      letterSpacing: "0.5px",
    },
  },
  palette,
  shadow,
  primaryShadow: coloredShadow(palette.primary.main),
};
type Theme = typeof defaultTheme;

const createThemeStyle = (theme: Theme) => {
  const result = [] as { name: string; value: unknown; var: string }[];

  const run = (object: unknown, prefix: string) => {
    if (typeof object === "function") {
      return undefined;
    }

    if (typeof object !== "object") {
      result.push({ name: prefix, value: object, var: `var(--${prefix})` });
      return `var(--${prefix})`;
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const style = {} as any;
      for (const key in object) {
        const value = run(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (object as any)[key],
          prefix === "" ? key : `${prefix}-${key}`
        );
        style[key] = value;
      }

      return style;
    }
  };

  const varStyle = run(theme, "");

  return [result, varStyle as Theme] as const;
};

export const [themeStyle, theme] = createThemeStyle(defaultTheme);

export const MuUiStyles = () => {
  return (
    <Global
      styles={{
        ":root": Object.fromEntries(
          themeStyle.map((item) => [`--${item.name}`, `${item.value}`])
        ),
      }}
    />
  );
};
