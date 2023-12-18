import { style } from "@vanilla-extract/css";

import color from "../../../tokens/color";
import typography from "../../../tokens/typography";
import {
  border,
  borderRadius,
  flexAlignCenter,
  flexCenter,
  flexColumn,
  widthFull,
} from "../../../tokens/utils.css";

const selectWidth = 106;
const selectPadding = 10;
const iconGap = 5;

export const selectContainer = style([
  {
    position: "relative",
    marginRight: 15,
  },
]);

export const selectedItem = style([
  flexAlignCenter,
  {
    gap: iconGap,
  },
]);

export const select = style([
  border.all,
  borderRadius,
  flexAlignCenter,
  typography.$semantic.body2Regular,
  {
    justifyContent: "space-between",
    width: selectWidth,
    height: 36,
    backgroundColor: color.$semantic.bgDefault,
    color: color.$scale.grey700,
    padding: selectPadding,
    transition: "border 0.2s ease",
    ":hover": {
      border: `1px solid ${color.$scale.grey600}`,
    },
  },
]);

export const optionList = style([
  flexColumn,
  flexCenter,
  border.all,
  {
    position: "absolute",
    top: 40,
    right: 0,
    width: selectWidth,
    backgroundColor: color.$scale.grey00,
    borderRadius: "6px",
    paddingInlineStart: 0,
    padding: "6px 0px",
    gap: "6px",
  },
]);

export const option = style([
  flexAlignCenter,
  {
    cursor: "pointer",
    width: "90%",
    height: "28px",
    borderRadius: 4,
    padding: 4,
    ":hover": {
      backgroundColor: color.$scale.grey50,
    },
  },
]);

export const optionButton = style([
  flexAlignCenter,
  widthFull,
  typography.$semantic.body2Regular,
  {
    height: "100%",
    padding: 0,
    margin: 0,
    color: color.$scale.grey700,
    border: "none",
    backgroundColor: "transparent",
    gap: iconGap,
  },
]);
