import { ACTIONS, EVENTS } from "react-joyride";

import { toClassSelector } from "../../../utils/cssSelector";
import { Coachmark, type CoachmarkProps } from "../../coachmark";

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

export const COACHMARK_TARGETS = {
  GIT_GRAPH: "coach--git-graph",
  KEY_COMMAND: "coach--key-command",
  TERMINAL: "coach--terminal",
  RESIZABLE: "coach--resizable",
};

const STEPS: CoachmarkProps["steps"] = [
  {
    title: "Git 그래프",
    target: toClassSelector(COACHMARK_TARGETS.GIT_GRAPH),
    content:
      "현재 Git 상태에 따라 Git 그래프가 어떻게 변하는지 확인할 수 있어요.",
    placement: "right",
    disableBeacon: true, // autostart tour
  },
  {
    title: "Git 핵심 명령어",
    target: toClassSelector(COACHMARK_TARGETS.KEY_COMMAND),
    content: "문제 풀이에 필요한 핵심 명령어를 확인할 수 있어요.",
    placement: "bottom",
  },
  {
    title: "문제 풀이용 터미널",
    target: toClassSelector(COACHMARK_TARGETS.TERMINAL),
    content: "터미널에 Git 명령어를 입력해 문제를 풀어보세요.",
    placement: "top-start",
  },
  {
    title: "터미널 리사이징",
    target: toClassSelector(COACHMARK_TARGETS.RESIZABLE),
    content: "위아래로 드래그해서 터미널 크기를 조절할 수 있어요.",
    placement: "top",
  },
];
