import { style } from "@vanilla-extract/css";

import * as utils from "../../../tokens/utils.css";

export const button = style([
  utils.flex,
  {
    padding: 0,
    backgroundColor: "transparent",
    border: "none",
  },
]);
