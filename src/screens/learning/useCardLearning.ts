import { useState, useCallback } from 'react';

const useCardLearning = (packLength: number) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [cardPosition, setCardPosition] = useState<'front' | 'back'>('front');

  const toPrev = useCallback(() => {
    if (currentCardIndex === 0) {
      return;
    }
    setCurrentCardIndex((i) => i - 1);
    setCardPosition('front');
  }, [currentCardIndex]);

  const toNext = useCallback(() => {
    if (currentCardIndex === packLength - 1) {
      return;
    }
    setCurrentCardIndex((i) => i + 1);
    setCardPosition('front');
  }, [currentCardIndex]);

  const toggleCardPosition = useCallback(() => {
    const newPosition = cardPosition === 'front' ? 'back' : 'front';
    setCardPosition(newPosition);
  }, [cardPosition]);

  const toPrevDisabled = currentCardIndex === 0;
  const toNextDisabled = currentCardIndex === packLength - 1;

  return {
    toPrev,
    toNext,
    toggleCardPosition,
    toPrevDisabled,
    toNextDisabled,
    currentCardIndex,
    cardPosition,
  };
};

export default useCardLearning;
