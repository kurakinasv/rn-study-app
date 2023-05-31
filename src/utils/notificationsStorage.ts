import AsyncStorage from '@react-native-async-storage/async-storage';

import { intervalHoursStorage } from '@config/storage';
import { UniqueId } from '@typings/common';

export const saveLastIntervalHoursData = async (memoPackId: UniqueId, hours: number | null) => {
  const storageItem = await AsyncStorage.getItem(intervalHoursStorage);

  if (!storageItem) {
    await AsyncStorage.setItem(intervalHoursStorage, JSON.stringify({ [memoPackId]: hours }));
    return;
  }

  const parsed = JSON.parse(storageItem);

  if (hours === null) {
    delete parsed[memoPackId];
    await AsyncStorage.setItem(intervalHoursStorage, JSON.stringify(parsed));
    return;
  }

  await AsyncStorage.setItem(
    intervalHoursStorage,
    JSON.stringify({ ...parsed, [memoPackId]: hours })
  );
};

export const getLastIntervalHours = async (memoPackId: UniqueId) => {
  const storageItem = await AsyncStorage.getItem(intervalHoursStorage);

  if (!storageItem) {
    return null;
  }

  const parsed: Record<UniqueId, number> = JSON.parse(storageItem);
  return parsed[memoPackId];
};
