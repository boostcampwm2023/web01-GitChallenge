import { style } from "@vanilla-extract/css";

import color from "../../../tokens/color";
import {
  borderRadius,
  boxShadow,
  flexAlignCenter,
  flexCenter,
  flexColumn,
  modalLayer,
} from "../../../tokens/utils.css";

export const backdrop = style([
  modalLayer,
  flexCenter,
  {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
]);

export const container = style([
  boxShadow,
  flexColumn,
  flexAlignCenter,
  borderRadius,
  {
    backgroundColor: color.$semantic.bgDefault,
    padding: "48px 27px 40px 27px",
    position: "relative",
  },
]);

export const close = style({
  color: color.$scale.grey900,
  fontSize: 40,
  position: "absolute",
  right: 20,
  top: 20,
});
