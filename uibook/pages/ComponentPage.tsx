import { useLocation } from "react-router-dom";
import React from "react";
import { Typography, usePromise } from "../../src";
import { css } from "@emotion/react";

export const ComponentPage = () => {
  const location = useLocation();

  const state = location.state as { file: string; name: string };
  const { data } = usePromise<Record<string, () => JSX.Element>>(
    import(/* @vite-ignore */ state.file)
  );

  return (
    <>
      <Typography variant="h2">{state.name}</Typography>

      <div
        css={css`
          display: grid;
          gap: 32px;
          margin-top: 8px;
        `}
      >
        {data &&
          Object.keys(data)
            .filter((key) => {
              const Component = data[key];
              if (typeof Component !== "function") {
                return false;
              }

              return true;
            })
            .map((key) => {
              const Component = data[key];

              return (
                <section key={key}>
                  <Typography
                    variant="h4"
                    css={css`
                      margin: 8px 0;
                    `}
                  >
                    {key}
                  </Typography>
                  <Component />
                </section>
              );
            })}
      </div>
    </>
  );
};
