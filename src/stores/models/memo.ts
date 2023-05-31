import { DateString, UniqueId } from '@typings/common';

export type MemoCardState = 'difficult' | 'normal' | 'easy' | 'new';

export type CreateMemoType = Pick<MemoPackModel, 'name'> &
  Partial<Omit<MemoPackModel, '_id' | 'name'>>;

export type EditMemoPackType = Partial<
  Pick<MemoPackModel, 'name' | 'archived' | 'lastRepetition' | 'cards'>
> & {
  packId: UniqueId;
  groupId?: UniqueId;
  nextRepetition?: DateString | null;
};

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
  createdAt: DateString;
};

export type MemoPackModel = {
  _id: UniqueId;
  name: string;
  cards: MemoCardModel[];
  createdAt: DateString;
  archived: boolean;
  lastRepetition?: DateString;
  nextRepetition?: DateString;
  group?: UniqueId;
  groupName?: string;
};
