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
      background: "#f2e0dc",
      cardBackground: "#fff6f6",
      buttonPrimary: "#d49fb4",
      buttonSecondary: "#c4879e",
      accent: "#d49fb4",
      accentAlt: "#5d6c8c",
      buttonAlt: "#5d6c8c",
      text: "#241a2b",
      textSecondary: "#5d5060",
      border: "#e6d7d9",
      placeholder: "#bfa8b4",
      fontFamily: "CinzelDecorative_700Bold",
      gradientBackground: ["#f2e0dc", "#f7ebea", "#f2e0dc"],
      colors: {
        star: "#b86f87",
        starFill: "#d49fb4",
        cards: "#4a5b82",
        cardsFill: "#5d6c8c",
        book: "#b18597",
        bookFill: "#c4879e",
        cart: "#6c5f81",
        cartFill: "#8c7a9c",
        gradients: {
          star: "#f7e4eb",
          cards: "#e0e3f2",
          book: "#edd7df",
          cart: "#cfd4e6",
        },
      },
    },
  },

  dark: {
    ...DarkTheme,
    dark: true,
    colors: { ...DarkTheme.colors },
    app: {
      background: "#090a0d",
      cardBackground: "#151626",
      buttonPrimary: "#d49fb4",
      buttonSecondary: "#c4879e",
      accent: "#d49fb4",
      accentAlt: "#5d6c8c",
      buttonAlt: "#5d6c8c",
      text: "#f2e0dc",
      textSecondary: "#b8a8b3",
      border: "#1f2135",
      placeholder: "#7c7f9a",
      fontFamily: "CinzelDecorative_700Bold",
      gradientBackground: ["#090a0d", "#151626", "#090a0d"],
      colors: {
    
        star: "#b86f87",     
        starFill: "#d9bacb",  
        cards: "#5d6c8c",
        cardsFill: "#caa9bc",
        book: "#7a89a8",
        bookFill: "#5d6c8c",
        cart: "#6e7fa0",
        cartFill: "#7a89a8",
        gradients: {
          star: "#d9bacb",
          cards: "#b998ab",
          book: "#5d6c8c",
          cart: "#6e7fa0",
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
      fonts: {
        regular: theme.app.fontFamily,
        medium: theme.app.fontFamily,
        light: theme.app.fontFamily,
        thin: theme.app.fontFamily,
      },
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
