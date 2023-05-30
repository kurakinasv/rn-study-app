import { UniqueId } from '@typings/common';

import { MemoPackModel } from './memo';
import { NoteApi } from './note';

export type UserModel = {
  email: string;
  username?: string;
};

export type UserApi = {
  _id: UniqueId;
  email: string;
  password: string;
  username?: string;
  notes: NoteApi[];
  memoPacks: MemoPackModel[];
};
