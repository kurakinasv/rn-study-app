import { Alert } from 'react-native';

import { isAxiosError } from 'axios';
import { makeAutoObservable } from 'mobx';

import { api, endpoints } from '@config/api';
import { ILocalStore } from '@hooks/useLocalStore';
import { CreateCardType, EditCardType, MemoCardModel } from '@stores/models/memo';
import { rootStore } from '@stores/RootStore/context';

class MemoCardStore implements ILocalStore {
  card: MemoCardModel | null = null;
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setLoading = (state: boolean) => {
    this.loading = state;
  };

  setCard = (card: MemoCardModel | null) => {
    this.card = card;
  };

  createCard = async ({ question, answer, state, createdAt, memoPackId }: CreateCardType) => {
    const body = {
      question,
      answer,
      state: state || 'new',
      createdAt: createdAt || new Date(),
      memoPackId,
    };

    this.setLoading(true);

    try {
      // todo provide types
      const res = await api.post(endpoints.createMemoCard, body);

      if (res.data) {
        await rootStore.memoStore.getCardsByPackId(memoPackId);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        Alert.alert('createCard Error', error.response?.data.message);
      } else if (error instanceof Error) {
        Alert.alert('Unknown error', error.message);
      }
    }

    this.setLoading(false);
  };

  editCard = async ({ cardId, question, answer, state, memoPackId }: EditCardType) => {
    const body = {
      cardId,
      question,
      answer,
      state,
      memoPackId,
    };

    this.setLoading(true);

    try {
      // todo provide types
      const res = await api.post(endpoints.editMemoCard, body);

      if (res.data) {
        await rootStore.memoStore.getCardsByPackId(memoPackId);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        Alert.alert('editCard Error', error.response?.data.message);
      } else if (error instanceof Error) {
        Alert.alert('Unknown error', error.message);
      }
    }

    this.setLoading(false);
  };

  destroy = () => {
    this.setCard(null);
    this.setLoading(false);
  };
}

export default MemoCardStore;
