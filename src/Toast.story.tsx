import { Toast, ToastProvider } from "./Toast";
import React from "react";
import { AnchorButton } from "./Button";
import { css } from "@emotion/react";

export const Basic = () => {
  return (
    <ToastProvider>
      <Toast id="" message="Hey!" disableAnimation />
    </ToastProvider>
  );
};

export const Variation = () => {
  return (
    <ToastProvider>
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
    </ToastProvider>
  );
};
