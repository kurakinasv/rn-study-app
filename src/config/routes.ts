import { UniqueId } from '@typings/common';

export const routes = {
  notes: '/notes',
  createNote: '/notes/createNote',
  note: (noteId: UniqueId) => `/notes/${noteId}`,

  memo: '/memo',
  createMemoPack: '/memo/createMemoPack',

  memoPack: (packId: UniqueId) => `/memoPacks/${packId}`,
  learning: (packId: UniqueId) => `/memoPacks/${packId}/learning`,
  practice: (packId: UniqueId) => `/memoPacks/${packId}/practice`,
  card: (packId: UniqueId, cardId: UniqueId) => `/memoPacks/${packId}/cards/${cardId}`,
  createMemoCard: `/memoPacks/createMemoCard`,

  groups: '/groups',
  createGroup: '/groups/createGroup',
  group: (groupId: UniqueId) => `/groups/${groupId}`,

  auth: '/auth',
};
