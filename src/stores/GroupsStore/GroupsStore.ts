import { Alert } from 'react-native';

import { isAxiosError } from 'axios';
import { makeAutoObservable } from 'mobx';

import { api, endpoints } from '@config/api';
import { GroupModel } from '@stores/models/group';
import { MemoPackModel } from '@stores/models/memo';
import { NoteModel } from '@stores/models/note';
import RootStore from '@stores/RootStore';
import { DateString, UniqueId } from '@typings/common';

class GroupsStore {
  private readonly _root: RootStore | null = null;

  groups: GroupModel[] = [];
  loading = false;

  private _currentGroup: GroupModel | null = null;

  constructor(root: RootStore) {
    makeAutoObservable<this, '_root'>(this);
    this._root = root;
  }

  get currentGroup() {
    return this._currentGroup;
  }

  setLoading = (state: boolean) => {
    this.loading = state;
  };

  setGroups = (groups: GroupModel[]) => {
    this.groups = groups;
  };

  setCurrentGroup = (group: GroupModel) => {
    this._currentGroup = group;
  };

  getGroups = async () => {
    this.setLoading(true);

    try {
      const res = await api.get(endpoints.getGroups);

      if (res.data) {
        if (this.currentGroup) {
          this.setCurrentGroup(
            res.data.find((group: GroupModel) => group._id === this.currentGroup?._id)
          );
        }

        this.setGroups(res.data);
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

  createGroup = async ({
    name,
    memoPacks,
    notes,
    deadline,
    createdAt,
    archived,
  }: {
    name: string;
    memoPacks?: UniqueId[];
    notes?: UniqueId[];
    deadline?: DateString;
    createdAt?: DateString;
    archived?: boolean;
  }) => {
    const body = {
      name,
      memoPacks,
      notes,
      deadline,
      createdAt: createdAt || new Date(),
      archived: archived || false,
    };

    this.setLoading(true);

    try {
      const res = await api.post(endpoints.createGroup, body);

      if (res.data) {
        this.setGroups([...this.groups, res.data]);
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

  // to add one note or memo pack
  addGroupElement = async ({
    groupId,
    noteId,
    packId,
  }: {
    groupId: UniqueId;
    noteId?: UniqueId;
    packId?: UniqueId;
  }) => {
    this.setLoading(true);

    try {
      let groupNotes;
      let groupMemoPacks;

      if (noteId) {
        const noteToEditGroupId = this._root?.notesStore.notes.find(
          ({ _id }) => _id === noteId
        )?.group;

        // deleting note from old group
        if (noteToEditGroupId) {
          const notesFromOldGroup = this.groups.find(({ _id }) => _id === noteToEditGroupId)?.notes;
          const removeNoteFromOldGroup = notesFromOldGroup?.filter(({ _id }) => _id !== noteId);

          await api.post(endpoints.editGroup, {
            groupId: noteToEditGroupId,
            notes: removeNoteFromOldGroup,
          });
        }

        await this._root?.notesStore.editNote(noteId, undefined, undefined, undefined, groupId);
        const notes = await this._root?.notesStore.getNotes();
        groupNotes = notes.filter((note: NoteModel) => note.group === groupId);
      }

      if (packId) {
        const memoToEditGroupId = this._root?.memoStore.memoPacks.find(
          ({ _id }) => _id === packId
        )?.group;

        // deleting memo pack from old group
        if (memoToEditGroupId) {
          const memoFromOldGroup = this.groups.find(
            ({ _id }) => _id === memoToEditGroupId
          )?.memoPacks;
          const removeMemoFromOldGroup = memoFromOldGroup?.filter(({ _id }) => _id !== packId);

          await api.post(endpoints.editGroup, {
            groupId: memoToEditGroupId,
            memoPacks: removeMemoFromOldGroup,
          });
        }

        await this._root?.memoStore.editMemoPack({ packId, groupId });
        const memoPacks = await this._root?.memoStore.getMemoPacks();
        groupMemoPacks = memoPacks.filter((pack: MemoPackModel) => pack.group === groupId);
      }

      const body = {
        groupId,
        notes: groupNotes,
        memoPacks: groupMemoPacks,
      };

      // todo provide types
      const res = await api.post(endpoints.editGroup, body);

      if (res.data) {
        const editedGroup = this.groups.findIndex((group) => group._id === groupId);
        const newSet = this.groups.map((el) => el);
        newSet.splice(editedGroup, 1, res.data);

        this.setGroups(newSet);
        this.setCurrentGroup(res.data);
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

  removeElements = async (
    groupId: UniqueId,
    notesToRemove?: UniqueId[],
    memoPacksToRemove?: UniqueId[]
  ) => {
    this.setLoading(true);

    try {
      if (notesToRemove) {
        // delete that group id on notes in 'notesToRemove'
        for (const noteId of notesToRemove) {
          await this._root?.notesStore.editNote(noteId, undefined, undefined, undefined, null);
        }
      }

      // delete that group id on memo packs in 'memoPacksToRemove'
      if (memoPacksToRemove) {
        for (const packId of memoPacksToRemove) {
          await this._root?.memoStore.editMemoPack({ packId, groupId: null });
        }
      }

      const currentGroup = this.groups.find((group) => group._id === groupId);

      // filter only not deleted notesIds
      const notesToKeep = currentGroup?.notes.filter((note) => !notesToRemove?.includes(note._id));
      // filter only not deleted memoPacksIds
      const packsToKeep = currentGroup?.memoPacks.filter(
        (pack) => !memoPacksToRemove?.includes(pack._id)
      );

      // edit group with filtered ids
      const body = {
        groupId,
        notes: notesToKeep,
        memoPacks: packsToKeep,
      };

      const res = await api.post(endpoints.editGroup, body);

      if (res.data) {
        const editedGroup = this.groups.findIndex((group) => group._id === groupId);
        const newSet = this.groups.map((el) => el);
        newSet.splice(editedGroup, 1, res.data);

        this.setGroups(newSet);
        this.setCurrentGroup(res.data);
        this.setLoading(false);
        return newSet.find((gr) => gr._id === groupId);
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

  deleteGroup = async (toDeleteId: UniqueId) => {
    this.setLoading(true);

    try {
      await api.delete(endpoints.deleteGroup + toDeleteId);

      const newSet = this.groups.filter(({ _id }) => _id !== toDeleteId);

      this.setGroups(newSet);
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

export default GroupsStore;
