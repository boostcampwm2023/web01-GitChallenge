import { style } from "@vanilla-extract/css";

import * as utils from "./utils.css";

export const header = style([
  utils.middleLayer,
  utils.widthFull,
  {
    height: 56,
    position: "fixed",
    top: 0,
    left: 0,
  },
]);

export const base = style([utils.flex, utils.widthMax, { marginTop: 56 }]);

export const sideBar = style({
  width: 213,
});

export const container = style({
  width: 1106,
  margin: "0 60px",
});

export const footer = style([
  utils.widthMax,
  {
    margin: "0 auto",
    padding: "45px 0",
  },
]);
