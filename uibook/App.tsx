import React, { useMemo } from "react";
import { usePromise } from "../src/usePromise";

function App() {
  const { data } = usePromise<Record<string, () => JSX.Element>[]>(
    useMemo(
      () =>
        Promise.all([
          import("../src/Button.story"),
          import("../src/TextField.story"),
        ]),
      []
    )
  );

  return (
    <>
      <div className="App">UIBook</div>

      {data &&
        data.map((mod) =>
          Object.keys(mod).map((key) => (
            <div key={key}>
              <h2>{key}</h2>
              {mod[key]()}
            </div>
          ))
        )}
    </>
  );
}

export default App;
