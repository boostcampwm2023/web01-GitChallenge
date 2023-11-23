import { style } from "@vanilla-extract/css";

import color from "../design-system/tokens/color";
import { border } from "../design-system/tokens/utils.css";

const containerPadding = 23;

export const main = style({
  marginBottom: "54px",
});

export const mainInner = style([
  border.all,
  {
    borderTop: 0,
    marginBottom: "17px",
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
  height: "400px",
  padding: containerPadding,
  "@media": {
    "(min-width: 1920px) and (max-width: 2559px)": {
      height: "500px",
    },
  },
});

export const commandAccordion = style({
  marginTop: "12px",
});

export const checkAnswerButton = style({
  position: "absolute",
  right: containerPadding,
  bottom: containerPadding,
});

export const submitButton = style({
  textAlign: "end",
});
