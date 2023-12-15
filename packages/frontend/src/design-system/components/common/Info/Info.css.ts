import { style } from "@vanilla-extract/css";

import color from "../../../tokens/color";
import typography from "../../../tokens/typography";
import { flexAlignCenter } from "../../../tokens/utils.css";

export const container = style([
  flexAlignCenter,
  typography.$semantic.caption1Regular,
  {
    color: color.$scale.grey600,
    gap: 5,
  },
]);
