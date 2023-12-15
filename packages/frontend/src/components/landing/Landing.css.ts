import { style } from "@vanilla-extract/css";

import color from "../../design-system/tokens/color";
import {
  border,
  flexAlignCenter,
  flexColumn,
  widthFull,
} from "../../design-system/tokens/utils.css";

export const container = style([
  widthFull,
  border.verticalSide,
  flexColumn,
  flexAlignCenter,
]);
export const sectionWrapper = style([
  {
    width: "80%",
    color: color.$scale.grey800,
    paddingBottom: 60,
  },
]);
