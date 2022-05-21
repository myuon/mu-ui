import { useState } from "react";
import { Button } from "./Button";
import React from "react";
import { css } from "@emotion/react";

export interface ButtonSelectProps {
  options: { label: string; value: string }[];
  rounded?: boolean;
  defaultValue?: string;
  onChange?: (value: string) => void;
}

export const ButtonSelect = ({
  options,
  rounded,
  defaultValue,
  onChange,
}: ButtonSelectProps) => {
  const [selected, setSelected] = useState<string | undefined>(defaultValue);
  const handleChange = (value: string) => {
    onChange?.(value);
    setSelected(value);
  };

  return (
    <div
      css={css`
        display: flex;
        gap: 8px;
      `}
    >
      {options.map((option, index) => (
        <Button
          key={index}
          color={option.value === selected ? "primary" : "default"}
          onClick={() => handleChange(option.value)}
          rounded={rounded}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
};
