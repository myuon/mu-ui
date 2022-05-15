import { css } from "@emotion/react";
import { theme } from "./theme";
import React from "react";

export const Basic = () => {
  return (
    <div
      css={[
        css`
          display: grid;
          place-items: center;
          width: 100px;
          height: 100px;
        `,
        css`
          box-shadow: ${theme.shadow[4]};
        `,
      ]}
    >
      HEY!
    </div>
  );
};

export const Variation = () => {
  return (
    <div
      css={css`
        display: flex;
        gap: 16px;
      `}
    >
      {Object.keys(theme.shadow).map((key) => (
        <div
          key={key}
          css={[
            css`
              display: grid;
              place-items: center;
              width: 100px;
              height: 100px;
            `,
            {
              boxShadow:
                theme.shadow[key as unknown as keyof typeof theme.shadow],
            },
          ]}
        >
          {key}
        </div>
      ))}
    </div>
  );
};

export const Colored = () => {
  return (
    <div
      css={css`
        display: flex;
        gap: 16px;
      `}
    >
      {Object.keys(theme.primaryShadow).map((key) => (
        <div
          key={key}
          css={[
            css`
              display: grid;
              place-items: center;
              width: 100px;
              height: 100px;
              color: white;
              background-color: ${theme.palette.primary.main};
              border-radius: 4px;
            `,
            {
              boxShadow:
                theme.primaryShadow[
                  key as unknown as keyof typeof theme.primaryShadow
                ],
            },
          ]}
        >
          {key}
        </div>
      ))}
    </div>
  );
};

export const Hover = () => {
  return (
    <div
      css={[
        css`
          display: grid;
          place-items: center;
          width: 150px;
          height: 150px;
        `,
        css`
          box-shadow: ${theme.shadow[3]};
          transition: all 0.12s ease-in-out;

          &:hover {
            box-shadow: ${theme.shadow[6]};
          }
        `,
      ]}
    >
      Hover me!
    </div>
  );
};
