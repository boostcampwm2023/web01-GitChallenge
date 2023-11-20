const preventBubbling = (e: React.MouseEvent<HTMLElement>) => {
  e.stopPropagation();
};

export { preventBubbling };
