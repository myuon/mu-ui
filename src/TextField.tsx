import { css } from "@emotion/react";
import React from "react";
import { theme } from "./theme";

const styles = {
  base: css`
    display: grid;
    align-items: center;
    width: 100%;
    height: 40px;
    padding: 0 12px;
    border: 1px solid ${theme.palette.gray[300]};
    border-radius: 4px;
    box-shadow: ${theme.shadow[1]};
  `,
  focus: css`
    &:focus {
      // grow outside border
      border: 1px solid ${theme.palette.primary.main};
      outline: 1px solid ${theme.palette.primary.main};
    }
  `,
};

export type TextFieldProps = React.ComponentPropsWithoutRef<"input">;

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (props, ref) => {
    return <input ref={ref} {...props} css={[styles.base, styles.focus]} />;
  }
);
