import { useEffect, useState, useCallback } from 'react';
import { Vibration } from 'react-native';

import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { observer } from 'mobx-react';

import FloatButton from '@components/FloatButton';
import Placeholder from '@components/Placeholder/Placeholder';
import Search from '@components/Search';
import { routes } from '@config/routes';
import { GroupModel } from '@stores/models/group';
import { useGroupsStore, useMemoStore, useNotesStore } from '@stores/RootStore/hooks';
import { colors } from '@styles/colors';
import { CardInfo, CardTitle, CardView, CardsList, PageLoader, PageView } from '@styles/components';
import { UniqueId } from '@typings/common';
import localizeElementsAmount from '@utils/localizeElementsAmount';

import { GroupContainer } from './Groups.styles';

const Groups = () => {
  const router = useRouter();

  const { groups, loading, getGroups } = useGroupsStore();
  const { getMemoPacks, memoPacks } = useMemoStore();
  const { getNotes, notes } = useNotesStore();

  const [displayedGroups, setDisplayedGroups] = useState<GroupModel[]>([]);

  useEffect(() => {
    setDisplayedGroups(groups);
  }, [groups]);

  const init = async () => {
    await getGroups().then((groups) => setDisplayedGroups(groups));

    if (!memoPacks.length) {
      await getMemoPacks();
    }
    if (!notes.length) {
      await getNotes();
    }
  };

  useEffect(() => {
    init();
  }, []);

  const goToCreateGroup = useCallback(() => {
    router.push(routes.createGroup);
  }, []);

  const goToGroup = useCallback(
    (id: UniqueId) => () => {
      Vibration.vibrate(100);
      router.push(routes.group(id));
    },
    []
  );

  return (
    <>
      {loading && <PageLoader size="large" />}

      <PageView>
        <Search
          loading={loading}
          onInputText={(text: string) => {
            const filtered = groups.filter(({ name }) => name.includes(text));
            setDisplayedGroups(filtered);
          }}
          placeholder="Поиск по группам"
        />

        <CardsList
          data={displayedGroups}
          ListEmptyComponent={
            <Placeholder message={!groups.length ? undefined : 'Ничего не найдено'} />
          }
          renderItem={({ item }) => (
            <GroupContainer onPress={goToGroup(item._id)}>
              <CardView>
                <CardTitle>{item.name}</CardTitle>
                <CardInfo>
                  {item.memoPacks.length + item.notes.length}{' '}
                  {localizeElementsAmount(item.memoPacks.length + item.notes.length)}
                </CardInfo>
              </CardView>

              <Feather name="chevron-right" size={32} color={colors.textGray} />
            </GroupContainer>
          )}
        />

        <FloatButton icon="plus" onPressAction={goToCreateGroup} disabled={loading} />
      </PageView>
    </>
  );
};

export default observer(Groups);
