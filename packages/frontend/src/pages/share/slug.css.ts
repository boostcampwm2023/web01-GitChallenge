import { style } from "@vanilla-extract/css";

import color from "../../design-system/tokens/color";
import { headerHeight } from "../../design-system/tokens/layout.css";
import typography from "../../design-system/tokens/typography";
import { border, flex } from "../../design-system/tokens/utils.css";

export const main = style([flex, { height: `calc(93% - ${headerHeight})` }]);

export const quizContainer = style([
  border.all,
  {
    width: "40%",
    borderTop: "none",
    borderRight: "none",
    padding: "33px 37px",
  },
]);

export const quizLinkButton = style({ marginTop: 54 });

export const answerContainer = style([
  border.all,
  {
    flex: "1 0",
    borderTop: "none",
    padding: "47px 37px",
  },
]);

export const h2 = style([
  typography.$semantic.h2,
  {
    marginBottom: 16,
    color: color.$scale.grey800,
  },
]);

export const hr = style({
  height: 1,
  marginBottom: 54,
  border: 0,
  backgroundColor: color.$scale.grey300,
});
