import { style } from "@vanilla-extract/css";

import color from "../../../design-system/tokens/color";
import typography from "../../../design-system/tokens/typography";
import {
  border,
  flexAlignCenter,
  flexCenter,
} from "../../../design-system/tokens/utils.css";

const BORDER_RADIUS = 8;

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
  typography.$semantic.title3Bold,
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
  typography.$semantic.body2Regular,
  {
    flex: "1 0",
    borderTopLeftRadius: BORDER_RADIUS,
    borderBottomLeftRadius: BORDER_RADIUS,
    padding: "9px 13px",
    color: "inherit",
    backgroundColor: color.$scale.grey00,
    outline: "none",
  },
]);

export const linkCopyButton = style([
  border.all,
  typography.$semantic.body2Regular,
  {
    borderLeft: "none",
    borderTopRightRadius: BORDER_RADIUS,
    borderBottomRightRadius: BORDER_RADIUS,
    padding: "9px 19px",
    color: "inherit",
    backgroundColor: color.$scale.grey50,
  },
]);

export const buttonGroup = style([flexCenter, { gap: 4 }]);
