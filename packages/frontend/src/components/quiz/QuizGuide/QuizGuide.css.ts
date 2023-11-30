import { style } from "@vanilla-extract/css";

import color from "../../../design-system/tokens/color";
import { baseLayer, flexColumn } from "../../../design-system/tokens/utils.css";

const containerPadding = 23;

export const quizContentContainer = style([
  flexColumn,
  baseLayer,
  {
    position: "relative",
    width: "50%",
    height: "400px",
    borderLeft: `1px solid ${color.$semantic.border}`,
    padding: containerPadding,
    gap: 12,
  },
]);

export const checkAnswerButton = style({
  position: "absolute",
  right: containerPadding,
  bottom: containerPadding,
});
