import { observer } from 'mobx-react';

import { useNotesStore } from '@stores/RootStore/hooks';

import Note from '../Note';

const CreateNote = () => {
  const { createNote, loading } = useNotesStore();

  return (
    <Note
      initialTitle=""
      initialContent=""
      noteAction={createNote}
      alertButtonTitle="Заметка создана"
      loading={loading}
      pageTitle="Создание заметки"
    />
  );
};

export default observer(CreateNote);
