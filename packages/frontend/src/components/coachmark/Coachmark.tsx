import ReactJoyride, { Props } from "react-joyride";

import color from "../../design-system/tokens/color";
import { coachmarkZIndex } from "../../design-system/tokens/utils.css";
import useMount from "../../hooks/useMount";

import { CoachTooltip } from "./CoachTooltip";

export type CoachmarkProps = { steps: Props["steps"] } & Partial<
  Pick<
    Props,
    "steps" | "continuous" | "showProgress" | "showSkipButton" | "callback"
  >
>;

export function Coachmark({
  steps,
  continuous,
  showProgress,
  showSkipButton,
  callback,
}: CoachmarkProps) {
  const { mounted } = useMount();

  if (!mounted) return null;
  return (
    <ReactJoyride
      steps={steps}
      continuous={continuous}
      showProgress={showProgress}
      showSkipButton={showSkipButton}
      locale={LOCALE}
      styles={STYLES}
      tooltipComponent={CoachTooltip}
      spotlightPadding={0}
      floaterProps={FLOATER_PROPS}
      callback={callback}
    />
  );
}

const LOCALE: Props["locale"] = {
  back: "이전",
  next: "다음",
  close: "닫기",
  last: "종료",
  skip: "건너뛰기",
};

const STYLES: Props["styles"] = {
  options: {
    overlayColor: "rgba(0, 0, 0, 0.2)",
    primaryColor: color.$semantic.primary,
    zIndex: coachmarkZIndex,
  },
};

const FLOATER_PROPS: Props["floaterProps"] = {
  offset: 25,
  styles: {
    arrow: { length: 15, spread: 18 },
    floater: { filter: "none" },
  },
};
