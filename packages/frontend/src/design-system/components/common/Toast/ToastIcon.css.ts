import { style, styleVariants } from "@vanilla-extract/css";

import color from "../../../tokens/color";

export const iconBase = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: 22,
  height: 22,
  color: color.$semantic.textWhite,
  borderRadius: "50%",
});

export const iconVariants = styleVariants({
  success: { backgroundColor: color.$semantic.success },
  error: { backgroundColor: color.$semantic.danger },
});
