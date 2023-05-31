import { Pressable } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { observer } from 'mobx-react';

import MemoCardStateIndicator from '@components/MemoCardStateIndicator';
import useCardLearning from '@screens/learning/useCardLearning';
import { useMemoStore } from '@stores/RootStore/hooks';
import { colors } from '@styles/colors';

import { ButtonsWrapper } from './Practice.styles';
import {
  CardCounter,
  CardText,
  CardWrapper,
  IndicatorWrapper,
  StyledPageView,
} from '../Learning.styles';

const Practice = () => {
  const { cardsFromCurrentPack, currentPack } = useMemoStore();

  const {
    toNext,
    toPrev,
    toggleCardPosition,
    currentCardIndex,
    toPrevDisabled,
    toNextDisabled,
    cardPosition,
  } = useCardLearning(cardsFromCurrentPack.length);

  return (
    <StyledPageView>
      <Stack.Screen
        options={{
          headerTitle: `Практика [${currentPack?.name}]`,
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

export default observer(Practice);
