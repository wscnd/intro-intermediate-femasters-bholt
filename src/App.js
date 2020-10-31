import { Router } from "@reach/router";
import React, { lazy, Suspense, useState } from "react";
import NavBar from "~/components/NavBar";
import ThemeContext from "~/context/ThemeContext";

const Home = lazy(() => import("~/pages/Home/Home"));

const Details = lazy(() => import("~/pages/Details/Details"));

const App = () => {
  const theme = useState("darkblue");

  return (
    <ThemeContext.Provider value={theme}>
      <React.StrictMode>
        <div>
          <NavBar />
          <Suspense fallback={"rednering"}>
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

export default App;
