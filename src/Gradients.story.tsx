import { css } from "@emotion/react";
import React from "react";
import { Button } from "./Button";
import { gradientStyle } from "./Gradients";
import { theme } from "./theme";

export const Basic = () => {
  return (
    <div
      css={[
        css`
          width: 150px;
          height: 150px;
          border-radius: 4px;
        `,
        gradientStyle.dg32,
      ]}
    />
  );
};

export const Variation = () => {
  return (
    <div
      css={css`
        display: flex;
        flex-wrap: wrap;
        gap: 16px;
      `}
    >
      {Object.entries(gradientStyle).map(([key, style], index) => (
        <div
          key={index}
          css={[
            css`
              display: grid;
              place-items: center;
              width: 150px;
              height: 150px;
              color: white;
              border-radius: 4px;
            `,
            style,
          ]}
        >
          {key}
        </div>
      ))}
    </div>
  );
};

export const GradientButton = () => {
  return (
    <Button
      rounded
      css={[
        theme.typography.h4,
        gradientStyle.dg07,
        css`
          height: 56px;
          padding: 0 30px;
          color: white;
          box-shadow: ${theme.shadow[6]};
        `,
      ]}
    >
      CLICK HERE
    </Button>
  );
};
