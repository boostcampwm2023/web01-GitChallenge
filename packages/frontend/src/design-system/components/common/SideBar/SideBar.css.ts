import { style } from "@vanilla-extract/css";

import color from "../../../tokens/color";
import typography from "../../../tokens/typography";
import { border, flexAlignCenter, flexColumn } from "../../../tokens/utils.css";

export const linkContainerStyle = style([
  flexColumn,
  border.top,
  {
    paddingTop: 10,
    marginTop: 10,
  },
]);

export const linkItemStyle = style({
  height: 40,
  selectors: {
    "&:hover": {
      borderRadius: 8,
      backgroundColor: color.$semantic.bgAlt,
    },
  },
});

export const baseLinkStyle = style([
  flexAlignCenter,
  typography.$semantic.title4Regular,
  { width: "100%", height: "100%", paddingLeft: 15, textDecoration: "none" },
]);

export const currentLinkStyle = style([
  baseLinkStyle,
  {
    color: color.$scale.grey900,
  },
]);

export const linkStyle = style([
  baseLinkStyle,
  {
    color: color.$scale.grey600,
  },
]);
