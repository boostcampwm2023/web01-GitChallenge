import { style } from "@vanilla-extract/css";

import { flex, flexColumn, topLayer, widthFull, widthMax } from "./utils.css";

export const headerHeight = "56px";
const footerHeight = "250px";

export const header = style([
  topLayer,
  widthFull,
  {
    height: headerHeight,
    position: "sticky",
    top: 0,
    left: 0,
  },
]);

export const base = style([
  flex,
  widthMax,
  {
    height: `calc(100vh - ${headerHeight})`,
    margin: "0 auto",
  },
]);

export const sideBar = style([
  flexColumn,
  {
    maxHeight: "100vh",
    width: 250,
    padding: "30px 0px",
    gap: 20,
  },
]);

export const container = style([
  flexColumn,
  {
    width: 1030,
  },
]);

export const footer = style([
  widthMax,
  {
    height: footerHeight,
    margin: "0 auto",
    padding: "45px 0",
  },
]);
