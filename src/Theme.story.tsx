import { Global } from "@emotion/react";
import React, { useState } from "react";
import { ButtonSelect } from "./ButtonSelect";
import { createMuUiStyles } from "./theme";

export const Basic = () => {
  const [theme, setTheme] = useState<"default" | "rose">("default");

  return (
    <>
      <Global
        styles={
          theme === "default"
            ? undefined
            : theme === "rose"
            ? {
                body: createMuUiStyles({
                  palette: {
                    primary: {
                      main: "#e11d48",
                      dark: "#be123c",
                    },
                  },
                }),
              }
            : undefined
        }
      />
      <ButtonSelect
        options={[
          { label: "Default", value: "default" },
          { label: "Rose", value: "rose" },
        ]}
        defaultValue={theme}
        onChange={(value) => setTheme(value as typeof theme)}
      />
    </>
  );
};
