import { useEffect, useRef, useState } from 'react';

import * as Notifications from 'expo-notifications';

import { NotificationTypeEnum } from '@stores/models/notifications';
import { saveLastIntervalHoursData } from '@utils/notificationsStorage';

type Props = {
  registerFunction: () => Promise<string | undefined>;
};

const useNotification = ({ registerFunction }: Props) => {
  const [expoPushToken, setExpoPushToken] = useState<string | undefined>('');
  const [notification, setNotification] = useState<Notifications.Notification | boolean>(false);
  const notificationListener = useRef<Notifications.Subscription | null>(null);
  const responseListener = useRef<Notifications.Subscription | null>(null);

  // adds the notification listener and subscriber
  useEffect(() => {
    registerFunction().then((token) => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(
      async (notification) => {
        setNotification(notification);

        const { trigger, content } = notification.request;

        const notIntervalNotification =
          trigger.type !== 'timeInterval' ||
          (content.data &&
            (!content.data.type || content.data.type !== NotificationTypeEnum.INTERVAL));

        if (notIntervalNotification) {
          return;
        }

        const hours = Math.floor(trigger.seconds / 3600);
        await saveLastIntervalHoursData(content.data.memoPackId, hours);
      }
    );

    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log(response);
    });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(notificationListener.current);
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  return { expoPushToken, notification };
};

export default useNotification;
