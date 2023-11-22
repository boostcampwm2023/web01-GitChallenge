import { style } from "@vanilla-extract/css";

import color from "../design-system/tokens/color";
import { border } from "../design-system/tokens/utils.css";

const paddingRight = "36px";
const paddingBottom = "30px";

export const main = style({
  marginBottom: "54px",
});

export const mainInner = style([
  border.all,
  {
    borderTop: 0,
    marginBottom: "25px",
  },
]);

export const gitGraph = style({
  width: "50%",
  borderRight: `1px solid ${color.$semantic.border}`,
  textAlign: "center",
});

export const quizContentContainer = style({
  position: "relative",
  width: "50%",
  height: "545px",
  padding: `42px ${paddingRight} ${paddingBottom}`,
});

export const commandAccordion = style({
  marginTop: "15px",
});

export const checkAnswerButton = style({
  position: "absolute",
  right: paddingRight,
  bottom: paddingBottom,
});

export const submitButton = style({
  textAlign: "end",
});
