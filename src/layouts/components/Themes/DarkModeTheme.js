import React, { useState } from "react";

const ThemeContext = React.createContext(null);

function DarkModeTheme({ children }) {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "" : "dark");
  };

  const value = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export { DarkModeTheme, ThemeContext };
