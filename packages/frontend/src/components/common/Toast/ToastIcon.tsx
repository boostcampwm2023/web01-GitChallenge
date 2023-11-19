import { BsX } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";

import classnames from "../../../utils/classnames";

import * as styles from "./ToastIcon.css";

interface ToastIconProps {
  type: "error" | "success";
}

export default function ToastIcon({ type }: ToastIconProps) {
  const { Icon, size } = iconMap[type];
  return (
    <div className={classnames(styles.iconBase, styles.iconVariants[type])}>
      <Icon className={styles.displayBlock} size={size} />
    </div>
  );
}

ToastIcon.error = () => <ToastIcon type="error" />;
ToastIcon.success = () => <ToastIcon type="success" />;

const iconMap = {
  error: { Icon: BsX, size: 20 },
  success: { Icon: FaCheck, size: 13 },
};
