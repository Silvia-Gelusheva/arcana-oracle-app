import { createContext } from "react";

const ThemeContext = createContext(null);
export const useTheme = () => useContext(ThemeContext);
