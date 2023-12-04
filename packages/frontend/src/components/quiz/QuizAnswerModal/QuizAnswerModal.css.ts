import { globalStyle, style } from "@vanilla-extract/css";

import color from "../../../design-system/tokens/color";
import typography from "../../../design-system/tokens/typography";
import { noticeItem } from "../../editor/Editor.css";

export const title = style([
  typography.$semantic.h3,
  { color: color.$scale.grey700, marginBottom: 20 },
]);

export const answerContainer = style([
  typography.$semantic.body2Regular,
  {
    backgroundColor: color.$semantic.bgAlt,
    borderRadius: 8,
    width: "100%",
    padding: "23px 25px",
    marginBottom: 19,
    whiteSpace: "break-spaces",
    color: color.$scale.grey700,
  },
]);

export const answerNotice = style([
  noticeItem,
  typography.$semantic.caption1Regular,
  {
    color: color.$scale.grey600,
  },
]);

globalStyle(`${answerContainer} code`, {
  color: color.$scale.coral500,
});
