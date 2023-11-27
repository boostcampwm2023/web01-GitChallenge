import { style } from "@vanilla-extract/css";

import { flex } from "../../../tokens/utils.css";

export const button = style([
  flex,
  {
    padding: 0,
    backgroundColor: "transparent",
    border: "none",
  },
]);
