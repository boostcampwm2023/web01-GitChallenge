import { style } from "@vanilla-extract/css";

import color from "../../../tokens/color";
import { flexAlignCenter, widthMax } from "../../../tokens/utils.css";

export const borderBottom = style({
  borderBottom: `1px solid ${color.$semantic.border}`,
});

export const container = style([
  flexAlignCenter,
  widthMax,
  {
    height: "100%",
    margin: "0 auto",
  },
]);
