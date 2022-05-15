import { css } from "@emotion/react";
import React, { useMemo } from "react";
import { usePromise } from "../src/usePromise";
import {
  Route,
  Routes,
  Link,
  Outlet,
  useLocation,
  Navigate,
} from "react-router-dom";
import { ComponentPage } from "./pages/ComponentPage";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { AnchorButton, theme } from "../src";
import GitHubIcon from "@mui/icons-material/GitHub";
import { WelcomePage } from "./pages/WelcomePage";

function App() {
  const modules = useMemo(() => {
    const modules = import.meta.glob("../src/*.story.tsx");
    return Promise.all(
      Object.keys(modules).map((key) => ({
        file: key,
        name: key.split("/").pop()?.replace(".story.tsx", ""),
        module: modules[key](),
      }))
    );
  }, []);
  const { data } = usePromise(modules);

  const location = useLocation();
  const currentName = (location.state as { name: string } | undefined)?.name;

  if (location.pathname === "/") {
    return <Navigate to="/welcome" />;
  }

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
                  top: 0;
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
                <Link
                  to="/"
                  css={css`
                    text-decoration: none;
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
                </Link>

                <div
                  css={css`
                    display: flex;
                    align-items: center;
                  `}
                >
                  <AnchorButton href="https://github.com/myuon/mu-ui" blank>
                    <GitHubIcon />
                  </AnchorButton>
                </div>
              </div>
            </header>
            <div
              css={css`
                display: grid;
                grid-template-columns: 200px 1fr;
                gap: 16px;
                max-width: 1080px;
                margin: 0 auto;
              `}
            >
              <aside>
                <div
                  css={css`
                    position: fixed;
                    display: grid;
                    gap: 4px;
                    width: 200px;
                    margin-top: 16px;
                  `}
                >
                  {data?.map((mod) => {
                    return (
                      <Link
                        aria-selected={currentName === mod.name}
                        key={mod.name}
                        to={`/component/${mod.name}`}
                        state={{ name: mod.name, file: mod.file }}
                        css={css`
                          display: block;
                          padding: 4px 8px;
                          color: ${theme.palette.gray[700]};
                          text-decoration: none;
                          border-radius: 4px;

                          &[aria-selected="true"] {
                            font-weight: 600;
                            color: ${theme.palette.primary.main};
                          }

                          &:hover {
                            background-color: ${theme.palette.gray[100]};
                          }
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
                  overflow-y: auto;
                `}
              >
                <Outlet />
              </main>
            </div>
          </>
        }
      >
        <Route path="/component/:name" element={<ComponentPage />} />
        <Route path="/welcome" element={<WelcomePage />} />
      </Route>
    </Routes>
  );
}

export default App;
