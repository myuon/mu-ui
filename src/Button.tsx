import { css } from "@emotion/react";
import React from "react";
import { theme } from "./theme";

const styles = {
  reset: css`
    padding: 0;
    color: inherit;
    cursor: pointer;
    background-color: transparent;
    border: none;
    outline: none;
    appearance: none;
  `,
  base: css`
    height: 40px;
    padding: 0 16px;
    line-height: 40px; // overrides from typography
    border-radius: 4px;
  `,
  rounded: css`
    border-radius: 9999px;
  `,
  colors: {
    primary: css`
      color: white;
      background-color: ${theme.palette.primary.main};
      box-shadow: ${theme.primaryShadow[3]};

      &:hover {
        box-shadow: ${theme.primaryShadow[4]};
      }
      &:active {
        background-color: ${theme.palette.primary.dark};
      }
    `,
    default: css`
      background-color: ${theme.palette.gray[100]};

      &:hover {
        background-color: ${theme.palette.gray[200]};
      }

      &:active {
        background-color: ${theme.palette.gray[300]};
      }
    `,
    textPrimary: css`
      color: ${theme.palette.primary.main};
    `,
    textDefault: css`
      color: ${theme.palette.text.light};
    `,
  },
  hasIcon: css`
    display: flex;
    gap: 4px;
    align-items: center;
  `,
  linkLike: css`
    display: flex;
    align-items: center;
    text-decoration: underline;
    &:hover {
      text-decoration: none;
    }
  `,
};

export interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  rounded?: boolean;
  color?: "primary" | "default";
  icon?: React.ReactNode;
}

export const Button = ({
  rounded,
  color = "default",
  icon,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      css={[
        styles.reset,
        theme.typography.button,
        styles.base,
        styles.colors[color],
        rounded && styles.rounded,
        icon && styles.hasIcon,
      ]}
    >
      {icon}
      {children}
    </button>
  );
};

export const IconButton = ({
  rounded,
  ...props
}: Omit<ButtonProps, "color">) => {
  return (
    <button
      {...props}
      css={[
        styles.reset,
        theme.typography.button,
        styles.base,
        css`
          padding: 8px;
        `,
        rounded && styles.rounded,
      ]}
    />
  );
};

export const LinkButton = ({
  children,
  color,
  icon,
  disableUnderline,
  ...props
}: Omit<ButtonProps, "rounded"> & { disableUnderline?: boolean }) => {
  return (
    <button
      {...props}
      css={[
        styles.reset,
        theme.typography.body,
        styles.linkLike,
        color === "primary"
          ? styles.colors.textPrimary
          : styles.colors.textDefault,
        disableUnderline &&
          css`
            text-decoration: none;
          `,
      ]}
    >
      {icon && (
        <span
          css={css`
            margin-right: 4px;
          `}
        >
          {icon}
        </span>
      )}
      {children}
    </button>
  );
};

export const AnchorButton = ({
  children,
  color,
  blank,
  ...props
}: {
  color?: "primary" | "default";
  blank?: boolean;
} & React.ComponentPropsWithoutRef<"a">) => {
  return (
    <a
      {...props}
      {...(blank && { target: "_blank", rel: "noopener noreferrer" })}
      css={[
        theme.typography.body,
        styles.linkLike,
        color === "primary"
          ? styles.colors.textPrimary
          : styles.colors.textDefault,
      ]}
    >
      {children}
    </a>
  );
};
