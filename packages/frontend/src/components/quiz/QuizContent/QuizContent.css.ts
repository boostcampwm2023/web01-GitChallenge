import { globalStyle, style } from "@vanilla-extract/css";

import color from "../../../design-system/tokens/color";
import typography from "../../../design-system/tokens/typography";

export const strong = style([
  typography.$semantic.title3Bold,
  { color: color.$scale.grey800 },
]);

export const description = style([
  typography.$semantic.body2Regular,
  {
    marginTop: 10,
    height: 250,
    padding: "0 8px 4px 0",
    color: color.$scale.grey700,
    overflowY: "auto",
    whiteSpace: "break-spaces",
    "@media": {
      "(min-width: 1920px) and (max-width: 2559px)": {
        height: "330px",
      },
    },
  },
]);

globalStyle(`${description} code`, {
  borderRadius: 4,
  paddingLeft: 4,
  paddingRight: 4,
  color: color.$scale.coral500,
  backgroundColor: color.$scale.grey100,
});
