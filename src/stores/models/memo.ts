import { UniqueId } from '@typings/common';

export type MemoCardState = 'difficult' | 'normal' | 'easy' | 'new';

export type CreateMemoType = Pick<MemoPackModel, 'name'> &
  Partial<Omit<MemoPackModel, '_id' | 'name'>>;

export type CreateCardType = Pick<MemoCardModel, 'question' | 'answer'> &
  Partial<Pick<MemoCardModel, 'state' | 'createdAt'>> & { memoPackId: UniqueId };

export type EditCardType = Partial<Pick<MemoCardModel, 'question' | 'answer' | 'state'>> & {
  memoPackId: UniqueId;
  cardId: UniqueId;
};

export type MemoCardModel = {
  _id: UniqueId;
  question: string;
  answer: string;
  state: MemoCardState;
  createdAt: Date;
};

export type MemoPackModel = {
  _id: UniqueId;
  name: string;
  cards: MemoCardModel[];
  createdAt: Date;
  archived: boolean;
  lastRepetition?: Date;
  nextRepetition?: Date;
  group?: UniqueId;
};
