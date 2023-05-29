const localizeCardAmount = (size: number) => {
  if (size === 1) {
    return 'карточка';
  }
  if (size === 2 || size === 3 || size === 4) {
    return 'карточки';
  }
  return 'карточек';
};

export default localizeCardAmount;
