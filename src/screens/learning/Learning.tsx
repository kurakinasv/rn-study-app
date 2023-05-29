import { useState, useCallback } from 'react';
import { Pressable } from 'react-native';

import { MaterialIcons, Feather, AntDesign } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { observer } from 'mobx-react';

import MemoCardStateIndicator from '@components/MemoCardStateIndicator';
import { useLocalStore } from '@hooks/useLocalStore';
import MemoCardStore from '@stores/MemoCardStore';
import { MemoCardState } from '@stores/models/memo';
import { useMemoStore } from '@stores/RootStore/hooks';
import { colors } from '@styles/colors';

import {
  ButtonsWrapper,
  CardCounter,
  CardText,
  CardWrapper,
  IndicatorWrapper,
  StyledButton,
  StyledPageView,
} from './Learning.styles';

const Learning = () => {
  const { cardsFromCurrentPack, currentPack } = useMemoStore();
  const { editCard } = useLocalStore(() => new MemoCardStore());

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
    if (currentCardIndex === cardsFromCurrentPack.length - 1) {
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
  const toNextDisabled = currentCardIndex === cardsFromCurrentPack.length - 1;

  const handleCardState = (state: MemoCardState) => async () => {
    if (!currentPack) {
      return;
    }
    const { _id } = cardsFromCurrentPack[currentCardIndex];
    await editCard({ cardId: _id, state, memoPackId: currentPack._id });
  };

  return (
    <StyledPageView>
      <Stack.Screen
        options={{
          headerTitle: `Обучение [${currentPack?.name}]`,
          headerRight: () => (
            <CardCounter>
              {currentCardIndex + 1}/{cardsFromCurrentPack.length}
            </CardCounter>
          ),
        }}
      />

      <CardWrapper onPress={toggleCardPosition}>
        <IndicatorWrapper>
          <MemoCardStateIndicator state={cardsFromCurrentPack[currentCardIndex].state} />
        </IndicatorWrapper>

        {cardPosition === 'front' && (
          <CardText>{cardsFromCurrentPack[currentCardIndex].question}</CardText>
        )}
        {cardPosition === 'back' && (
          <CardText>{cardsFromCurrentPack[currentCardIndex].answer}</CardText>
        )}
      </CardWrapper>

      <ButtonsWrapper>
        <Pressable onPress={toPrev} disabled={toPrevDisabled}>
          <MaterialIcons
            name="navigate-before"
            size={48}
            color={toPrevDisabled ? colors.secondaryBlue : colors.blue}
          />
        </Pressable>

        <StyledButton color={colors.red} onPress={handleCardState('difficult')}>
          <Feather name="x" size={24} color={colors.white} />
        </StyledButton>
        <StyledButton color={colors.blue} onPress={handleCardState('normal')}>
          <AntDesign name="question" size={24} color={colors.white} />
        </StyledButton>
        <StyledButton color={colors.green} onPress={handleCardState('easy')}>
          <Feather name="check" size={24} color={colors.white} />
        </StyledButton>

        <Pressable onPress={toNext} disabled={toNextDisabled}>
          <MaterialIcons
            name="navigate-next"
            size={48}
            color={toNextDisabled ? colors.secondaryBlue : colors.blue}
          />
        </Pressable>
      </ButtonsWrapper>
    </StyledPageView>
  );
};

export default observer(Learning);
