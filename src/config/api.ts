import { Platform } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const BASE_URL = 'http://localhost:5000/api';
export const ANDROID_URL = 'http://192.168.1.58:5000/api'; // ! local ip

export const api = axios.create({
  baseURL: Platform.OS === 'android' ? ANDROID_URL : BASE_URL,
});

export const apiPublic = axios.create({
  baseURL: Platform.OS === 'android' ? ANDROID_URL : BASE_URL,
});

api.interceptors.request.use(async (config) => {
  const userJSON = await AsyncStorage.getItem('user');
  const user = userJSON ? JSON.parse(userJSON) : null;

  if (user) {
    const token = user.token;
    config.headers.Authorization = `Bearer ${token || ''}`;
  }

  return config;
});

export const endpoints = {
  login: '/auth/login',
  register: '/auth/register',

  getNotes: '/note/notes',
  createNote: '/note/createNote',
  editNote: '/note/editNote',
  deleteNote: '/note/deleteNote',
};
