import { DateString, UniqueId } from '@typings/common';

import { MemoPackModel } from './memo';
import { NoteModel } from './note';

export enum EditMode {
  DEFAULT = 'default',
  EDIT = 'edit',
}

export type GroupModel = {
  _id: UniqueId;
  name: string;
  notes: NoteModel[];
  memoPacks: MemoPackModel[];
  deadline: DateString;
  createdAt: DateString;
  archived: boolean;
};
