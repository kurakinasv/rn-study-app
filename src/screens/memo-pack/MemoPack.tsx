import { useState, useEffect, useCallback } from 'react';
import { FlatList, Pressable, Text } from 'react-native';

import { Stack, useRouter, useSearchParams } from 'expo-router';
import { observer } from 'mobx-react';

import FloatButton from '@components/FloatButton/FloatButton';
import { routes } from '@config/routes';
import { MemoPackModel } from '@stores/models/memo';
import { useMemoStore } from '@stores/RootStore/hooks';
import { PageView } from '@styles/components';

import { CardInfo, MemoCardContainer } from './MemoPack.styles';

const MemoPack = () => {
  const { packId } = useSearchParams();
  const router = useRouter();
  const { getPackById, loading, getCardsByPackId, cardsFromCurrentPack } = useMemoStore();

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

  return (
    <PageView>
      <Stack.Screen options={{ headerTitle: packInfo.name }} />

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
