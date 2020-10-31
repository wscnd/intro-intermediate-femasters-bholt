import React, { useState } from "react";
import StateContext from "~/context/StateContext";
import DisplayFilters from "./components/DisplayFilters";
import DisplayResults from "./components/DisplayResults";

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
      <StateContext.Provider value={{ states }}>
        <DisplayFilters />
        <DisplayResults />
      </StateContext.Provider>
    </>
  );
};

export default Home;
