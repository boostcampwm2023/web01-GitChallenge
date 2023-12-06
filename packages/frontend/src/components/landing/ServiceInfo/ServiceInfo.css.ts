import { globalStyle, style } from "@vanilla-extract/css";

import color from "../../../design-system/tokens/color";
import typography from "../../../design-system/tokens/typography";
import {
  border,
  flexAlignCenter,
  flexColumn,
  widthFull,
} from "../../../design-system/tokens/utils.css";

export const container = style([
  widthFull,
  border.verticalSide,
  flexColumn,
  flexAlignCenter,
]);

export const serviceInfoContainer = style({
  whiteSpace: "break-spaces",
  marginBottom: 60,
});

export const landingTitle = style([
  {
    fontSize: 40,
    fontWeight: 700,
    margin: "48px 0px 40px 0px",
    position: "relative",
    lineHeight: "150%",
  },
]);
export const fadeOut = style([
  landingTitle,
  {
    transition: "opacity 1000ms 200ms, transform 1000ms 200ms",
    transform: "translateY(2rem)",
    opacity: 0,
  },
]);

export const fadeIn = style([
  landingTitle,
  {
    transition: "opacity 1000ms 200ms, transform 1000ms 200ms",
    opacity: 1,
    transform: "translateY(0)",
  },
]);

globalStyle(`${landingTitle} > span`, {
  color: color.$scale.coral700,
});

export const folderImg = style({
  position: "absolute",
  bottom: 7,
  marginLeft: 7,
});

export const serviceInfo = style([
  border.all,
  typography.$semantic.body2Regular,
  flexColumn,
  {
    borderRadius: 8,
    padding: "35px 33px",
  },
]);

export const problemPageButton = style({
  height: 50,
  marginTop: 22,
});

export const issueLink = style([
  flexAlignCenter,
  {
    padding: "0px 4px",
    gap: 3,
    selectors: {
      "&:hover": {
        borderRadius: 8,
        backgroundColor: color.$semantic.bgAlt,
      },
    },
  },
]);
