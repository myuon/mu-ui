import { Progress } from "./Progress";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

export const Basic = () => {
  const [value, setValue] = useState(0.5);

  useEffect(() => {
    const timer = setInterval(() => {
      setValue((p) => (p >= 1.0 ? 0.0 : p + 0.2));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return <Progress progress={value} />;
};
