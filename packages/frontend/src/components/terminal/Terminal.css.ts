import { style } from "@vanilla-extract/css";

import color from "../../design-system/tokens/color";
import typography from "../../design-system/tokens/typography";
import {
  border,
  flexAlignCenter,
  middleLayer,
} from "../../design-system/tokens/utils.css";
import { barHeight } from "../../pages/quizzes/quiz.css";

export const terminalContainer = style([
  typography.$semantic.code,
  middleLayer,
  border.all,
  {
    flex: 1,
    minHeight: `calc(180px - ${barHeight})`,
    width: "100%",
    padding: "10px 10px",
    overflowY: "auto",
    color: color.$scale.grey900,
    backgroundColor: color.$scale.grey00,
    whiteSpace: "break-spaces",
  },
]);

export const commandInputContainer = style([
  flexAlignCenter,
  {
    width: "100%",
    position: "relative",
  },
]);

export const prompt = style({
  position: "absolute",
  top: 1,
  left: 0,
});

export const stdinContainer = style({ position: "relative" });

export const stdin = style({
  display: "block",
  textIndent: 16,
});

export const commandInput = style({
  flex: 1,
  outline: 0,
  wordBreak: "break-all",
});
