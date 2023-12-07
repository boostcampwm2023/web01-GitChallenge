const preventBubbling = <T extends Element>(
  e: React.MouseEvent<T> | React.KeyboardEvent<T>,
) => {
  e.stopPropagation();
};

export { preventBubbling };
