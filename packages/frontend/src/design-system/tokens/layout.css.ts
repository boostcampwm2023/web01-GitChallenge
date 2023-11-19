import { style } from "@vanilla-extract/css";

import color from "./color";
import * as utils from "./utils.css";

export const header = style([
  utils.middleLayer,
  {
    width: "100%",
    height: 56,
    position: "fixed",
    top: 0,
    left: 0,
    backgroundColor: color.$scale.grey700,
  },
]);

export const base = style([
  utils.flex,
  {
    width: 1440,
    marginTop: 56,
    backgroundColor: color.$scale.grey900,
  },
]);

export const sideBar = style({
  width: 213,
  backgroundColor: color.$scale.grey300,
});

export const container = style({
  width: 1226,
  backgroundColor: color.$scale.grey500,
  margin: "0 60px",
});
