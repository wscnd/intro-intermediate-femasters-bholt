import { Router } from "@reach/router";
import React, { useState } from "react";
import { render } from "react-dom";
import ThemeContext from "~/context/ThemeContext";
import { Details, Home } from "~/pages/";
import NavBar from "./components/NavBar";

const App = () => {
  const theme = useState("darkblue");

  return (
    <ThemeContext.Provider value={theme}>
      <React.StrictMode>
        <div>
          <NavBar />
          <Router>
            <Home path="/" />
            <Details path="/details/:id" />
          </Router>
        </div>
      </React.StrictMode>
    </ThemeContext.Provider>
  );
};

render(<App />, document.getElementById("root"));
