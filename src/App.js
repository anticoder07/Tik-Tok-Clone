import React, { useContext } from "react";
import { publicRouter } from "./routes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout/DefaultLayout";
import { ThemeContext } from "./layouts/components/Themes/DarkModeTheme";

function App() {
  const context = useContext(ThemeContext);

  return (
    <div className={context.theme}>
      <Router>
        <div className="App">
          <Routes>
            {publicRouter.map((route, index) => {
              const Page = route.component;
              let Layout = DefaultLayout;

              if (route.layout) {
                Layout = route.layout;
              } else if (route.layout === null) {
                // @ts-ignore
                Layout = React.Fragment;
              }

              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
