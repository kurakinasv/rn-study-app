import { Alert } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { isAxiosError } from 'axios';
import { makeAutoObservable } from 'mobx';

import { api, apiPublic, endpoints } from '@config/api';
import { userStorageName } from '@config/storage';
import { UserApi, UserModel } from '@stores/models/user';
import RootStore from '@stores/RootStore';

class AuthStore {
  private readonly root: RootStore | null = null;

  userId = '';
  token = '';
  isAuth = false;
  loading = false;
  user: UserModel | null = null;

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

  setLoading = (state: boolean) => {
    this.loading = state;
  };

  setUser = (user: UserModel) => {
    this.user = user;
  };

  init = async () => {
    this.setLoading(true);

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

    this.setLoading(false);
  };

  authenticate = async (token: string, userId: string) => {
    await AsyncStorage.setItem(userStorageName, JSON.stringify({ userId, token }));

    this.userId = userId;
    this.setToken(token);
    this.setIsAuth(true);
  };

  login = async (email: string, password: string) => {
    const body = { email, password };

    this.setLoading(true);

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
    this.setLoading(false);
  };

  register = async (email: string, password: string) => {
    const body = { email, password };

    this.setLoading(true);

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

    this.setLoading(false);
  };

  getUser = async () => {
    this.setLoading(true);

    try {
      const res = await api.get<UserApi>(endpoints.user);

      if (res.data) {
        const { email, username } = res.data;
        this.setUser({ email, username });
        this.setLoading(false);
        return { email, username };
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

  editUser = async (username: string) => {
    this.setLoading(true);

    try {
      const res = await api.post(endpoints.editUser, { username: username.trim() });

      if (res.data && this.user) {
        this.setUser({ ...this.user, username: res.data.username });
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

  logout = async () => {
    this.setLoading(true);
    await AsyncStorage.removeItem(userStorageName);
    this.setIsAuth(false);
    this.setToken('');
    this.userId = '';
    this.setLoading(false);
  };
}

export default AuthStore;
