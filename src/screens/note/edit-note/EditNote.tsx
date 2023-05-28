import { useEffect, useState } from 'react';

import { useSearchParams } from 'expo-router';
import { observer } from 'mobx-react';

import { NoteModel } from '@stores/models/note';
import { useNotesStore } from '@stores/RootStore/hooks';

import Note from '../Note';

const EditNote = () => {
  const { noteId } = useSearchParams();
  const { getNoteById, editNote, loading } = useNotesStore();

  const [note, setNote] = useState<NoteModel | null>(null);

  const saveNote = async (title: string, content: string) => {
    const toEditId = noteId;

    if (typeof toEditId !== 'string') {
      return;
    }

    await editNote(toEditId, title, content);
  };

  const [initialNote, setInitialNote] = useState({
    title: '',
    content: '',
  });

  useEffect(() => {
    if (typeof noteId === 'string') {
      const foundNote = getNoteById(noteId);

      if (foundNote) {
        setNote(foundNote);
        setInitialNote({ title: foundNote.title, content: foundNote.content });
      }
    }
  }, [noteId]);

  return note ? (
    <Note
      initialTitle={initialNote.title}
      initialContent={initialNote.content}
      noteAction={saveNote}
      alertButtonTitle="Заметка сохранена"
      loading={loading}
      pageTitle="Заметка"
      date={note.createdAt}
    />
  ) : null;
};

export default observer(EditNote);
