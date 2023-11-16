import { FaCheck } from "react-icons/fa6";

import { displayBlock, iconBaseStyle, iconStyle } from "./Icon.css";

export default function SuccessIcon() {
  return (
    <div className={[iconBaseStyle, iconStyle.success].join(" ")}>
      <FaCheck className={displayBlock} size={13} />
    </div>
  );
}
