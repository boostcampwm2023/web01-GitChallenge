import { style } from "@vanilla-extract/css";

import color from "../../../tokens/color";
import { border, flexAlignCenter, widthMax } from "../../../tokens/utils.css";

export const borderBottom = border.bottom;

export const container = style([
  flexAlignCenter,
  widthMax,
  {
    height: "100%",
    justifyContent: "space-between",
    margin: "0 auto",
    backgroundColor: color.$semantic.bgDefault,
  },
]);
