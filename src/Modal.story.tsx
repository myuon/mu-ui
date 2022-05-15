import { Button } from "./Button";
import { Modal, useModal } from "./Modal";
import React from "react";
import { css } from "@emotion/react";

export const Basic = () => {
  const { openModal, ...modal } = useModal({ closeOnClickOutside: true });

  return (
    <>
      <Button
        onClick={() => {
          openModal();
        }}
      >
        Open Modal
      </Button>

      <Modal {...modal}>
        <div
          css={css`
            display: grid;
            gap: 8px;
          `}
        >
          <h3>This is a Modal</h3>

          <p>Here is a information for you. Are you sure?</p>
        </div>
      </Modal>
    </>
  );
};
