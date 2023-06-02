import { useEffect, useCallback } from 'react';
import { Alert } from 'react-native';

import { Entypo } from '@expo/vector-icons';
import { Stack, useRouter, useSearchParams } from 'expo-router';
import { observer } from 'mobx-react';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';

import FloatButton from '@components/FloatButton/FloatButton';
import MemoCardStateIndicator from '@components/MemoCardStateIndicator';
import Placeholder from '@components/Placeholder';
import { routes } from '@config/routes';
import { useLocalStore } from '@hooks/useLocalStore';
import MemoCardStore from '@stores/MemoCardStore';
import { useNotification } from '@stores/NotificationService';
import { useMemoStore, useNotificationStore } from '@stores/RootStore/hooks';
import { colors } from '@styles/colors';
import {
  Button,
  ButtonText,
  CardContainer,
  CardsList,
  PageView,
  SectionTitle,
} from '@styles/components';
import { UniqueId } from '@typings/common';
import formatHHmmFromDate from '@utils/formatHHmmFromDate';

import HeaderMenu from './header-menu';
import {
  Answer,
  ButtonsView,
  CardContent,
  Divider,
  InfoCardNumber,
  InfoCards,
  InfoCardText,
  InfoCardView,
  Question,
  cardMenuStyles,
  InfoCardTime,
  InfoDateView,
  CardsTitleView,
  CardsAmount,
} from './MemoPack.styles';

const MemoPack = () => {
  const { packId } = useSearchParams();
  const router = useRouter();

  const { loading, getCardsByPackId, cardsFromCurrentPack, currentPack } = useMemoStore();
  const { deleteCard, loading: cardLoading } = useLocalStore(() => new MemoCardStore());
  const { registerForPushNotificationsAsync } = useNotificationStore();

  useNotification({
    registerFunction: registerForPushNotificationsAsync,
  });

  useEffect(() => {
    if (typeof packId === 'string') {
      getCardsByPackId(packId);
    }
  }, [packId, cardsFromCurrentPack.length]);

  const goToCreateCard = useCallback(() => {
    router.push({ pathname: routes.createMemoCard, params: { packId } });
  }, [packId]);

  if (!currentPack || typeof packId !== 'string') {
    return null;
  }

  const handleDeleteCard = (id: UniqueId) => () => {
    Alert.alert(
      'Удалить карточку?',
      'Это действие нельзя будет отменить',
      [
        { text: 'Нет', style: 'cancel' },
        { text: 'Да', onPress: () => deleteCard(id, packId), style: 'destructive' },
      ],
      { cancelable: true }
    );
  };

  return (
    <PageView>
      <Stack.Screen
        options={{
          headerTitle: currentPack.name,
          headerRight: () => <HeaderMenu packId={packId} />,
        }}
      />

      <InfoCards>
        {currentPack.nextRepetition && (
          <InfoCardView>
            <InfoDateView>
              <InfoCardTime outdated={new Date(currentPack.nextRepetition) < new Date()}>
                {formatHHmmFromDate(new Date(currentPack.nextRepetition))}
              </InfoCardTime>
              <InfoCardNumber outdated={new Date(currentPack.nextRepetition) < new Date()}>
                {new Date(currentPack.nextRepetition).toLocaleDateString()}
              </InfoCardNumber>
            </InfoDateView>
            <InfoCardText>следующее повторение</InfoCardText>
          </InfoCardView>
        )}
        <InfoCardView>
          <InfoDateView>
            {currentPack.lastRepetition ? (
              <>
                <InfoCardTime>
                  {formatHHmmFromDate(new Date(currentPack.lastRepetition))}
                </InfoCardTime>
                <InfoCardNumber>
                  {new Date(currentPack.lastRepetition).toLocaleDateString()}
                </InfoCardNumber>
              </>
            ) : (
              <InfoCardNumber>&mdash;</InfoCardNumber>
            )}
          </InfoDateView>
          <InfoCardText>последнее повторение</InfoCardText>
        </InfoCardView>
      </InfoCards>

      {!!cardsFromCurrentPack.length && (
        <ButtonsView>
          <Button
            onPress={() => router.push(routes.practice(packId))}
            disabled={loading || cardLoading}
          >
            <ButtonText>Практика</ButtonText>
          </Button>
          <Button
            onPress={() => router.push(routes.learning(packId))}
            disabled={loading || cardLoading}
          >
            <ButtonText>Обучение</ButtonText>
          </Button>
        </ButtonsView>
      )}

      <CardsTitleView>
        <SectionTitle>Карточки</SectionTitle>
        <CardsAmount>{currentPack.cards.length}</CardsAmount>
      </CardsTitleView>

      {!!cardsFromCurrentPack.length && (
        <CardsList
          data={cardsFromCurrentPack}
          extraData={cardsFromCurrentPack}
          ListEmptyComponent={<Placeholder />}
          renderItem={({ item }) => (
            <CardContainer onPress={() => router.push(routes.card(packId, item._id))}>
              <CardContent>
                <MemoCardStateIndicator state={item.state} />
                <Question>{item.question}</Question>
                <Divider />
                <Answer>{item.answer}</Answer>
              </CardContent>

              <Menu>
                <MenuTrigger customStyles={cardMenuStyles.trigger}>
                  <Entypo name="dots-three-vertical" size={18} color={colors.textGray} />
                </MenuTrigger>

                <MenuOptions customStyles={cardMenuStyles.options}>
                  <MenuOption
                    text="Удалить"
                    onSelect={handleDeleteCard(item._id)}
                    customStyles={cardMenuStyles.option}
                  />
                </MenuOptions>
              </Menu>
            </CardContainer>
          )}
        />
      )}

      <FloatButton
        icon="plus"
        onPressAction={goToCreateCard}
        disabled={cardLoading}
        loading={cardLoading}
      />
    </PageView>
  );
};

export default observer(MemoPack);
