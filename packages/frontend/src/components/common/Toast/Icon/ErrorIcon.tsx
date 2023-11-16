import { BsX } from "react-icons/bs";

import { displayBlock, iconBaseStyle, iconStyle } from "./Icon.css";

export default function ErrorIcon() {
  return (
    <div className={[iconBaseStyle, iconStyle.error].join(" ")}>
      <BsX className={displayBlock} size={20} />
    </div>
  );
}
