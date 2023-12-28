import { IoCloseOutline } from "react-icons/io5";
import { TooltipRenderProps } from "react-joyride";

import * as styles from "./CoachTooltip.css";

export function CoachTooltip({
  step: { content, showProgress, showSkipButton, title },
  index: stepIndex,
  size: stepSize,
  isLastStep: lastStep,
  continuous,
  backProps,
  closeProps,
  primaryProps,
  skipProps,
  tooltipProps,
}: TooltipRenderProps) {
  const showBackButton = stepIndex > 0;
  const showNextButton = continuous && !lastStep;

  return (
    <div {...tooltipProps} className={styles.container}>
      <div className={styles.header}>
        {title && <strong className={styles.title}>{title}</strong>}
        {showProgress && <StepProgress cur={stepIndex + 1} size={stepSize} />}
        <CloseButton {...closeProps} />
      </div>

      <div className={styles.content}>{content}</div>

      <div className={styles.footer}>
        {showSkipButton && <ActionButton type="skip" {...skipProps} />}
        <div>
          {showBackButton && <ActionButton type="back" {...backProps} />}
          {showNextButton && <ActionButton type="primary" {...primaryProps} />}
          {lastStep && <ActionButton type="primary" {...primaryProps} />}
        </div>
      </div>
    </div>
  );
}

function StepProgress({ cur, size }: { cur: number; size: number }) {
  return (
    <span className={styles.stepProgress}>
      {cur} / {size}
    </span>
  );
}

function CloseButton(props: TooltipRenderProps["closeProps"]) {
  return (
    <button type="button" {...props} className={styles.closeButton}>
      <IoCloseOutline size={27} />
    </button>
  );
}

type ActionType = "skip" | "back" | "primary";
type ActionButtonProps = TooltipRenderProps[`${ActionType}Props`] & {
  type: ActionType;
};

function ActionButton({ type, title, ...props }: ActionButtonProps) {
  return (
    <button
      type="button"
      {...props}
      className={styles.actionButtonVariant[type]}
    >
      {title}
    </button>
  );
}
