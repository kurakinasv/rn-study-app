import { useState, useEffect, useCallback } from 'react';
import { Alert, FlatList, Pressable, Text } from 'react-native';

import { Entypo } from '@expo/vector-icons';
import { Stack, useRouter, useSearchParams } from 'expo-router';
import { observer } from 'mobx-react';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';

import FloatButton from '@components/FloatButton/FloatButton';
import { routes } from '@config/routes';
import { MemoPackModel } from '@stores/models/memo';
import { useMemoStore } from '@stores/RootStore/hooks';
import { colors } from '@styles/colors';
import { PageView } from '@styles/components';
import { UniqueId } from '@typings/common';

import { CardInfo, MemoCardContainer } from './MemoPack.styles';

const MemoPack = () => {
  const { packId } = useSearchParams();
  const router = useRouter();
  const { getPackById, loading, getCardsByPackId, cardsFromCurrentPack, deleteMemoPack } =
    useMemoStore();

  const [packInfo, setPackInfo] = useState<MemoPackModel | null>(null);

  useEffect(() => {
    if (typeof packId === 'string') {
      const foundPack = getPackById(packId);

      if (foundPack) {
        setPackInfo(foundPack);
        getCardsByPackId(packId);
      }
    }
  }, [packId]);

  const goToCreateCard = useCallback(() => {
    router.push({ pathname: routes.createMemoCard, params: { packId } });
  }, []);

  if (!packInfo || typeof packId !== 'string') {
    return null;
  }

  const handleDelete = (id: UniqueId) => () => {
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

  const HeaderRightMenu = () => {
    return (
      <Menu>
        <MenuTrigger
          customStyles={{
            triggerWrapper: { padding: 7, margin: -7 },
          }}
        >
          <Entypo name="dots-three-vertical" size={22} color={colors.white} />
        </MenuTrigger>

        <MenuOptions customStyles={{ optionsContainer: { marginTop: 35 } }}>
          <MenuOption
            text="Удалить"
            onSelect={handleDelete(packId)}
            customStyles={{ optionWrapper: { paddingHorizontal: 12, paddingVertical: 16 } }}
          />
        </MenuOptions>
      </Menu>
    );
  };

  return (
    <PageView>
      <Stack.Screen
        options={{ headerTitle: packInfo.name, headerRight: () => <HeaderRightMenu /> }}
      />

      <Pressable onPress={() => router.push(routes.learning(packId))}>
        <Text>Обучение</Text>
      </Pressable>

      <FlatList
        data={cardsFromCurrentPack}
        renderItem={({ item }) => (
          <MemoCardContainer onPress={() => router.push(routes.card(packId, item._id))}>
            <CardInfo>{item.question}</CardInfo>
            <CardInfo>{item.answer}</CardInfo>
          </MemoCardContainer>
        )}
      />

      <FloatButton icon="plus" onPressAction={goToCreateCard} disabled={loading} />
    </PageView>
  );
};

export default observer(MemoPack);
