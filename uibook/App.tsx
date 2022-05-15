import React from "react";
import { usePromise } from "../src/usePromise";

function App() {
  const { data } = usePromise<Record<string, () => JSX.Element>>(
    import("../src/Button.story")
  );

  return (
    <>
      <div className="App">UIBook</div>

      {data &&
        Object.keys(data).map((key) => (
          <div key={key}>
            <h2>{key}</h2>
            {data[key]()}
          </div>
        ))}
    </>
  );
}

export default App;
