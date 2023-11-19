import { style, styleVariants } from "@vanilla-extract/css";

import color from "../../../styles/color";

export const displayBlock = style({
  display: "block",
});

export const iconBaseStyle = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: 22,
  height: 22,
  color: color.$semantic.textWhite,
  borderRadius: "50%",
});

export const iconVariantStyle = styleVariants({
  success: { backgroundColor: color.$semantic.success },
  error: { backgroundColor: color.$semantic.danger },
});
