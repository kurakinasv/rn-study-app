import React, { useEffect, useCallback } from 'react';

import { Redirect, useRouter } from 'expo-router';
import { observer } from 'mobx-react';
import { MenuProvider } from 'react-native-popup-menu';

import FloatButton from '@components/FloatButton';
import NotesListItem from '@components/NotesListItem';
import Placeholder from '@components/Placeholder';
import { routes } from '@config/routes';
import { useAuthStore, useNotesStore } from '@stores/RootStore/hooks';
import { colors } from '@styles/colors';
import { CardsList as NotesList, PageLoader, PageView } from '@styles/components';

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

  if (!auth.isAuth) {
    return <Redirect href={routes.auth} />;
  }

  return (
    <MenuProvider>
      {!!loading && <PageLoader size="large" color={colors.blue} />}

      <PageView>
        <NotesList
          data={notes}
          extraData={notes}
          ListEmptyComponent={<Placeholder />}
          renderItem={({ item }) => (
            <NotesListItem note={item} onDeleteNote={() => deleteNote(item._id)} />
          )}
        />

        <FloatButton icon="plus" onPressAction={goToCreateNote} />
      </PageView>
    </MenuProvider>
  );
};

export default observer(Notes);
