import { css } from "@emotion/react";
import React, { useMemo, useState } from "react";
import { theme } from "./theme";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "./Button";
import { useClickOutside } from "./useClickOutside";
import ReactDOM from "react-dom";

export const useModal = (options?: {
  closeOnClickOutside?: boolean;
  disableOnClose?: boolean;
}) => {
  const [open, setOpen] = useState(false);

  return useMemo(
    () => ({
      open,
      openModal: () => setOpen(true),
      onClose: options?.disableOnClose ? undefined : () => setOpen(false),
      onClickOutside: options?.closeOnClickOutside
        ? () => setOpen(false)
        : undefined,
    }),
    [open, options?.closeOnClickOutside, options?.disableOnClose]
  );
};

export interface ModalProps {
  open?: boolean;
  onClose?: () => void;
  onClickOutside?: () => void;
  children: React.ReactNode;
}

export const Modal = ({
  open,
  onClose,
  onClickOutside,
  children,
}: ModalProps) => {
  const ref = useClickOutside<HTMLDivElement>(onClickOutside);

  let portal = document.getElementById("portal");
  if (!portal) {
    const div = document.createElement("div");
    div.setAttribute("id", "portal");

    document.body.append(div);
    portal = div;
  }

  return ReactDOM.createPortal(
    <div
      css={[
        theme.glass,
        css`
          position: fixed;
          top: 0;
          left: 0;
          z-index: 10;
          display: grid;
          place-items: center;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.15);
        `,
        !open &&
          css`
            display: none;
          `,
      ]}
    >
      <div
        ref={ref}
        css={[
          css`
            display: grid;
            background-color: white;
            border-radius: 4px;
            box-shadow: ${theme.shadow[5]};
          `,
        ]}
      >
        {onClose && (
          <div
            css={css`
              display: flex;
              justify-content: flex-end;
            `}
          >
            <IconButton>
              <CloseIcon
                onClick={() => {
                  onClose?.();
                }}
              />
            </IconButton>
          </div>
        )}
        <div
          css={
            onClose !== undefined &&
            css`
              margin: 16px 24px;
              margin-top: 0;
            `
          }
        >
          {children}
        </div>
      </div>
    </div>,
    portal
  );
};
