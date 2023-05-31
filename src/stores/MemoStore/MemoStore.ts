import { Alert } from 'react-native';

import { isAxiosError } from 'axios';
import { makeAutoObservable } from 'mobx';

import { api, endpoints } from '@config/api';
import {
  CreateMemoType,
  EditMemoPackType,
  MemoCardModel,
  MemoPackModel,
} from '@stores/models/memo';
import RootStore from '@stores/RootStore';
import { UniqueId } from '@typings/common';

class MemoStore {
  private readonly root: RootStore | null = null;

  loading = false;
  memoPacks: MemoPackModel[] = [];

  private _tempCards: MemoCardModel[] = [];
  private _tempCurrentPack: MemoPackModel | null = null;

  constructor(root: RootStore) {
    makeAutoObservable<this, 'root'>(this);
    this.root = root;
  }

  get cardsFromCurrentPack() {
    return this._tempCards;
  }

  get currentPack() {
    return this._tempCurrentPack;
  }

  setLoading = (state: boolean) => {
    this.loading = state;
  };

  setMemoPacks = (packs: MemoPackModel[]) => {
    this.memoPacks = packs;
  };

  setTempCards = (cards: MemoCardModel[]) => {
    this._tempCards = cards;
  };

  setCurrentPack = (id: UniqueId) => {
    this._tempCurrentPack = this.getPackById(id) || null;
  };

  getPackById = (id: UniqueId) => {
    return this.memoPacks.find(({ _id }) => _id === id);
  };

  getCardsByPackId = async (id: UniqueId) => {
    this.setLoading(true);

    try {
      const res = await api.get(`${endpoints.getAllCards}?packId=${id}`);

      if (res.data) {
        this.setTempCards(res.data);
        this.setCurrentPack(id);
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

  getMemoPacks = async () => {
    this.setLoading(true);

    try {
      // todo provide types
      const res = await api.get(endpoints.getMemoPacks);

      if (res.data) {
        this.setMemoPacks(res.data);
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

  createMemoPack = async ({
    name,
    cards,
    lastRepetition,
    nextRepetition,
    createdAt,
    archived = false,
    group: groupId,
  }: CreateMemoType) => {
    const body = {
      name,
      cards: cards || [],
      lastRepetition,
      nextRepetition,
      createdAt: createdAt || new Date(),
      archived: archived || false,
      groupId,
    };

    this.setLoading(true);

    try {
      // todo provide types
      const res = await api.post(endpoints.createMemoPack, body);

      if (res.data) {
        this.setMemoPacks([...this.memoPacks, res.data]);
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

  editMemoPack = async ({
    packId,
    name,
    lastRepetition,
    nextRepetition,
    archived,
    cards,
    groupId,
  }: EditMemoPackType) => {
    const body = {
      packId,
      name,
      lastRepetition,
      nextRepetition,
      archived,
      cards,
      groupId,
    };

    this.setLoading(true);

    try {
      // todo provide types
      const res = await api.post(endpoints.editMemoPack, body);

      if (res.data) {
        await this.getMemoPacks();

        if (this.currentPack?._id === packId) {
          this.setCurrentPack(packId);
        }
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

  deleteMemoPack = async (toDeleteId: UniqueId) => {
    this.setLoading(true);

    try {
      await api.delete(endpoints.deleteMemoPack + toDeleteId);

      const newSet = this.memoPacks.filter(({ _id }) => _id !== toDeleteId);

      this.setMemoPacks(newSet);
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

export default MemoStore;
