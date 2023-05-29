import { useEffect, useCallback } from 'react';
import { Alert } from 'react-native';

import { Entypo } from '@expo/vector-icons';
import { Stack, useRouter, useSearchParams } from 'expo-router';
import { observer } from 'mobx-react';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';

import FloatButton from '@components/FloatButton/FloatButton';
import MemoCardStateIndicator from '@components/MemoCardStateIndicator/MemoCardStateIndicator';
import { routes } from '@config/routes';
import { useLocalStore } from '@hooks/useLocalStore';
import MemoCardStore from '@stores/MemoCardStore/MemoCardStore';
import { useMemoStore } from '@stores/RootStore/hooks';
import { colors } from '@styles/colors';
import { CardContainer, CardsList, PageView, SectionTitle } from '@styles/components';
import { UniqueId } from '@typings/common';
import localizeCardAmount from '@utils/localizeCardAmount';

import {
  Answer,
  Button,
  ButtonsView,
  ButtonText,
  CardContent,
  Divider,
  InfoCardNumber,
  InfoCards,
  InfoCardText,
  InfoCardView,
  headerMenuStyles,
  Question,
  cardMenuStyles,
} from './MemoPack.styles';

const MemoPack = () => {
  const { packId } = useSearchParams();
  const router = useRouter();

  const { loading, getCardsByPackId, cardsFromCurrentPack, deleteMemoPack, currentPack } =
    useMemoStore();
  const { deleteCard } = useLocalStore(() => new MemoCardStore());

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

  const handleDeletePack = (id: UniqueId) => () => {
    Alert.alert(
      'Удалить набор?',
      'Также будут удалены все карточки, которые в нём находятся',
      [
        { text: 'Нет', style: 'cancel' },
        { text: 'Да', onPress: () => deleteMemoPack(id), style: 'destructive' },
      ],
      { cancelable: true }
    );
  };

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

  const HeaderRightMenu = () => {
    return (
      <Menu>
        <MenuTrigger customStyles={headerMenuStyles.trigger}>
          <Entypo name="dots-three-vertical" size={22} color={colors.white} />
        </MenuTrigger>

        <MenuOptions customStyles={headerMenuStyles.options}>
          <MenuOption
            text="Удалить"
            onSelect={handleDeletePack(packId)}
            customStyles={headerMenuStyles.option}
          />
        </MenuOptions>
      </Menu>
    );
  };

  return (
    <PageView>
      <Stack.Screen
        options={{ headerTitle: currentPack.name, headerRight: () => <HeaderRightMenu /> }}
      />

      <InfoCards>
        {currentPack.nextRepetition && (
          <InfoCardView>
            <InfoCardNumber>
              {new Date(currentPack.nextRepetition).toLocaleDateString()}
            </InfoCardNumber>
            <InfoCardText>следующее повторение</InfoCardText>
          </InfoCardView>
        )}
        <InfoCardView>
          <InfoCardNumber>{currentPack.cards.length}</InfoCardNumber>
          <InfoCardText>{localizeCardAmount(currentPack.cards.length)}</InfoCardText>
        </InfoCardView>
      </InfoCards>

      <ButtonsView>
        <Button onPress={() => router.push(routes.learning(packId))}>
          <ButtonText>Практика</ButtonText>
        </Button>
      </ButtonsView>

      <SectionTitle>Карточки</SectionTitle>

      <CardsList
        data={cardsFromCurrentPack}
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

      <FloatButton
        icon="plus"
        onPressAction={goToCreateCard}
        disabled={loading}
        loading={loading}
      />
    </PageView>
  );
};

export default observer(MemoPack);
