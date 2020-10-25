import React from "react";
import { render } from "react-dom";
import SearchParams from "./SearchParam";

const App = () => {
  return (
    <div>
      <div></div>
      <h1 id="something-important">Adopt Me!</h1>
      <SearchParams />
    </div>
  );
};

render(<App />, document.getElementById("root"));
