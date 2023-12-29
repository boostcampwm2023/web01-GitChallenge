import { style } from "@vanilla-extract/css";

import color from "../../../tokens/color";
import typography from "../../../tokens/typography";
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

export const actionGroup = style([flexAlignCenter, { gap: 4 }]);

export const tutorialButton = style([
  typography.$semantic.body2Regular,
  {
    border: 0,
    backgroundColor: "transparent",
    color: color.$scale.grey700,
  },
]);
