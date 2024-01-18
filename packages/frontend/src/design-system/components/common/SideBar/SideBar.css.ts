import { globalStyle, style } from "@vanilla-extract/css";

import color from "../../../tokens/color";
import typography from "../../../tokens/typography";
import {
  border,
  flexAlignCenter,
  flexColumn,
  scrollBarHidden,
} from "../../../tokens/utils.css";

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
  {
    width: "100%",
    height: "100%",
    paddingLeft: 15,
    textDecoration: "none",
    gap: 2,
  },
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

export const checkIcon = style({
  color: color.$semantic.success,
});

export const navigation = style([
  flexColumn,
  scrollBarHidden,
  {
    maxHeight: "80vh",
    gap: 24,
  },
]);

export const resetButton = style([
  typography.$semantic.caption1Regular,
  {
    width: 200,
    backgroundColor: "transparent",
    color: color.$scale.grey800,
    border: "none",
    position: "relative",
    display: "flex",
    alignItems: "center",
    borderTop: `1px solid ${color.$scale.grey300}`,
    paddingTop: 10,
    paddingLeft: 20,
    gap: 5,
  },
]);

globalStyle(`${resetButton} > svg`, {
  position: "absolute",
  left: 0,
  top: 12.5,
});
