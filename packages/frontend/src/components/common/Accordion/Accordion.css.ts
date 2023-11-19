import { style, styleVariants } from "@vanilla-extract/css";

import color from "../../../styles/color";
import typography from "../../../styles/typography";

export const summaryText = {
  sm: typography.$semantic.caption1Regular,
  md: typography.$semantic.title2Bold,
};

export const summaryColor = styleVariants({
  black: {
    color: color.$scale.grey800,
  },
  grey: {
    color: color.$scale.grey500,
  },
});

const summaryContainerBase = style({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  cursor: "pointer",
});

export const summaryContainer = styleVariants({
  sm: [
    summaryContainerBase,
    {
      gap: 5,
    },
  ],
  md: [
    summaryContainerBase,
    {
      gap: 13,
    },
  ],
});
