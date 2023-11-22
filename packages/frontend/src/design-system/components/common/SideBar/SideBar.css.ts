import { style } from "@vanilla-extract/css";

import color from "../../../tokens/color";
import typography from "../../../tokens/typography";
import { border, flexAlignCenter, flexColumn } from "../../../tokens/utils.css";

export const olStyle = style([
  flexColumn,
  border.top,
  {
    paddingTop: 10,
    marginTop: 10,
  },
]);

export const liStyle = style({
  height: 40,
  selectors: {
    "&:hover": {
      borderRadius: 8,
      backgroundColor: color.$scale.grey50,
    },
  },
});

export const aStyle = style([
  typography.$semantic.title4Regular,
  flexAlignCenter,
  {
    width: "100%",
    height: "100%",
    paddingLeft: 15,
    color: color.$scale.grey600,
    textDecoration: "none",
  },
]);
