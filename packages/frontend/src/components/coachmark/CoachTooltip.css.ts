import { style, styleVariants } from "@vanilla-extract/css";

import color from "../../design-system/tokens/color";
import typography from "../../design-system/tokens/typography";
import {
  borderRadius,
  flexAlignCenter,
} from "../../design-system/tokens/utils.css";

export const container = style([
  borderRadius,
  {
    position: "relative",
    width: 398,
    padding: 16,
    color: color.$scale.grey800,
    backgroundColor: color.$semantic.bgWhite,
  },
]);

export const header = style([flexAlignCenter, { gap: 5, marginBottom: 12 }]);

export const title = style([typography.$semantic.title3Bold]);

export const stepProgress = style([
  typography.$semantic.caption2Regular,
  { color: color.$scale.grey500 },
]);

export const closeButton = style({
  position: "absolute",
  top: 13,
  right: 3,
  border: 0,
  color: color.$scale.grey700,
  backgroundColor: "transparent",
});

export const content = style([
  typography.$semantic.title3Regular,
  { height: 53 },
]);

export const footer = style([
  flexAlignCenter,
  { justifyContent: "space-between" },
]);

const actionBaseButton = style([
  typography.$semantic.body2Regular,
  { border: 0 },
]);

export const actionButtonVariant = styleVariants({
  skip: [
    actionBaseButton,
    {
      padding: 0,
      color: color.$scale.grey600,
      backgroundColor: "transparent",
    },
  ],

  back: [
    actionBaseButton,
    {
      width: 67,
      marginRight: 8,
      borderRadius: 3,
      padding: "7px 0",
      color: color.$semantic.primary,
      backgroundColor: color.$semantic.primaryLow,
    },
  ],

  primary: [
    actionBaseButton,
    {
      width: 67,
      borderRadius: 3,
      padding: "7px 0",
      color: color.$semantic.textWhite,
      backgroundColor: color.$semantic.primary,
    },
  ],
});