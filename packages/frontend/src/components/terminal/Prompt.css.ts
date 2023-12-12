import { style } from "@vanilla-extract/css";

import color from "../../design-system/tokens/color";

export const prompt = style({
  color: color.$semantic.primary,
  fontWeight: 700,
  paddingRight: 7,
});

export const username = style({
  paddingRight: 4,
});

export const gitRef = style({
  paddingRight: 4,
  color: color.$semantic.secondary,
});
