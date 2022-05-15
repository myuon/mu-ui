import { css } from "@emotion/react";
import React from "react";
import { theme } from "./theme";

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: "h1" | "h2" | "h3" | "h4" | "body" | "button" | "caption";
  children?: React.ReactNode;
}

const styles = {
  reset: css`
    margin: 0;
  `,
};

export const Typography = ({ variant, ...props }: TypographyProps) => {
  const Component =
    variant === "body"
      ? "p"
      : variant === "caption"
      ? "small"
      : variant === "button"
      ? "span"
      : variant ?? "p";

  return (
    <Component
      {...props}
      css={[styles.reset, theme.typography[variant ?? "body"]]}
    />
  );
};
