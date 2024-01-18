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

export const actionGroup = style([flexAlignCenter, { gap: 10 }]);

export const tutorialButton = style([
  typography.$semantic.body2Regular,
  flexAlignCenter,
  border.all,
  {
    backgroundColor: color.$scale.grey00,
    borderRadius: "8px",
    padding: 15,
    height: 36,
    color: color.$scale.grey700,
    transition: "border 0.2s ease",
    ":hover": {
      border: `1px solid ${color.$scale.grey600}`,
    },
  },
]);
