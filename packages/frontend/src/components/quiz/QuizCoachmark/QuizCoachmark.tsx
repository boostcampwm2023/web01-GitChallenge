import { ACTIONS, EVENTS } from "react-joyride";

import {
  Coachmark,
  type CoachmarkProps,
} from "../../../design-system/components/common";

import { STEPS } from "./coachmarkList";

interface QuizCoachmarkProps {
  onTourEnd: () => void;
}

export function QuizCoachmark({ onTourEnd }: QuizCoachmarkProps) {
  const handleProgress: CoachmarkProps["callback"] = ({ type, action }) => {
    if (type === EVENTS.TOUR_END || action === ACTIONS.CLOSE) {
      onTourEnd();
    }
  };

  return (
    <Coachmark
      steps={STEPS}
      continuous
      showProgress
      showSkipButton
      callback={handleProgress}
      disableScrolling
    />
  );
}
