import React, { useState } from "react";
import StateContext from "~/context/StateContext";
import DisplayFilters from "./components/DisplayFilters";
import DisplayResults from "./components/DisplayResults";
import store from "~/redux/store/";
import { Provider } from "react-redux";

const Home = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(false);

  const states = {
    getters: {
      pets,
      loading,
    },
    setters: {
      setPets,
      setLoading,
    },
  };

  return (
    <>
      <Provider store={store}>
        <StateContext.Provider value={{ states }}>
          <DisplayFilters />
          <DisplayResults />
        </StateContext.Provider>
      </Provider>
    </>
  );
};

export default Home;
