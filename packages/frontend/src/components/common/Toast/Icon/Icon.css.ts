import { style, styleVariants } from "@vanilla-extract/css";

import color from "../../../../styles/color";

export const displayBlock = style({
  display: "block",
});

export const iconBaseStyle = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: 22,
  height: 22,
  color: color.$scale.grey00,
  borderRadius: "50%",
});

export const iconStyle = styleVariants({
  success: { backgroundColor: "#1F8CE6" },
  error: { backgroundColor: color.$scale.coral900 },
});
