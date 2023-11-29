import { style } from "@vanilla-extract/css";

import { border, flex, widthFull } from "../../design-system/tokens/utils.css";

export const mainContainer = style([widthFull]);

export const topContainer = style([flex, border.verticalSide]);

export const buttonGroup = style([
  flex,
  {
    justifyContent: "space-between",
  },
]);
