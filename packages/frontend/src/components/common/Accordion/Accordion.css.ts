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

export const list = style([
  typography.$semantic.title3Regular,
  {
    width: "100%",
    marginTop: 13,
    borderTop: `1px solid ${color.$semantic.border}`,
    padding: "13px 0",
    color: color.$scale.grey600,
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
]);

export const item = style({
  selectors: {
    "& ~ &": {
      paddingTop: 13,
    },
  },
});
