import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { setBackgroundColorAsync } from "expo-system-ui";
import { useColorScheme } from "react-native";

const ThemeContext = createContext(null);
export const useTheme = () => useContext(ThemeContext);

const colors = {
  light: {
    ...DefaultTheme,
    dark: false,
    colors: { ...DefaultTheme.colors },
    app: {
      background: "#eef1f6",
      cardBackground: "#f7f9fc",
      buttonPrimary: "#5c6ac4",
      buttonSecondary: "#d8dde6",
      text: "#1a1f2e",
      textSecondary: "#5f6b85",
      accent: "#6d7ae0",
      border: "#cfd6e2",
      placeholder: "#8b94a8",
      fontFamily: "CinzelDecorative_700Bold",
      gradientBackground: ["#eef1f6", "#e2e8f4", "#eef1f6"],
    },
  },
  dark: {
    ...DarkTheme,
    dark: true,
    colors: { ...DarkTheme.colors },
    app: {
      background: "#0b1120",
      cardBackground: "#1b2338",
      buttonPrimary: "#7c8cff",
      buttonSecondary: "#1e263d",
      text: "#e4e8f5",
      textSecondary: "#a5b0d6",
      accent: "#8f9dff",
      border: "#2a334a",
      placeholder: "#6b7285",
      fontFamily: "CinzelDecorative_700Bold",
      gradientBackground: ["#0b1120", "#1a1f35", "#0b1120"],
    },
  },
};

export default function ThemeProvider({ children }) {
  const systemScheme = useColorScheme();
  const [themeName, setThemeName] = useState(systemScheme || "light");
  const theme = colors[themeName];

  useEffect(() => {
    setBackgroundColorAsync(theme.app.background);
    if (typeof document !== "undefined") {
      document.body.style.backgroundColor = theme.app.background;
    }
  }, [themeName]);

  const toggleTheme = () => {
    setThemeName((prev) => (prev === "light" ? "dark" : "light"));
  };

  const navTheme = useMemo(
    () => ({
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
    }),
    [themeName],
  );

  return (
    <ThemeContext.Provider
      value={{ themeName, theme: theme.app, toggleTheme, navTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
