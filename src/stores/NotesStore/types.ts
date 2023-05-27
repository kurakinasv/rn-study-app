import { UniqueId } from '@typings/common';

export type NoteModel = {
  _id: UniqueId;
  title: string;
  content: string;
};

export type NoteApi = {
  _id: UniqueId;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  nextRepetition: Date;
  group: string;
};
