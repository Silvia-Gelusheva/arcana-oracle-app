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
      background: "#f2f0f8",
      cardBackground: "#ffffff",
      buttonPrimary: "#d18f6a",
      buttonSecondary: "#b0775a",
      text: "#1a0f2e",
      textSecondary: "#6b5e8c",
      accent: "#d18f6a",
      border: "#cfd6e2",
      placeholder: "#a39fcc",
      fontFamily: "CinzelDecorative_700Bold",
      gradientBackground: ["#f2f0f8", "#e2dff4", "#f2f0f8"],

      // HomeScreen AppCard
      colors: {
        star: "#9f7aea",
        cards: "#7c5fff",
        book: "#6d4cff",
        cart: "#5c6ac4",
        gradients: {
          star: "#f7c8f9",
          cards: "#d0a8f9",
          book: "#b890f9",
          cart: "#9fa8f9",
        },
      },
    },
  },

  dark: {
    ...DarkTheme,
    dark: true,
    colors: { ...DarkTheme.colors },
    app: {
      background: "#120a24",
      cardBackground: "#1e1138",
      buttonPrimary: "#d18f6a",
      buttonSecondary: "#241243",
      text: "#f5f2ff",
      textSecondary: "#b6a9f3",
      accent: "#d18f6a",
      border: "#2e1f55",
      placeholder: "#8578c4",
      fontFamily: "CinzelDecorative_700Bold",
      gradientBackground: ["#1a0f2e", "#2d1554", "#1a0f2e"],

      // HomeScreen AppCard
      colors: {
        star: "#d1a3e8",
        cards: "#c387d6",
        book: "#b46fc2",
        cart: "#9f55a8",
        gradients: {
          star: "#e2b5f0",
          cards: "#d9a8e4",
          book: "#c78dd6",
          cart: "#b470c2",
        },
      },
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
