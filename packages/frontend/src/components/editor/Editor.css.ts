import { style } from "@vanilla-extract/css";

import color from "../../design-system/tokens/color";
import typography from "../../design-system/tokens/typography";
import {
  border,
  borderRadius,
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
    backgroundColor: color.$semantic.bgDefault,
    color: color.$scale.grey900,
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
    backgroundColor: color.$semantic.bgDefault,
    color: color.$scale.grey900,
    outline: "none",

    selectors: {
      "&.error": {
        color: color.$semantic.danger,
      },
    },
  },
]);

export const notice = style([
  flexColumn,
  flexJustifyCenter,
  widthFull,
  typography.$semantic.caption2Regular,
  border.all,
  borderRadius,
  {
    marginTop: 14,
    gap: 5,
    padding: 14,
    whiteSpace: "break-spaces",
    lineHeight: "165%",
  },
]);
