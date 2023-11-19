import { style, styleVariants } from "@vanilla-extract/css";

import color from "../../../tokens/color";
import typography from "../../../tokens/typography";
import * as utils from "../../../tokens/utils.css";

export const summaryText = {
  sm: typography.$semantic.caption1Regular,
  md: typography.$semantic.title2Bold,
};

export const summaryColor = styleVariants({
  black: {
    color: color.$scale.grey800,
  },
  grey: {
    color: color.$scale.grey500,
  },
});

const summaryContainerBase = style([
  utils.flex,
  {
    justifyContent: "flex-start",
    alignItems: "center",
    cursor: "pointer",
  },
]);

export const summaryContainer = styleVariants({
  sm: [
    summaryContainerBase,
    {
      gap: 5,
    },
  ],
  md: [
    summaryContainerBase,
    {
      gap: 13,
    },
  ],
});
