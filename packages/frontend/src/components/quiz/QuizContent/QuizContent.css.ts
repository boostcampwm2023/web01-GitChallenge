import { globalStyle, style } from "@vanilla-extract/css";

import color from "../../../design-system/tokens/color";
import typography from "../../../design-system/tokens/typography";
import * as utils from "../../../design-system/tokens/utils.css";

export const heading = style([
  typography.$semantic.caption1Regular,
  utils.flexCenter,
  {
    marginBottom: 15,
  },
]);

export const strong = style([
  typography.$semantic.title1Bold,
  { color: color.$scale.grey800 },
]);

export const description = style([
  typography.$semantic.body1Regular,
  {
    height: 264,
    marginTop: 15,
    padding: "4px 8px 4px 0",
    color: color.$scale.grey700,
    overflowY: "auto",
    whiteSpace: "break-spaces",

    "::-webkit-scrollbar": {
      width: 5,
      backgroundColor: "transparent",
    },

    "::-webkit-scrollbar-thumb": {
      borderRadius: 5,
      backgroundColor: color.$scale.grey100,
    },

    "::-webkit-scrollbar-button": {
      display: "none",
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
