import React, { useContext } from "react";
import ThemeContext from "~/context/ThemeContext";

const colors = [
  {
    label: "Default",
    value: "",
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

const ThemeDropdown = () => {
  const [theme, setTheme] = useContext(ThemeContext);
  return (
    <label htmlFor="theme">
      Theme
      <div className="select-container">
        <select
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
