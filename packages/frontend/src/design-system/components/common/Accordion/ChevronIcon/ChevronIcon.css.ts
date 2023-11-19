import { style, styleVariants } from "@vanilla-extract/css";

import color from "../../../../tokens/color";
import * as utils from "../../../../tokens/utils.css";

export const containerBase = style([
  utils.flexCenter,
  {
    border: `1px solid ${color.$scale.grey300}`,
    borderRadius: "50%",
  },
]);

export const containerVariants = styleVariants({
  sm: {
    width: 18,
    height: 18,
  },
  md: {
    width: 25,
    height: 25,
  },
});
