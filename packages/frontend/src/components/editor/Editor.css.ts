import { globalStyle, style } from "@vanilla-extract/css";

import color from "../../design-system/tokens/color";
import typography from "../../design-system/tokens/typography";
import {
  border,
  flexAlignCenter,
  flexColumn,
  flexJustifyCenter,
  middleLayer,
  widthFull,
} from "../../design-system/tokens/utils.css";

const editorPadding = 10;

export const container = style([
  middleLayer,
  border.all,
  {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    flex: 1,
    position: "relative",
    minHeight: 160,
    overflowY: "auto",
  },
]);

export const textarea = style([
  typography.$semantic.code,
  {
    resize: "none",
    flex: 1,
    height: "100%",
    padding: editorPadding,
    border: "none",
    outline: "none",
  },
]);

export const input = style([
  widthFull,
  typography.$semantic.code,
  {
    position: "absolute",
    bottom: "0",
    padding: `0px ${editorPadding}px`,
    border: "none",
    outline: "none",
  },
]);

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
