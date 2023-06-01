const localizeElementsAmount = (size: number) => {
  if (size === 1) {
    return 'элемент';
  }
  if (size === 2 || size === 3 || size === 4) {
    return 'элемента';
  }
  return 'элементов';
};

export default localizeElementsAmount;
