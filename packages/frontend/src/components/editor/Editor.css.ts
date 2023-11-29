import { globalStyle, style } from "@vanilla-extract/css";

import color from "../../design-system/tokens/color";
import typography from "../../design-system/tokens/typography";
import {
  flexAlignCenter,
  flexColumn,
  flexJustifyCenter,
  widthFull,
} from "../../design-system/tokens/utils.css";

export const container = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
});

export const textarea = style({
  resize: "none",
  height: 180,
});

export const input = style({});

export const notice = style([
  flexColumn,
  flexJustifyCenter,
  widthFull,
  typography.$semantic.caption2Regular,
  {
    backgroundColor: color.$semantic.secondaryLow,
    borderRadius: 8,
    marginTop: 14,
    gap: 5,
    padding: 14,
    color: color.$semantic.secondary,
    whiteSpace: "break-spaces",
    lineHeight: "165%",
  },
]);

export const noticeItem = style([
  flexAlignCenter,
  {
    gap: 5,
  },
]);

globalStyle(`${noticeItem} > svg`, {
  fontSize: 14,
});
