const preventBubbling = (e: React.MouseEvent<Element>) => {
  e.stopPropagation();
};

export { preventBubbling };
