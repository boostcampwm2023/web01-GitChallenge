import { globalStyle } from "@vanilla-extract/css";

import color from "../../../styles/color";

globalStyle(".Toastify .Toastify__toast", {
  display: "block",
  width: "max-content",
  height: 46,
  minHeight: 46,
  maxHeight: 46,
  marginLeft: "auto",
  marginRight: "auto",
  borderRadius: 8,
  padding: "12px 20px",
  textAlign: "center",
  color: color.$scale.grey00,
  backgroundColor: color.$scale.grey800,
});

globalStyle(".Toastify .Toastify__toast-body", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: 0,
});

globalStyle(".Toastify .Toastify__toast-icon", {
  width: 22,
  marginRight: 8,
});

globalStyle(".Toastify .Toastify__toast-body>div:last-child", {
  flex: "0 0 auto",
});
