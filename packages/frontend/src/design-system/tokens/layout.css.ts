import { style } from "@vanilla-extract/css";

import { border, flexColumn, scrollBarHidden } from "./utils.css";
import * as utils from "./utils.css";

const headerHeight = "56px";
const footerHeight = "250px";

export const header = style([
  utils.middleLayer,
  utils.widthFull,
  {
    height: headerHeight,
    position: "fixed",
    top: 0,
    left: 0,
  },
]);

export const base = style([
  utils.flex,
  utils.widthMax,
  {
    height: "100vh",
    paddingTop: headerHeight,
    margin: "0 auto",
  },
]);

export const sideBar = style([
  flexColumn,
  scrollBarHidden,
  {
    width: 250,
    padding: "30px 0px",
    gap: 24,
  },
]);

export const container = style([
  border.verticalSide,
  {
    width: 1030,
  },
]);

export const footer = style([
  utils.widthMax,
  {
    height: footerHeight,
    margin: "0 auto",
    padding: "45px 0",
  },
]);
