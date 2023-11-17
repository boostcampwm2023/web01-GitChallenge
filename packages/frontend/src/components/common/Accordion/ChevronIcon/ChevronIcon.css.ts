import { style } from "@vanilla-extract/css";

import color from "../../../../styles/color";

const containerStyle = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: 25,
  height: 25,
  border: `1px solid ${color.$scale.grey300}`,
  borderRadius: "50%",
});

export default containerStyle;
