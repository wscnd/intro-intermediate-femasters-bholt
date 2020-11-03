import React from "react";

const colors = [
  {
    label: "Default",
    value: "#ad343e",
  },
  {
    label: "Peru",
    value: "peru",
  },
  {
    label: "Medium Orchid",
    value: "mediumorchid",
  },
  {
    label: "Darkblue",
    value: "darkblue",
  },
  {
    label: "Chartreuse",
    value: "chartreuse",
  },
];

const ThemeDropdown = ({ theme, setTheme }) => {
  return (
    <label htmlFor="theme">
      Theme
      <div className="select-container">
        <select
          data-testid={"use-dropdown-theme"}
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          onBlur={(e) => setTheme(e.target.value)}
        >
          {colors.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
    </label>
  );
};

export default ThemeDropdown;
