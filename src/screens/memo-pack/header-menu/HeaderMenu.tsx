import { FC, useState, useCallback, useEffect, memo } from 'react';
import { Alert } from 'react-native';

import { Entypo } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';

import { routes } from '@config/routes';
import {
  IntervalNotificationConfig,
  IntervalNotificationHours,
} from '@stores/models/notifications';
import { useMemoStore, useNotificationStore } from '@stores/RootStore/hooks';
import { colors } from '@styles/colors';
import { UniqueId } from '@typings/common';
import { getDateAfterSomeHours } from '@utils/getDateAfterTime';
import { getLastIntervalHours, saveLastIntervalHoursData } from '@utils/notificationsStorage';

import { headerMenuStyles } from './HeaderMenu.styles';

type Props = {
  packId: UniqueId;
};

const HeaderMenu: FC<Props> = ({ packId }) => {
  const router = useRouter();

  const { schedulePushNotification, getScheduledNotifications, cancelMemoPackNotifications } =
    useNotificationStore();

  const { cardsFromCurrentPack, deleteMemoPack, currentPack, editMemoPack } = useMemoStore();

  const [intervalStarted, setIntervalStarted] = useState(false);

  const initIntervalStarted = useCallback(async () => {
    await getScheduledNotifications();
    const hours = await getLastIntervalHours(String(packId));

    if (!hours) {
      await editMemoPack({ packId: String(packId), nextRepetition: null });
    }
    setIntervalStarted(!!hours);
  }, [packId]);

  useEffect(() => {
    initIntervalStarted();
  }, []);

  const startNotificationRepeat = useCallback(async () => {
    if (typeof packId !== 'string') {
      return;
    }
    setIntervalStarted(true);

    const { hours, title, type, body } =
      IntervalNotificationConfig[IntervalNotificationHours.FIRST];

    // schedule the next interval notification
    await schedulePushNotification(hours, title, type, packId, body, currentPack?.name);

    // updating next repetition date
    await editMemoPack({
      packId,
      nextRepetition: getDateAfterSomeHours(
        new Date(),
        IntervalNotificationHours.FIRST
      ).toISOString(),
    });
  }, [packId]);

  const endNotificationRepeat = useCallback(async () => {
    if (typeof packId !== 'string') {
      return;
    }

    setIntervalStarted(false);

    await cancelMemoPackNotifications(packId);
    await saveLastIntervalHoursData(packId, null);
    await editMemoPack({ packId, nextRepetition: null });
  }, [packId]);

  const handleDeletePack = useCallback(
    (id: UniqueId) => () => {
      Alert.alert(
        'Удалить набор?',
        'Также будут удалены все карточки, которые в нём находятся',
        [
          { text: 'Нет', style: 'cancel' },
          {
            text: 'Да',
            onPress: async () => {
              await cancelMemoPackNotifications(packId);
              await saveLastIntervalHoursData(packId, null);
              await deleteMemoPack(id);
              router.push(routes.memo);
            },
            style: 'destructive',
          },
        ],
        { cancelable: true }
      );
    },
    [packId]
  );

  return (
    <Menu>
      <MenuTrigger customStyles={headerMenuStyles.trigger}>
        <Entypo name="dots-three-vertical" size={22} color={colors.white} />
      </MenuTrigger>

      <MenuOptions customStyles={headerMenuStyles.options}>
        <MenuOption
          text="Начать интервальное повторение"
          onSelect={startNotificationRepeat}
          customStyles={headerMenuStyles.option}
          disabled={intervalStarted || !cardsFromCurrentPack.length}
        />
        <MenuOption
          text="Закончить интервальное повторение"
          onSelect={endNotificationRepeat}
          customStyles={headerMenuStyles.option}
          disabled={!intervalStarted}
        />
        <MenuOption
          text="Удалить набор"
          onSelect={handleDeletePack(packId)}
          customStyles={headerMenuStyles.option}
        />
      </MenuOptions>
    </Menu>
  );
};

export default memo(HeaderMenu);
