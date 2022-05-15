import { Typography } from "./Typography";
import React from "react";

export const Basic = () => {
  return <Typography>Windowsでコンピューターの世界が広がります</Typography>;
};

export const Variants = () => {
  return (
    <>
      <Typography variant="h1">
        Windowsでコンピューターの世界が広がります
      </Typography>
      <Typography variant="h2">
        Windowsでコンピューターの世界が広がります
      </Typography>
      <Typography variant="h3">
        Windowsでコンピューターの世界が広がります
      </Typography>
      <Typography variant="h4">
        Windowsでコンピューターの世界が広がります
      </Typography>
      <Typography variant="body">
        Windowsでコンピューターの世界が広がります
      </Typography>
      <Typography variant="button">
        Windowsでコンピューターの世界が広がります
      </Typography>
      <p>
        <Typography variant="caption">
          Windowsでコンピューターの世界が広がります
        </Typography>
      </p>
    </>
  );
};
