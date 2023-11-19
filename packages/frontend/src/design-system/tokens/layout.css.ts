import { style } from "@vanilla-extract/css";

import * as utils from "./utils.css";

export const header = style([
  utils.middleLayer,
  {
    width: "100%",
    height: 56,
    position: "fixed",
    top: 0,
    left: 0,
  },
]);

export const base = style([
  utils.flex,
  {
    width: 1440,
    marginTop: 56,
  },
]);

export const sideBar = style({
  width: 213,
});

export const container = style({
  width: 1106,
  margin: "0 60px",
});
