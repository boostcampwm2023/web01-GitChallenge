import { style, styleVariants } from "@vanilla-extract/css";

import color from "../../../../tokens/color";

export const containerBase = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  border: `1px solid ${color.$scale.grey300}`,
  borderRadius: "50%",
});

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
