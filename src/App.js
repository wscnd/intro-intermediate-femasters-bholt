import { Router } from "@reach/router";
import React, { lazy, Suspense } from "react";
import NavBar from "~/components/NavBar";
import store from "~/redux/store/";
import { Provider } from "react-redux";
import Spinner from "~/components/Spinner";

const Details = lazy(() => import("~/pages/Details/Details"));
const Home = lazy(() => import("~/pages/Home/Home"));
const App = () => {
  return (
    <React.StrictMode>
      <div>
        <Provider store={store}>
          <NavBar />
          <Suspense
            fallback={<Spinner size={50} color={store.getState().theme} />}
          >
            <Router>
              <Home path="/" />
              <Details path="/details/:id" />
            </Router>
          </Suspense>
        </Provider>
      </div>
    </React.StrictMode>
  );
};

export default App;
