import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { createContext, useContext, useMemo, useState } from "react";

const ThemeContext = createContext(null);
export const useTheme = () => useContext(ThemeContext);
const colors = {
  light: {
    ...DefaultTheme,
    dark: false,
    colors: {
      ...DefaultTheme.colors,
      background: "#f8f8f8",
      card: "#E0C9B2",
      text: "#0b132b",
      primary: "#f3c36b",
      border: "#b87333",
      notification: "#b87333",
    },
    app: {
      background: "#f8f8f8",
      cardBackground: "#fff8e7",
      buttonPrimary: "#f3c36b",
      buttonSecondary: "#e0c097",
      text: "#0b132b",
      textSecondary: "#431375",
      accent: "#b87333",
      border: "#b87333",
      placeholder: "#999999",
      fontFamily: "CinzelDecorative_700Bold",
    },
  },
  dark: {
    ...DarkTheme,
    dark: true,
    colors: {
      ...DarkTheme.colors,
      background: "#0b132b",
      card: "#262d50",
      text: "#e0c097",
      primary: "#b87333",
      border: "#b87333",
      notification: "#b87333",
    },
    app: {
      background: "#0b132b",
      cardBackground: "#262d50",
      buttonPrimary: "#b87333",
      buttonSecondary: "#1c2541",
      text: "#e0c097",
      textSecondary: "#f0e6ff",
      accent: "#b87333",
      border: "#b87333",
      placeholder: "#ccc",
      fontFamily: "CinzelDecorative_700Bold",
    },
  },
};

export default function ThemeProvider({ children }) {
  const [themeName, setThemeName] = useState("light");
  const theme = colors[themeName];

  const toggleTheme = () => {
    setThemeName(themeName === "light" ? "dark" : "light");
  };

  const navTheme = useMemo(() => {
    return {
      ...theme,
      colors: {
        ...theme.colors,
        background: theme.app.background,
        card: theme.app.cardBackground,
        text: theme.app.text,
        primary: theme.app.accent,
        border: theme.app.border,
        notification: theme.app.accent,
      },
      fonts: theme.fonts,
    };
  }, [themeName]);

  return (
    <ThemeContext.Provider
      value={{ themeName, theme: theme.app, toggleTheme, navTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
