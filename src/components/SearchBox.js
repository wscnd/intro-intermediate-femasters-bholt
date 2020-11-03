import React from "react";

const SearchBox = ({
  children,
  className,
  buttonName,
  theme,
  ...formActions
}) => {
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
