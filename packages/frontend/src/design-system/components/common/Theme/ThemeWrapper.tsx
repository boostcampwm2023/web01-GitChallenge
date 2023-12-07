import { ReactElement } from "react";

import useTheme from "../../../../hooks/useTheme";

import { ThemeContext } from "./ThemeContext";

interface ThemeWrapperProps {
  children: ReactElement;
}

export default function ThemeWrapper({ children }: ThemeWrapperProps) {
  const theme = useTheme();

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
}
