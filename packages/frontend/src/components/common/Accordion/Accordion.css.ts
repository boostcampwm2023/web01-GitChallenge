import { style } from "@vanilla-extract/css";

import color from "../../../styles/color";
import typography from "../../../styles/typography";

export const summaryStyle = style([
  typography.$semantic.title2Bold,
  {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 13,
    paddingBottom: 13,
    color: color.$scale.grey800,
    cursor: "pointer",
  },
]);

export const listStyle = style([
  typography.$semantic.title3Regular,
  {
    width: "100%",
    borderTop: `1px solid ${color.$semantic.border}`,
    color: color.$scale.grey600,
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
]);

export const itemStyle = style({
  paddingTop: 13,
});
