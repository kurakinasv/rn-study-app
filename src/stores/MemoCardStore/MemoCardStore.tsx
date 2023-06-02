import { Alert } from 'react-native';

import { isAxiosError } from 'axios';
import { makeAutoObservable } from 'mobx';

import { api, endpoints } from '@config/api';
import { ILocalStore } from '@hooks/useLocalStore';
import { CreateCardType, EditCardType, MemoCardModel } from '@stores/models/memo';
import { rootStore } from '@stores/RootStore/context';
import { UniqueId } from '@typings/common';

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
      const res = await api.post(endpoints.createMemoCard, body);

      if (res.data) {
        await rootStore.memoStore.getMemoPacks();
        await rootStore.memoStore.getCardsByPackId(memoPackId);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        Alert.alert('Ошибка', error.response?.data.message);
      } else if (error instanceof Error) {
        Alert.alert('Неизвестная ошибка', error.message);
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
      const res = await api.post(endpoints.editMemoCard, body);

      if (res.data) {
        await rootStore.memoStore.getCardsByPackId(memoPackId);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        Alert.alert('Ошибка', error.response?.data.message);
      } else if (error instanceof Error) {
        Alert.alert('Неизвестная ошибка', error.message);
      }
    }

    this.setLoading(false);
  };

  deleteCard = async (toDeleteId: UniqueId, packId: UniqueId) => {
    this.setLoading(true);

    try {
      await api.delete(endpoints.deleteMemoCard + toDeleteId);
      await rootStore.memoStore.getMemoPacks();
      await rootStore.memoStore.getCardsByPackId(packId);
    } catch (error) {
      if (isAxiosError(error)) {
        Alert.alert('Ошибка', error.response?.data.message);
      } else if (error instanceof Error) {
        Alert.alert('Неизвестная ошибка', error.message);
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
