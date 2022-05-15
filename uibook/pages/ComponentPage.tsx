import { useParams } from "react-router-dom";
import React, { useState } from "react";
import { Button, theme, Typography, usePromise } from "../../src";
import { css } from "@emotion/react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import CodeIcon from "@mui/icons-material/Code";

function assertIsDefined<T>(val: T): asserts val is NonNullable<T> {
  if (val === undefined || val === null) {
    throw new Error(`Expected 'val' to be defined, but received ${val}`);
  }
}

const CodePanel = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      css={css`
        display: grid;
        gap: 8px;
      `}
    >
      <div
        css={css`
          display: flex;
          justify-content: flex-end;
        `}
      >
        <Button icon={<CodeIcon />} onClick={() => setOpen((t) => !t)}>
          CODE
        </Button>
      </div>
      {open ? children : null}
    </div>
  );
};

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
                <section
                  key={key}
                  css={css`
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                  `}
                >
                  <Typography variant="h4">{key}</Typography>
                  <div
                    css={css`
                      width: 100%;
                      padding: 16px;
                      margin: auto;
                      border: 1px solid ${theme.palette.gray[300]};
                      border-radius: 4px;
                    `}
                  >
                    <Component />
                  </div>
                  <CodePanel>
                    <SyntaxHighlighter
                      language="typescript"
                      style={atomOneDark}
                      css={css`
                        width: 100%;
                        margin: 0;
                        font-size: 16px;
                        border-radius: 4px;
                      `}
                    >
                      {STORY_CODE[name][key]}
                    </SyntaxHighlighter>
                  </CodePanel>
                </section>
              );
            })}
      </div>
    </>
  );
};
