import React, { useCallback, useEffect, useState } from 'react';

import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { observer } from 'mobx-react';

import FloatButton from '@components/FloatButton';
import { routes } from '@config/routes';
import { MemoPackModel } from '@stores/models/memo';
import { useMemoStore } from '@stores/RootStore/hooks';
import { colors } from '@styles/colors';
import { CardInfo, CardTitle, CardView, CardsList, PageLoader, PageView } from '@styles/components';

import { MemoPackContainer, SearchInput } from './Memo.styles';

const Memo = () => {
  const router = useRouter();

  const { getMemoPacks, loading, memoPacks } = useMemoStore();

  useEffect(() => {
    getMemoPacks();
  }, []);

  const goToCreatePack = useCallback(() => {
    router.push(routes.createMemoPack);
  }, []);

  const localizeCardAmount = useCallback((size: number) => {
    if (size === 1) {
      return 'карточка';
    }
    if (size === 2 || size === 3 || size === 4) {
      return 'карточки';
    }
    return 'карточек';
  }, []);

  const [searchQuery, setSearchQuery] = useState('');
  const [displayedPacks, setDisplayedPacks] = useState<MemoPackModel[] | null>(null);

  const search = useCallback(
    (text: string) => {
      setSearchQuery(text);
      const filtered = memoPacks.filter(({ name }) => name.includes(text));
      setDisplayedPacks(filtered);
    },
    [memoPacks]
  );

  return (
    <>
      {loading && <PageLoader />}

      <PageView>
        <SearchInput
          editable={!loading}
          inputMode="search"
          onChangeText={search}
          value={searchQuery}
          placeholder="Поиск по наборам"
          blurOnSubmit={true}
        />

        <CardsList
          data={displayedPacks ? displayedPacks : memoPacks}
          extraData={[memoPacks, displayedPacks]}
          renderItem={({ item }) => (
            <MemoPackContainer onPress={() => router.push(routes.memoPack(item._id))}>
              <CardView>
                <CardTitle>{item.name}</CardTitle>
                <CardInfo>
                  {item.cards.length} {localizeCardAmount(item.cards.length)}
                </CardInfo>
              </CardView>

              <Feather name="chevron-right" size={32} color={colors.textGray} />
            </MemoPackContainer>
          )}
        />

        <FloatButton icon="plus" onPressAction={goToCreatePack} disabled={loading} />
      </PageView>
    </>
  );
};

export default observer(Memo);
