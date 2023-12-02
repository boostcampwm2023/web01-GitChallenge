import { style } from "@vanilla-extract/css";

import color from "../../design-system/tokens/color";
import typography from "../../design-system/tokens/typography";
import { border, flexAlignCenter } from "../../design-system/tokens/utils.css";

const hrHeight = "20px";

export const container = style([
  typography.$semantic.code,
  border.all,
  {
    height: 180,
    width: "100%",
  },
]);

export const hr = style({
  height: hrHeight,
  margin: 0,
  border: "none",
  borderBottom: `1px solid ${color.$semantic.border}`,
  backgroundColor: color.$scale.grey100,
});

export const terminalContainer = style([
  typography.$semantic.caption1Regular,
  {
    height: `calc(100% - ${hrHeight})`,
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
