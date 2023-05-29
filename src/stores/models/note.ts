import { DateString, UniqueId } from '@typings/common';

export enum InputType {
  TITLE = 'title',
  CONTENT = 'content',
}

export type NoteModel = {
  _id: UniqueId;
  title: string;
  content: string;
  createdAt: DateString;
  nextRepetition?: DateString;
  group?: UniqueId;
  groupName?: string;
};

export type NoteApi = {
  _id: UniqueId;
  title: string;
  content: string;
  createdAt: DateString;
  updatedAt: DateString;
  nextRepetition: DateString;
  group: UniqueId;
};
