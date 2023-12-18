import { useEffect, useMemo, useState } from "react";

export type ColorTheme = "light" | "dark";

export type ThemeContext = {
  colorTheme: ColorTheme | undefined;
  setColorTheme: (theme: ColorTheme) => void;
};

const ColorThemeStorageKey = "colorTheme";

export default function useTheme() {
  const [colorTheme, setColorTheme] = useState<ColorTheme | undefined>(
    undefined,
  );
  const themeContext = useMemo<ThemeContext>(
    () => ({ colorTheme, setColorTheme }),
    [colorTheme],
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const color = localStorage.getItem(ColorThemeStorageKey);
      setColorTheme(color ? (color as ColorTheme) : "light");
    }
  }, []);

  useEffect(() => {
    if (!colorTheme) return;
    document.documentElement.dataset.theme = colorTheme;
    localStorage.setItem(ColorThemeStorageKey, colorTheme);
  }, [colorTheme]);

  return themeContext;
}
