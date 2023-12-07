import { useCallback, useEffect, useRef } from "react";

import { Direction, DirectionType } from "./type";

function useScrollFadeIn<T extends HTMLElement>(
  direction: DirectionType = "up",
  duration = 1000,
  delay = 200,
) {
  const element = useRef<T>(null);

  const handleDirection: Direction = {
    up: "translate3d(0, 50%, 0)",
    down: "translate3d(0, -50%, 0)",
    left: "translate3d(50%, 0, 0)",
    right: "translate3d(-50%, 0, 0)",
  };

  const onScroll = useCallback(
    ([entry]: IntersectionObserverEntry[]) => {
      const { current } = element;
      if (entry.isIntersecting && current) {
        current.style.transition = `opacity ${duration}ms ${delay}ms, transform ${duration}ms ${delay}ms`;
        current.style.transitionTimingFunction = "cubic-bezier(0, 0, 0.2, 1)";
        current.style.opacity = "1";
        current.style.transform = "translate3d(0, 0, 0)";
      }
    },
    [delay, duration],
  );

  useEffect(() => {
    let observer: IntersectionObserver;

    if (element.current) {
      observer = new IntersectionObserver(onScroll, { threshold: 0.7 });
      observer.observe(element.current);
    }

    return () => observer && observer.disconnect();
  }, [onScroll]);

  return {
    ref: element,
    style: {
      opacity: 0,
      transform: handleDirection[direction],
    },
  };
}

export default useScrollFadeIn;
