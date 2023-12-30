import ReactJoyride, { type Props as JoyrideProps } from "react-joyride";

import color from "../../design-system/tokens/color";
import { coachmarkZIndex } from "../../design-system/tokens/utils.css";
import useMount from "../../hooks/useMount";

import { CoachTooltip } from "./CoachTooltip";

export type CoachmarkProps = Partial<
  Omit<
    JoyrideProps,
    | "locale"
    | "styles"
    | "tooltipComponent"
    | "spotlightPadding"
    | "floaterProps"
  >
>;

export function Coachmark(props: CoachmarkProps) {
  const { mounted } = useMount();

  if (!mounted) return null;
  return (
    <ReactJoyride
      {...props}
      locale={LOCALE}
      styles={STYLES}
      tooltipComponent={CoachTooltip}
      spotlightPadding={0}
      floaterProps={FLOATER_PROPS}
    />
  );
}

type RequiredJoyrideProps = Required<JoyrideProps>;

const LOCALE: RequiredJoyrideProps["locale"] = {
  back: "이전",
  next: "다음",
  close: "닫기",
  last: "종료",
  skip: "건너뛰기",
};

const STYLES: RequiredJoyrideProps["styles"] = {
  options: {
    arrowColor: color.$semantic.bgWhite,
    overlayColor: "rgba(0, 0, 0, 0.6)",
    primaryColor: color.$semantic.primary,
    zIndex: coachmarkZIndex,
  },
};

const FLOATER_PROPS: RequiredJoyrideProps["floaterProps"] = {
  offset: 25,
  styles: {
    arrow: { length: 15, spread: 18 },
    floater: { filter: "none" },
  },
};
