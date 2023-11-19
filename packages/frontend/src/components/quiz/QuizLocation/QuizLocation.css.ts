import { style } from "@vanilla-extract/css";

import color from "../../../design-system/tokens/color";
import typography from "../../../design-system/tokens/typography";
import * as utils from "../../../design-system/tokens/utils.css";

export const list = style([
  typography.$semantic.caption1Regular,
  utils.flex,
  {
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 15,
    color: color.$scale.grey700,
  },
]);

export const icon = style({
  padding: "0 4px",
});
