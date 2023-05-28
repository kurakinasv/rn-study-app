import { Alert } from 'react-native';

import { isAxiosError } from 'axios';
import { makeAutoObservable } from 'mobx';

import { api, endpoints } from '@config/api';
import { NoteModel } from '@stores/models/note';
import RootStore from '@stores/RootStore';
import { UniqueId } from '@typings/common';

class NotesStore {
  private readonly root: RootStore | null = null;

  notes: NoteModel[] = [];
  loading = false;

  constructor(root: RootStore) {
    makeAutoObservable<this, 'root'>(this);
    this.root = root;
  }

  setNotes = (notes: NoteModel[]) => {
    this.notes = notes;
  };

  setLoading = (state: boolean) => {
    this.loading = state;
  };

  getNoteById = (id: UniqueId) => {
    return this.notes.find(({ _id }) => _id === id);
  };

  getNotes = async () => {
    this.setLoading(true);

    try {
      // todo provide types
      const res = await api.get(endpoints.getNotes);

      if (res.data) {
        this.setNotes(res.data);
        this.setLoading(false);
        return res.data;
      }
    } catch (error) {
      if (isAxiosError(error)) {
        Alert.alert('Error', error.response?.data.message);
      } else if (error instanceof Error) {
        Alert.alert('Unknown error', error.message);
      }

      this.setLoading(false);
    }
  };

  createNote = async (title: string, content: string, nextRepetition?: Date, group?: string) => {
    const body = {
      title,
      content,
      createdAt: new Date(),
      updatedAt: new Date(),
      nextRepetition,
      group,
    };

    this.setLoading(true);

    try {
      // todo provide types
      const res = await api.post(endpoints.createNote, body);

      if (res.data) {
        this.setNotes([...this.notes, res.data]);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        Alert.alert('Error', error.response?.data.message);
      } else if (error instanceof Error) {
        Alert.alert('Unknown error', error.message);
      }
    }

    this.setLoading(false);
  };

  editNote = async (
    noteId: UniqueId,
    title: string,
    content: string,
    nextRepetition?: Date,
    group?: string
  ) => {
    const body = {
      noteId,
      title,
      content,
      updatedAt: new Date(),
      nextRepetition,
      group,
    };

    this.setLoading(true);

    try {
      // todo provide types
      const res = await api.post(endpoints.editNote, body);

      if (res.data) {
        const editedNote = this.notes.findIndex((note) => note._id === noteId);
        const newSet = this.notes.map((el) => el);
        newSet.splice(editedNote, 1, res.data);

        this.setNotes(newSet);
        this.setLoading(false);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        Alert.alert('Error', error.response?.data.message);
      } else if (error instanceof Error) {
        Alert.alert('Unknown error', error.message);
      }

      this.setLoading(false);
    }
  };

  deleteNote = async (toDeleteId: UniqueId) => {
    this.setLoading(true);

    try {
      await api.delete(endpoints.deleteNote + toDeleteId);

      const newSet = this.notes.filter(({ _id }) => _id !== toDeleteId);

      this.setNotes(newSet);
    } catch (error) {
      if (isAxiosError(error)) {
        Alert.alert('Error', error.response?.data.message);
      } else if (error instanceof Error) {
        Alert.alert('Unknown error', error.message);
      }
    }

    this.setLoading(false);
  };
}

export default NotesStore;
