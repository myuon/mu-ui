import { useEffect, useState } from "react";

export const usePromise = <T>(promise: Promise<T>) => {
  const [data, setData] = useState<T>();
  const [error, setError] = useState();

  useEffect(() => {
    promise.then((result) => setData(result)).catch((err) => setError(err));
  }, [promise]);

  return {
    data,
    error,
  };
};
