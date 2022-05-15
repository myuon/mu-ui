import { useParams } from "react-router-dom";
import React from "react";
import { Typography, usePromise } from "../../src";
import { css } from "@emotion/react";

function assertIsDefined<T>(val: T): asserts val is NonNullable<T> {
  if (val === undefined || val === null) {
    throw new Error(`Expected 'val' to be defined, but received ${val}`);
  }
}

export const ComponentPage = () => {
  const { name } = useParams<{ name: string }>();
  assertIsDefined(name);

  const { data } = usePromise<Record<string, () => JSX.Element>>(
    import(`../../src/${name}.story.tsx`)
  );

  return (
    <>
      <Typography variant="h2">{name}</Typography>

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
