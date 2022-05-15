import { AnchorButton, Button, IconButton, LinkButton } from "./Button";
import React from "react";
import { css } from "@emotion/react";
import RefreshIcon from "@mui/icons-material/Refresh";

export const Basic = () => {
  return (
    <>
      <Button>This is a button</Button>
      <IconButton>
        <RefreshIcon />
      </IconButton>
    </>
  );
};

export const Variants = () => {
  return (
    <div
      css={css`
        display: flex;
        gap: 8px;
      `}
    >
      <Button color="primary">Primary</Button>
      <Button color="default">Default</Button>
      <Button color="primary" rounded>
        Primary
      </Button>
      <Button color="default" rounded>
        Default
      </Button>
    </div>
  );
};

export const LinkLike = () => {
  return (
    <>
      <p>
        <LinkButton>Default</LinkButton>
      </p>
      <p>
        <AnchorButton href="https://google.com" blank>
          Open Google in a new tab
        </AnchorButton>
      </p>
    </>
  );
};
