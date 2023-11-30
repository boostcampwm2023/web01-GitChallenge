import { MouseEvent, useRef, useState } from "react";

export default function useResizableSplitView() {
  const barRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);

  const [prevBarClientY, setPrevBarClientY] = useState(0);
  const [prevUpHeight, setPrevUpHeight] = useState(0);

  const handleBarHover = (event: MouseEvent<HTMLDivElement>) => {
    if (!topRef.current) return;
    setPrevBarClientY(event.clientY);

    const { height } = topRef.current.getBoundingClientRect();
    setPrevUpHeight(height);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = ({ clientY }: { clientY: number }) => {
    if (!topRef.current) {
      return;
    }
    const dClientY = clientY - prevBarClientY;
    const nextHeight = prevUpHeight + dClientY;
    topRef.current.style.height = `${Math.max(nextHeight, 0)}px`;
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return { barRef, topRef, handleBarHover };
}
