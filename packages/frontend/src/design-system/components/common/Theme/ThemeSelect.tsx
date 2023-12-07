import type { MouseEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { MdDarkMode, MdLightMode } from "react-icons/md";

import { ESC_KEY } from "../../../../constants/event";

import { useThemeContext } from "./ThemeContext";
import * as styles from "./ThemeSelect.css";

type ColorTheme = "light" | "dark";
type StorageColorTheme = "light" | "dark" | undefined;

function ThemeSelect() {
  const { setColorTheme } = useThemeContext();
  const [storageColorTheme, setStorageColorTheme] =
    useState<ColorTheme>("light");
  const [isOptionListOpen, setIsOptionListOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleOptionClick = (colorTheme: ColorTheme) => () => {
    setStorageColorTheme(colorTheme);
    setColorTheme(colorTheme);
    handleSelectClick();
  };

  const handleSelectClick = () => {
    setIsOptionListOpen((prev) => !prev);
  };

  useEffect(() => {
    const colorTheme = localStorage.getItem("colorTheme") as StorageColorTheme;
    if (!colorTheme) {
      setStorageColorTheme("light");
      return;
    }
    setStorageColorTheme(colorTheme === "light" ? "light" : "dark");
  }, []);

  useEffect(() => {
    const handleClickOutSide = (e: MouseEvent<HTMLElement, MouseEvent>) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setIsOptionListOpen(false);
    };
    const handleEscTyping = (e: KeyboardEvent) => {
      if (e.key === ESC_KEY) setIsOptionListOpen(false);
    };
    document.addEventListener(
      "mousedown",
      handleClickOutSide as unknown as EventListener,
    );
    document.addEventListener("keydown", handleEscTyping);
    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutSide as unknown as EventListener,
      );
      document.removeEventListener("keydown", handleEscTyping);
    };
  }, []);

  return (
    <div ref={ref} className={styles.selectContainer}>
      <button
        type="button"
        className={styles.select}
        onClick={handleSelectClick}
      >
        <div className={styles.selectedItem}>
          {OptionItem[storageColorTheme].render()}
        </div>
        {isOptionListOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </button>
      {isOptionListOpen && (
        <ul className={styles.optionList}>
          {Object.entries(OptionItem).map(([key, value]) => (
            <li key={key} className={styles.option}>
              <button
                type="button"
                className={styles.optionButton}
                onClick={handleOptionClick(key as ColorTheme)}
              >
                {value.render()}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ThemeSelect;

const OptionItem = {
  light: {
    render: () => (
      <>
        <MdLightMode />
        <span>라이트</span>
      </>
    ),
  },
  dark: {
    render: () => (
      <>
        <MdDarkMode />
        <span>다크</span>
      </>
    ),
  },
};
