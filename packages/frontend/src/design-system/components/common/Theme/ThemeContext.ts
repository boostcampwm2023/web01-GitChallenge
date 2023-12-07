import { createContext } from "react";
import * as React from "react";

import useTheme from "../../../../hooks/useTheme";

export type ThemeContextType = ReturnType<typeof useTheme>;

const initialContext: ThemeContextType = {
  colorTheme: "light",
  setColorTheme: () => {},
};

export const ThemeContext = createContext<ThemeContextType>(initialContext);

ThemeContext.displayName = "ThemeContext";

export function useThemeContext(): ThemeContextType {
  return React.useContext(ThemeContext);
}
