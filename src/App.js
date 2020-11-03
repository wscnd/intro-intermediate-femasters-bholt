import { Router } from "@reach/router";
import React from "react";
import { Provider } from "react-redux";
import NavBar from "~/components/NavBar";
import store from "~/redux/store/";
import { render } from "react-dom";
import { Home } from "~/pages";
import { Details } from "~/pages";

const App = () => {
  return (
    <React.StrictMode>
      <div>
        <Provider store={store}>
          <NavBar />
          <Router>
            <Home path="/" />
            <Details path="/details/:id" />
          </Router>
        </Provider>
      </div>
    </React.StrictMode>
  );
};

render(<App />, document.getElementById("root"));
