import { Alert, Platform } from 'react-native';

import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { makeAutoObservable } from 'mobx';

import { ILocalStore } from '@hooks/useLocalStore';
import {
  NotificationModel,
  NotificationType,
  NotificationTypeEnum,
  ScheduleFunction,
} from '@stores/models/notifications';
import RootStore from '@stores/RootStore';
import { UniqueId } from '@typings/common';
import { saveLastIntervalHoursData } from '@utils/notificationsStorage';

class NotificationService implements ILocalStore {
  private readonly _root: RootStore | null = null;

  notificationsIds: string[] = [];
  notifications: NotificationModel[] = [];

  loading = false;

  constructor(root: RootStore) {
    makeAutoObservable<this, '_root'>(this);
    this._root = root;
  }

  setNotificationsIds = (ids: string[]) => {
    this.notificationsIds = ids;
  };

  setNotifications = (notifications: NotificationModel[]) => {
    this.notifications = notifications;
  };

  setLoading = (state: boolean) => {
    this.loading = state;
  };

  hasMemoNotifications = (packId: UniqueId) => {
    if (!this.notifications || !this.notifications.length) {
      return false;
    }

    const index = this.notifications.findIndex(
      (notif) => notif.type === NotificationTypeEnum.INTERVAL && notif.memoPackId === packId
    );
    return index !== -1;
  };

  registerForPushNotificationsAsync = async () => {
    let token;
    this.setLoading(true);

    try {
      if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();

        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
          // asks for permissions from the user to send the notification
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }

        if (finalStatus !== 'granted') {
          Alert.alert('Failed to get push token for push notification!');
          return;
        }

        token = (
          await Notifications.getExpoPushTokenAsync({
            projectId: '7129a796-ae49-4ee0-8343-d2c20514db32',
          })
        ).data;
      } else {
        console.error('Must use physical device for Push Notifications');
      }

      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          sound: 'default',
          lightColor: '#FF231F7C',
          lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
          bypassDnd: true,
        });
      }

      this.setLoading(false);

      return token;
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
      this.setLoading(false);
    }
  };

  cancelNotification = async (notifId: string) => {
    this.setLoading(true);

    try {
      await Notifications.cancelScheduledNotificationAsync(notifId);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }

    this.setLoading(false);
  };

  cancelMemoPackNotifications = async (memoPackId: UniqueId) => {
    this.setLoading(true);

    try {
      const packNotifications = this.notifications.filter(
        (notif) => notif.memoPackId === memoPackId
      );
      for (const notif of packNotifications) {
        await Notifications.cancelScheduledNotificationAsync(notif.id);
      }
      await this.getScheduledNotifications();
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }

    this.setLoading(false);
  };

  cancelAllNotifications = async () => {
    this.setLoading(true);

    try {
      await Notifications.cancelAllScheduledNotificationsAsync();
      this.setNotifications([]);
      this.setNotificationsIds([]);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }

    this.setLoading(false);
  };

  schedulePushNotification: ScheduleFunction = async (
    hours: number,
    title: string,
    type: NotificationType,
    memoPackId: UniqueId,
    body?: string,
    subTitle?: string
  ) => {
    this.setLoading(true);
    try {
      const subTitleToSet = subTitle ? `[${subTitle}]` : undefined;
      const seconds = hours * 60 * 60;

      const id = await Notifications.scheduleNotificationAsync({
        content: {
          title,
          subtitle: subTitleToSet,
          body,
          data: { type, memoPackId },
        },
        trigger: {
          seconds,
        },
      });

      await saveLastIntervalHoursData(memoPackId, hours);

      this.setNotificationsIds([...this.notificationsIds, id]);
      this.setNotifications([
        ...this.notifications,
        {
          id,
          hours,
          title,
          type,
          memoPackId,
        },
      ]);

      this.setLoading(false);

      return id;
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  getScheduledNotifications = async () => {
    this.setLoading(true);

    try {
      const notificationsApi = await Notifications.getAllScheduledNotificationsAsync();

      const notificationsInfo = notificationsApi.reduce((acc, curr) => {
        const { content, trigger, identifier } = curr;

        const hours = trigger.type === 'timeInterval' ? Math.floor(trigger.seconds / 3600) : 0;

        const normalized: NotificationModel = {
          id: identifier,
          hours,
          title: content.title || '',
          type: content.data?.type,
          memoPackId: content.data?.memoPackId,
        };

        return [...acc, normalized];
      }, [] as NotificationModel[]);

      this.setNotifications(notificationsInfo);
      this.setNotificationsIds(notificationsInfo.map((n) => n.id));
      this.setLoading(false);

      return notificationsInfo;
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  destroy = () => {
    this.setNotifications([]);
    this.setNotificationsIds([]);
    this.setLoading(false);
  };
}

export default NotificationService;
