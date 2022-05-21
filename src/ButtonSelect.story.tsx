import { ButtonSelect } from "./ButtonSelect";
import React, { useState } from "react";
import { css } from "@emotion/react";

export const Basic = () => {
  const [current, setCurrent] = useState<string>();

  return (
    <>
      <div
        css={css`
          margin-bottom: 16px;
        `}
      >
        <ButtonSelect
          rounded
          options={[
            { label: "Option 1", value: "option-1" },
            { label: "Option 2", value: "option-2" },
            { label: "Option 3", value: "option-3" },
          ]}
          onChange={setCurrent}
        />
      </div>
      Clicked: {current}
    </>
  );
};
