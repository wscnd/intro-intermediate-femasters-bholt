import React, { useState, lazy, Suspense } from "react";
import { Router } from "@reach/router";
import { render } from "react-dom";
import ThemeContext from "~/context/ThemeContext";
import NavBar from "./components/NavBar";
import Spinner from "./components/Spinner";
import colors from "~/pages/style";

const Details = lazy(() =>
  import("~/pages/").then((module) => ({ default: module.Details }))
);

const Home = lazy(() =>
  import("~/pages/").then((module) => ({ default: module.Home }))
);

const App = () => {
  const theme = useState("darkblue");

  return (
    <ThemeContext.Provider value={theme}>
      <React.StrictMode>
        <div>
          <NavBar />
          <Suspense fallback={<Spinner size={50} color={colors.primary} />}>
            <Router>
              <Home path="/" />
              <Details path="/details/:id" />
            </Router>
          </Suspense>
        </div>
      </React.StrictMode>
    </ThemeContext.Provider>
  );
};

render(<App />, document.getElementById("root"));
