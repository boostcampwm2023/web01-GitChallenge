import { style } from "@vanilla-extract/css";

import color from "../../../design-system/tokens/color";
import typography from "../../../design-system/tokens/typography";
import {
  border,
  borderRadius,
  flexAlignCenter,
  flexCenter,
} from "../../../design-system/tokens/utils.css";

export const container = style({
  width: 336,
});

export const title = style([
  typography.$semantic.h1,
  {
    marginBottom: 33,
    textAlign: "center",
    color: color.$scale.grey700,
  },
]);

export const strong = style([
  typography.$semantic.title4Regular,
  {
    display: "block",
    marginBottom: 10,
    color: color.$scale.grey700,
  },
]);

export const linkContainer = style([
  flexAlignCenter,
  {
    marginBottom: 30,
    color: color.$scale.grey600,
  },
]);

export const linkInput = style([
  border.all,
  borderRadius,
  typography.$semantic.body2Regular,
  {
    flex: "1 0",
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    padding: "9px 13px",
    color: "inherit",
    backgroundColor: color.$semantic.bgDefault,
    outline: "none",
  },
]);

export const linkCopyButton = style([
  border.all,
  borderRadius,
  typography.$semantic.body2Regular,
  {
    position: "relative",
    borderLeft: "none",
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    padding: "9px 19px",
    color: "inherit",
    backgroundColor: color.$semantic.bgAlt,

    selectors: {
      "&.visible::after": {
        display: "inline-block",
      },
    },

    "::after": {
      content: "✅",
      display: "none",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
  },
]);

export const buttonGroup = style([flexCenter, { gap: 7 }]);

export const linkCopyButtonText = style({
  selectors: {
    [`${linkCopyButton}.visible &`]: {
      visibility: "hidden",
    },
  },
});
