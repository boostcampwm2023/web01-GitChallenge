import { globalStyle, style } from "@vanilla-extract/css";

import color from "../../../design-system/tokens/color";
import typography from "../../../design-system/tokens/typography";
import {
  border,
  flexAlignCenter,
  flexColumn,
} from "../../../design-system/tokens/utils.css";

export const container = style([
  flexColumn,
  {
    marginBottom: 30,
    transition: "100px 2s linear 1s",
  },
]);
export const h1 = style([
  typography.$semantic.h1,
  border.bottom,
  {
    paddingBottom: 17,
    marginBottom: 17,
  },
]);

export const description = style([
  typography.$semantic.body1Regular,
  {
    color: color.$scale.grey800,
    marginBottom: 30,
  },
]);

export const h2 = style([typography.$semantic.title2Bold]);

export const li = style([typography.$semantic.body2Regular]);

globalStyle(`${container} > ul`, {
  display: "flex",
  flexDirection: "column",
  gap: 5,
  listStyleType: "disc",
  marginBlockStart: 9,
  paddingInlineStart: 20,
  marginBottom: 29,
});

export const linkWrapper = style([
  flexAlignCenter,
  {
    color: color.$scale.grey600,
    textDecoration: "underline",
    gap: 5,
    selectors: {
      "&:hover": {
        fontWeight: 500,
      },
    },
  },
]);

globalStyle(`${container} code`, {
  borderRadius: 4,
  paddingLeft: 4,
  paddingRight: 4,
  color: color.$scale.coral500,
  backgroundColor: color.$scale.grey100,
});
