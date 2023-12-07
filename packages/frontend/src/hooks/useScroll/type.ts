export type DirectionType = "up" | "down" | "left" | "right";

export type Direction = {
  [key in DirectionType as string]: string;
};

export type ScrollReturnValues = {
  ref: React.MutableRefObject<HTMLElement>;
  style: { opacity: number; transform: string };
};
