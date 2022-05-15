import { useParams } from "react-router-dom";
import React, { useMemo, useState } from "react";
import {
  Button,
  IconButton,
  theme,
  Typography,
  usePromise,
  useToasts,
} from "../../src";
import { css } from "@emotion/react";
import CodeIcon from "@mui/icons-material/Code";
import { refractor } from "refractor";
import tsx from "refractor/lang/tsx";
import { toH } from "hast-to-hyperscript";
import "prism-themes/themes/prism-one-dark.css";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

refractor.register(tsx);

function assertIsDefined<T>(val: T): asserts val is NonNullable<T> {
  if (val === undefined || val === null) {
    throw new Error(`Expected 'val' to be defined, but received ${val}`);
  }
}

const CodePanel = ({ children }: { children?: string }) => {
  const [open, setOpen] = useState(false);
  const { addToast } = useToasts();

  const highlighted = useMemo(
    () =>
      children
        ? toH(React.createElement, refractor.highlight(children, "tsx"))
        : undefined,
    [children]
  );

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
      {open && (
        <div
          css={css`
            position: relative;
          `}
        >
          <pre
            className="language-javascript"
            css={css`
              font-size: 14px;
            `}
          >
            <code>{highlighted}</code>
          </pre>
          <div
            css={css`
              position: absolute;
              top: 8px;
              right: 4px;
            `}
          >
            <IconButton
              onClick={() => {
                if (!children) {
                  return;
                }

                navigator.clipboard.writeText(children);
                addToast("Copied to clipboard!", {
                  timeout: 2500,
                });
              }}
              css={css`
                color: white;
              `}
            >
              <ContentCopyIcon />
            </IconButton>
          </div>
        </div>
      )}
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
                      padding: 24px;
                      margin: auto;
                      overflow: hidden;
                      border: 1px solid ${theme.palette.gray[300]};
                      border-radius: 4px;
                    `}
                  >
                    <Component />
                  </div>
                  <CodePanel key={`${name}-${key}`}>
                    {STORY_CODE[name][key]}
                  </CodePanel>
                </section>
              );
            })}
      </div>
    </>
  );
};
