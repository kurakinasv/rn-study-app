import { Alert } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { isAxiosError } from 'axios';
import { makeAutoObservable } from 'mobx';

import { apiPublic, endpoints } from '@config/api';
import { userStorageName } from '@config/storage';
import RootStore from '@stores/RootStore';

class AuthStore {
  private readonly root: RootStore | null = null;

  userId = '';
  token = '';
  isAuth = false;

  constructor(root: RootStore) {
    makeAutoObservable<this, 'root'>(this);
    this.root = root;
  }

  setToken = (token: string) => {
    this.token = token;
  };

  setIsAuth = (state: boolean) => {
    this.isAuth = state;
  };

  init = async () => {
    try {
      const userJSON = await AsyncStorage.getItem(userStorageName);
      const user = userJSON ? JSON.parse(userJSON) : null;

      if (user.userId && user.token) {
        await this.authenticate(user.token, user.userId);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log('Init error', error.message);
      }
    }
  };

  authenticate = async (token: string, userId: string) => {
    await AsyncStorage.setItem(userStorageName, JSON.stringify({ userId, token }));

    this.userId = userId;
    this.setToken(token);
    this.setIsAuth(true);
  };

  login = async (email: string, password: string) => {
    const body = { email, password };

    try {
      const res = await apiPublic.post(endpoints.login, body);

      if (res.data) {
        const { userId, token } = res.data;
        await this.authenticate(token, userId);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        // todo remove Alert
        Alert.alert('Error', error.response?.data.message);
      } else if (error instanceof Error) {
        // todo remove Alert
        Alert.alert('Unknown error', error.message);
      }
    }
  };

  register = async (email: string, password: string) => {
    const body = { email, password };

    try {
      const res = await apiPublic.post(endpoints.register, body);

      if (res.data) {
        await this.login(email, password);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        // todo remove Alert
        Alert.alert('Error', error.response?.data.message);
      } else if (error instanceof Error) {
        // todo remove Alert
        Alert.alert('Unknown error', error.message);
      }
    }
  };

  logout = async () => {
    await AsyncStorage.removeItem(userStorageName);
    this.setIsAuth(false);
    this.setToken('');
    this.userId = '';
  };
}

export default AuthStore;
