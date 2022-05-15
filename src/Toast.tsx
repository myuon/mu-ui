import { DotSpinner } from "@uiball/loaders";
import { css } from "@emotion/react";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { theme } from "./theme";
import CloseIcon from "@mui/icons-material/Close";
import { Progress } from "./Progress";
import { IconButton } from "./Button";
import { Typography } from "./Typography";

export interface ToastOptions {
  timeout?: number;
  loading?: boolean;
  progress?: number;
  width?: number;
}

interface ToastState {
  id: string;
  message: React.ReactNode;
  timer: number | undefined;
  loading?: boolean;
  progress?: number;
  width?: number;
}

interface ToastContextProps {
  toasts: Record<string, ToastState>;
  addToast: (message: React.ReactNode, options?: ToastOptions) => string;
  updateToast: (
    id: string,
    props: {
      message?: React.ReactNode;
    } & ToastOptions
  ) => void;
  removeToast: (id: string) => void;
}

const ToastContext = React.createContext<ToastContextProps | undefined>(
  undefined
);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<Record<string, ToastState>>({});

  const removeToast = useCallback((targetId: string) => {
    setToasts((prev) => {
      const current = { ...prev };
      delete current[targetId];
      return current;
    });
  }, []);

  const updateToast = useCallback(
    (
      id: string,
      { timeout, ...props }: { message: React.ReactNode } & ToastOptions
    ) => {
      setToasts((prev) => {
        const current = { ...prev };
        let target = current[id];
        // This is so awkward
        target = {
          ...props,
          id: target.id,
          timer: target.timer,
        };

        // if timeout is set, reset and start a new timer
        if (timeout) {
          clearTimeout(target.timer as number | undefined);
          target.timer = setTimeout(() => {
            removeToast(id);
          }, timeout);
        }

        current[id] = target;

        return current;
      });
    },
    [removeToast]
  );

  const addToast = useCallback(
    (message: string, options?: ToastOptions) => {
      const id = `toast-${Math.random().toString(36).slice(2, 9)}`;
      const toast = { id, message, timer: undefined, ...options } as ToastState;
      if (options?.timeout) {
        const timer = setTimeout(() => {
          removeToast(id);
        }, options.timeout);
        toast.timer = timer;
      }

      setToasts((prev) => ({
        ...prev,
        [id]: toast,
      }));

      return id;
    },
    [removeToast]
  );

  const value = useMemo(
    () =>
      ({
        toasts,
        addToast,
        updateToast,
        removeToast,
      } as ToastContextProps),
    [addToast, removeToast, toasts, updateToast]
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        css={css`
          position: fixed;
          top: 16px;
          right: 16px;
          z-index: 10;
          display: grid;

          & > *:not(:first-of-type) {
            margin-top: 8px;
          }
        `}
      >
        {Object.keys(toasts).map((id) => (
          <div
            key={id}
            css={css`
              // align to right
              margin-left: auto;
            `}
          >
            <Toast key={id} {...toasts[id]} />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToasts = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToasts must be used within a ToastProvider");
  }

  return useMemo(
    () => ({
      addToast: ctx.addToast,
      removeToast: ctx.removeToast,
      updateToast: ctx.updateToast,
    }),
    [ctx.addToast, ctx.removeToast, ctx.updateToast]
  );
};

export const Toast = ({
  id,
  message,
  disableAnimation = false,
  loading = false,
  progress,
  width,
}: {
  id: string;
  message: React.ReactNode;
  disableAnimation?: boolean;
  loading?: boolean;
  progress?: number;
  width?: number;
}) => {
  const { removeToast } = useToasts();
  // for animation
  const [show, setShow] = useState(disableAnimation ? true : false);
  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <div
      data-show={show}
      css={[
        css`
          max-width: 350px;
          color: white;
          background-color: ${theme.palette.primary.main};
          border-radius: 4px;
          box-shadow: ${theme.primaryShadow[5]};
        `,
        css`
          transition: all 0.12s ease-in-out;

          &[data-show="false"] {
            transform: translateX(100%);
          }
        `,
        width && { width },
      ]}
    >
      <div
        css={css`
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 16px;
          align-items: center;
          padding: 12px 16px;
        `}
      >
        <div>
          <Typography
            css={css`
              display: -webkit-box;
              overflow: hidden;
              text-overflow: clip;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;

              a {
                color: white;
              }
            `}
          >
            {message}
          </Typography>
        </div>
        {loading ? (
          <DotSpinner
            size={theme.typography.body.fontSize * 1.3}
            speed={0.9}
            color="white"
          />
        ) : (
          <IconButton
            onClick={() => {
              removeToast(id);
            }}
            css={css`
              display: grid;
              place-items: center;
            `}
          >
            <CloseIcon
              css={css`
                color: white;
              `}
            />
          </IconButton>
        )}
      </div>
      {progress !== undefined && <Progress progress={progress} />}
    </div>
  );
};
