import { useState, useMemo, useEffect, useCallback } from 'react';
import { Pressable, Alert, ToastAndroid } from 'react-native';

import { Ionicons, MaterialIcons, Feather, AntDesign } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { observer } from 'mobx-react';

import MemoCardStateIndicator from '@components/MemoCardStateIndicator';
import { useLocalStore } from '@hooks/useLocalStore';
import MemoCardStore from '@stores/MemoCardStore';
import { MemoCardState } from '@stores/models/memo';
import {
  getNextIntervalHours,
  IntervalNotificationConfig,
  IntervalNotificationHours,
} from '@stores/models/notifications';
import { useMemoStore, useNotificationStore } from '@stores/RootStore/hooks';
import { colors } from '@styles/colors';
import { getDateAfterSomeHours } from '@utils/getDateAfterTime';
import { getLastIntervalHours, saveLastIntervalHoursData } from '@utils/notificationsStorage';

import {
  ButtonsWrapper,
  CardCounter,
  CardText,
  CardWrapper,
  IndicatorWrapper,
  StyledButton,
  StyledPageView,
} from './Learning.styles';
import useCardLearning from './useCardLearning';

const Learning = () => {
  const router = useRouter();

  const { cardsFromCurrentPack, currentPack, editMemoPack } = useMemoStore();
  const { schedulePushNotification, getScheduledNotifications, cancelNotification } =
    useNotificationStore();
  const { editCard } = useLocalStore(() => new MemoCardStore());

  const [filtered, setFiltered] = useState(cardsFromCurrentPack);

  useEffect(() => {
    const hard = cardsFromCurrentPack.filter((card) => card.state === 'difficult');
    const medium = cardsFromCurrentPack.filter((card) => card.state === 'normal');
    const easy = cardsFromCurrentPack.filter((card) => card.state === 'easy');
    const newCards = cardsFromCurrentPack.filter((card) => card.state === 'new');

    setFiltered([...hard, ...medium, ...easy, ...newCards]);
  }, [cardsFromCurrentPack]);

  const {
    toNext,
    toPrev,
    toggleCardPosition,
    currentCardIndex,
    toPrevDisabled,
    toNextDisabled,
    cardPosition,
  } = useCardLearning(cardsFromCurrentPack.length);

  const handleCardState = (state: MemoCardState) => async () => {
    if (!currentPack) {
      return;
    }
    const { _id } = cardsFromCurrentPack[currentCardIndex];
    await editCard({ cardId: _id, state, memoPackId: currentPack._id });
  };

  const handleEndOfSession = useCallback(async () => {
    if (!currentPack) {
      ToastAndroid.show('Не удалось получить данные о наборе', ToastAndroid.CENTER);
      router.back();
      return;
    }

    const lastIntervalHours = await getLastIntervalHours(currentPack._id);
    const scheduled = await getScheduledNotifications();

    // cancel last notification for current pack
    if (scheduled && scheduled.length) {
      const notifsFromCurrentPack = scheduled.filter(
        (notif) => notif.memoPackId === currentPack._id
      );

      if (notifsFromCurrentPack.length) {
        await cancelNotification(notifsFromCurrentPack[notifsFromCurrentPack.length - 1].id);
      }
    }

    // schedule new (next interval) notification
    // if interval learning for current memo pack is enabled
    if (lastIntervalHours) {
      const currentHours: IntervalNotificationHours =
        Number(lastIntervalHours) || IntervalNotificationHours.FIRST;
      const nextHours = getNextIntervalHours(currentHours);

      const { title, type, body } = IntervalNotificationConfig[nextHours];

      await schedulePushNotification(
        nextHours,
        title,
        type,
        currentPack._id,
        body,
        currentPack.name
      );

      await saveLastIntervalHoursData(currentPack._id, nextHours);

      await editMemoPack({
        packId: String(currentPack._id),
        lastRepetition: new Date().toISOString(),
        nextRepetition: getDateAfterSomeHours(new Date(), nextHours).toISOString(),
      });
    }

    // otherwise just edit memo pack
    if (!lastIntervalHours) {
      await editMemoPack({
        packId: String(currentPack._id),
        lastRepetition: new Date().toISOString(),
      });
    }

    router.back();
  }, [currentPack]);

  const backButtonHandler = useCallback(() => {
    Alert.alert('Закончить обучение?', '', [
      {
        text: 'Нет',
        style: 'cancel',
      },
      {
        text: 'Да',
        onPress: handleEndOfSession,
      },
    ]);
  }, [handleEndOfSession]);

  const ArrowBack = useMemo(
    () => () =>
      (
        <Ionicons
          onPress={backButtonHandler}
          name="arrow-back"
          size={24}
          color={colors.white}
          style={{ marginRight: 24 }}
        />
      ),
    []
  );

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
          headerLeft: ArrowBack,
        }}
      />

      <CardWrapper onPress={toggleCardPosition}>
        <IndicatorWrapper>
          <MemoCardStateIndicator state={filtered[currentCardIndex].state} />
        </IndicatorWrapper>

        {cardPosition === 'front' && <CardText>{filtered[currentCardIndex].question}</CardText>}
        {cardPosition === 'back' && <CardText>{filtered[currentCardIndex].answer}</CardText>}
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
