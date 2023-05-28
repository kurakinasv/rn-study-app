import React, { useEffect, useCallback } from 'react';
import { FlatList, Alert } from 'react-native';

import { Entypo } from '@expo/vector-icons';
import { Redirect, useRouter } from 'expo-router';
import { observer } from 'mobx-react';
import { Menu, MenuOption, MenuOptions, MenuProvider, MenuTrigger } from 'react-native-popup-menu';

import FloatButton from '@components/FloatButton';
import { routes } from '@config/routes';
import { useAuthStore, useNotesStore } from '@stores/RootStore/hooks';
import { colors } from '@styles/colors';
import { PageView } from '@styles/components';
import { UniqueId } from '@typings/common';

import { NoteContainer, NoteText, StyledLoader } from './Notes.styles';

const Notes = () => {
  const router = useRouter();

  const auth = useAuthStore();
  const { getNotes, notes, deleteNote, loading } = useNotesStore();

  useEffect(() => {
    getNotes();
  }, []);

  const goToCreateNote = useCallback(() => {
    router.push(routes.createNote);
  }, []);

  const handleDelete = (id: UniqueId) => () => {
    Alert.alert(
      'Удалить заметку?',
      '',
      [
        { text: 'Нет', style: 'cancel' },
        { text: 'Да', onPress: () => deleteNote(id), style: 'destructive' },
      ],
      { cancelable: true }
    );
  };

  if (!auth.isAuth) {
    return <Redirect href={routes.auth} />;
  }

  return (
    <MenuProvider>
      {loading && <StyledLoader size="large" color={colors.blue} />}

      <PageView>
        <FlatList
          data={notes}
          renderItem={({ item, index }) => (
            <NoteContainer onPress={() => router.push(routes.note(item._id))}>
              <NoteText>{item.title || `note #${index + 1}`}</NoteText>

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
            </NoteContainer>
          )}
        />

        <FloatButton icon="plus" onPressAction={goToCreateNote} />
      </PageView>
    </MenuProvider>
  );
};

export default observer(Notes);
