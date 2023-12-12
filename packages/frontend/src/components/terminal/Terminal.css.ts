import { style } from "@vanilla-extract/css";

import color from "../../design-system/tokens/color";
import typography from "../../design-system/tokens/typography";
import {
  border,
  middleLayer,
  widthFull,
} from "../../design-system/tokens/utils.css";

export const terminalContainer = style([
  typography.$semantic.code,
  middleLayer,
  border.all,
  {
    flex: 1,
    minHeight: 160,
    width: "100%",
    padding: "10px 10px",
    overflowY: "auto",
    color: color.$scale.grey900,
    backgroundColor: color.$semantic.bgDefault,
    whiteSpace: "break-spaces",
  },
]);

export const commandInputContainer = style([widthFull]);

export const commandInput = style({
  outline: 0,
  wordBreak: "break-all",
});
