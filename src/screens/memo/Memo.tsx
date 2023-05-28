import React, { useCallback, useEffect } from 'react';
import { Alert } from 'react-native';

import { Entypo } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { observer } from 'mobx-react';
import { FlatList } from 'react-native-gesture-handler';
import { Menu, MenuOption, MenuOptions, MenuProvider, MenuTrigger } from 'react-native-popup-menu';

import FloatButton from '@components/FloatButton';
import { useMemoStore } from '@stores/RootStore/hooks';
import { colors } from '@styles/colors';
import { PageView } from '@styles/components';
import { UniqueId } from '@typings/common';

import { MemoPacksContainer, PackInfo } from './Memo.styles';

const Memo = () => {
  const router = useRouter();

  const { getMemoPacks, loading, memoPacks, deleteMemoPack } = useMemoStore();

  useEffect(() => {
    getMemoPacks();
  }, []);

  const goToCreatePack = useCallback(() => {
    router.push('/memo/createMemoPack');
  }, []);

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

  return (
    <PageView>
      <MenuProvider skipInstanceCheck>
        <FlatList
          data={memoPacks}
          renderItem={({ item }) => (
            <MemoPacksContainer onPress={() => router.push(`/memoPacks/${item._id}`)}>
              <PackInfo>{item.name}</PackInfo>

              <Menu>
                <MenuTrigger
                  customStyles={{
                    triggerWrapper: { padding: 7, margin: -7 },
                  }}
                >
                  <Entypo name="dots-three-vertical" size={18} color={colors.textGray} />
                </MenuTrigger>

                <MenuOptions customStyles={{ optionsContainer: { marginTop: -65 } }}>
                  <MenuOption
                    text="Удалить"
                    onSelect={handleDelete(item._id)}
                    customStyles={{ optionWrapper: { paddingHorizontal: 12, paddingVertical: 16 } }}
                  />
                </MenuOptions>
              </Menu>
            </MemoPacksContainer>
          )}
        />
      </MenuProvider>

      <FloatButton icon="plus" onPressAction={goToCreatePack} disabled={loading} />
    </PageView>
  );
};

export default observer(Memo);
