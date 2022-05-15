import { Toast, ToastProvider, useToasts } from "./Toast";
import React from "react";
import { AnchorButton, Button } from "./Button";
import { css } from "@emotion/react";
import dayjs from "dayjs";

const sleep = (ms: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};

const wrapper = (Component: () => JSX.Element) => () => {
  return (
    <ToastProvider>
      <Component />
    </ToastProvider>
  );
};

export const Basic = wrapper(() => {
  return <Toast id="" message="Hey!" disableAnimation />;
});

export const Variation = wrapper(() => {
  return (
    <div
      css={css`
        display: grid;
        gap: 16px;
      `}
    >
      <Toast
        id=""
        message="「今は昔、竹取の翁（おきな）といふものありけり。 野山にまじりて竹を取りつつ、よろづのことに使ひけり。 名をば、さぬきの造（みやつこ）となむいひける。 その竹の中に、もと光る竹なむ一筋（ひとすぢ）ありける。"
        disableAnimation
      />
      <Toast
        id=""
        message="こんにちは これはトーストのサンプルです。"
        loading
        progress={0.5}
        disableAnimation
      />
      <Toast
        id=""
        message={
          <>
            <AnchorButton
              href="https://example.com"
              css={css`
                color: inherit;
              `}
            >
              https://example.com
            </AnchorButton>
            へのリンク
          </>
        }
        disableAnimation
      />
    </div>
  );
});

export const AddToast = wrapper(() => {
  const { addToast, updateToast } = useToasts();

  return (
    <div
      css={css`
        display: flex;
        gap: 8px;
      `}
    >
      <Button
        onClick={() => {
          addToast(`Hi! ${dayjs().format("HH:mm:ss")}`);
        }}
      >
        Add Toast
      </Button>

      <Button
        onClick={() => {
          addToast(
            "「今は昔、竹取の翁（おきな）といふものありけり。 野山にまじりて竹を取りつつ、よろづのことに使ひけり。 名をば、さぬきの造（みやつこ）となむいひける。 その竹の中に、もと光る竹なむ一筋（ひとすぢ）ありける。"
          );
        }}
      >
        Add Toast with Looooooong text
      </Button>

      <Button
        onClick={async () => {
          const id = addToast(`Starting a job... [1/3]`, {
            width: 350,
            loading: true,
            progress: 0,
          });

          await sleep(3000);

          updateToast(id, {
            message: `Doing the job... [2/3]`,
            width: 350,
            loading: true,
            progress: 0.33,
          });

          await sleep(3000);

          updateToast(id, {
            message: `Doing the job... [3/3]`,
            width: 350,
            loading: true,
            progress: 0.66,
          });

          await sleep(3000);

          updateToast(id, {
            message: `Finishing the job...`,
            width: 350,
            loading: true,
            progress: 1.0,
          });

          await sleep(3000);

          updateToast(id, {
            message: `Done!`,
            loading: false,
            progress: undefined,
          });
        }}
      >
        Add Toast with timeout
      </Button>
    </div>
  );
});
