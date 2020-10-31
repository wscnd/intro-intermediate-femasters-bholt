import React, { useContext } from "react";
import ThemeContext from "~/context/ThemeContext";

const SearchBox = ({ children, className, buttonName, ...formActions }) => {
  const [theme] = useContext(ThemeContext);
  return (
    <div className={className}>
      <form {...formActions}>
        {children}
        <button style={{ backgroundColor: theme }}>{buttonName}</button>
      </form>
    </div>
  );
};

export default SearchBox;
