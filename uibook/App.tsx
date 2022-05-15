import React, { useMemo } from "react";
import { usePromise } from "../src/usePromise";

function App() {
  const modules = useMemo(
    () =>
      Promise.all(
        window.modules.map((file) => import(/* @vite-ignore */ file))
      ),
    []
  );
  const { data } = usePromise<Record<string, () => JSX.Element>[]>(modules);

  return (
    <>
      <div className="App">UIBook</div>

      {data &&
        data.map((mod) =>
          Object.keys(mod).map((key) => {
            const Component = mod[key];

            return (
              <div key={key}>
                <h2>{key}</h2>
                <Component />
              </div>
            );
          })
        )}
    </>
  );
}

export default App;
