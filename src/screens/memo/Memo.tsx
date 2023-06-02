import React, { useCallback, useEffect, useState } from 'react';

import { useRouter } from 'expo-router';
import { observer } from 'mobx-react';

import FloatButton from '@components/FloatButton';
import MemoPacksListItem from '@components/MemoPacksListItem';
import Placeholder from '@components/Placeholder';
import Search from '@components/Search';
import { routes } from '@config/routes';
import { MemoPackModel } from '@stores/models/memo';
import { useMemoStore } from '@stores/RootStore/hooks';
import { CardsList, PageLoader, PageView } from '@styles/components';

const Memo = () => {
  const router = useRouter();

  const { getMemoPacks, loading, memoPacks, currentPack } = useMemoStore();

  useEffect(() => {
    getMemoPacks().then((packs) => setDisplayedPacks(packs));
  }, [memoPacks.length, currentPack]);

  useEffect(() => {
    setDisplayedPacks(memoPacks);
  }, [memoPacks, currentPack]);

  const goToCreatePack = useCallback(() => {
    router.push(routes.createMemoPack);
  }, []);

  const [displayedPacks, setDisplayedPacks] = useState<MemoPackModel[] | null>(null);

  const search = useCallback(
    (text: string) => {
      const filtered = memoPacks.filter(({ name }) => name.includes(text));
      setDisplayedPacks(filtered);
    },
    [memoPacks]
  );

  return (
    <>
      {loading && <PageLoader />}

      <PageView>
        <Search loading={loading} placeholder="Поиск по наборам" onInputText={search} />

        <CardsList
          data={displayedPacks || memoPacks}
          extraData={[memoPacks, displayedPacks]}
          ListEmptyComponent={
            <Placeholder message={!memoPacks.length ? undefined : 'Ничего не найдено'} />
          }
          renderItem={({ item }) => <MemoPacksListItem pack={item} />}
        />

        <FloatButton icon="plus" onPressAction={goToCreatePack} disabled={loading} />
      </PageView>
    </>
  );
};

export default observer(Memo);
