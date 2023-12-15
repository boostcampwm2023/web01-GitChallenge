import { useCallback, useEffect, useRef } from "react";

import { Direction } from "./type";

function useScrollClipPath<T extends HTMLElement>(
  direction = "left",
  duration = 1,
  delay = 0,
  threshold = 0.7,
) {
  const element = useRef<T>(null);

  const handleDirection: Direction = {
    up: "inset(100% 0 0 0)",
    down: "inset(0 0 100% 0)",
    left: "inset(0 100% 0 0)",
    right: "inset(0 0 0 100%)",
  };

  const onScroll = useCallback(
    ([entry]: IntersectionObserverEntry[]) => {
      const { current } = element;
      if (entry.isIntersecting && current) {
        current.style.transitionProperty = "transform, clip-path";
        current.style.transitionDuration = `${duration * 1.5}s, ${duration}s`;
        current.style.transitionTimingFunction = "cubic-bezier(0, 0, 0.2, 1)";
        current.style.transitionDelay = `${delay}s`;
        current.style.transform = "scale(1)";
        current.style.clipPath = "inset(0 0 0 0)";
      }
    },
    [delay, duration],
  );

  useEffect(() => {
    let observer: IntersectionObserver;

    if (element.current) {
      observer = new IntersectionObserver(onScroll, { threshold });
      observer.observe(<T>element.current.parentNode);
    }

    return () => observer && observer.disconnect();
  }, [onScroll]);

  return {
    ref: element,
    style: {
      transform: "scale(1.2)",
      clipPath: handleDirection[direction],
    },
  };
}

export default useScrollClipPath;
