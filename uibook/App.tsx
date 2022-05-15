import { css } from "@emotion/react";
import React, { useMemo } from "react";
import { usePromise } from "../src/usePromise";
import { Route, Routes, Link, Outlet } from "react-router-dom";
import { ComponentPage } from "./ComponentPage";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { theme } from "../src";

function App() {
  const modules = useMemo(
    () =>
      Promise.all(
        window.modules.map((file) => ({
          file,
          name: file.split("/").pop()?.replace(".story.tsx", ""),
          module: import(/* @vite-ignore */ file) as Promise<
            Record<string, () => JSX.Element>
          >,
        }))
      ),
    []
  );
  const { data } = usePromise(modules);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <header
              css={[
                css`
                  position: sticky;
                  padding: 0 16px;
                `,
                css`
                  background-color: rgba(255, 255, 255, 0.5);
                  border-bottom: 1px solid ${theme.palette.gray[200]};
                  backdrop-filter: blur(10px);
                `,
              ]}
            >
              <div
                css={css`
                  display: flex;
                  justify-content: space-between;
                  max-width: 1080px;
                  margin: 0 auto;
                `}
              >
                <h1
                  css={css`
                    display: flex;
                    gap: 8px;
                    font-size: 20px;
                    color: ${theme.palette.primary.main};
                  `}
                >
                  <MenuBookIcon />
                  UIBook
                </h1>
              </div>
            </header>
            <div
              css={css`
                display: grid;
                grid-template-columns: minmax(200px, auto) 1fr;
                gap: 16px;
                max-width: 1080px;
                margin: 0 auto;
              `}
            >
              <aside>
                <div
                  css={css`
                    display: grid;
                    gap: 4px;
                    margin-top: 16px;
                  `}
                >
                  {data?.map((mod) => {
                    return (
                      <Link
                        key={mod.name}
                        to={`/component/${mod.name}`}
                        state={{ name: mod.name, file: mod.file }}
                        css={css`
                          display: block;
                          padding: 4px 0;
                          color: ${theme.palette.gray[700]};
                          text-decoration: none;
                        `}
                      >
                        {mod.name}
                      </Link>
                    );
                  })}
                </div>
              </aside>
              <main
                css={css`
                  max-width: 1280px;
                  margin: 16px;
                `}
              >
                <Outlet />
              </main>
            </div>
          </>
        }
      >
        <Route path="component/:name" element={<ComponentPage />} />
      </Route>
    </Routes>
  );
}

export default App;
