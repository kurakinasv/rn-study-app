import { UniqueId } from '@typings/common';

export type NotificationType = 'interval';

export enum NotificationTypeEnum {
  INTERVAL = 'interval',
}

export type NotificationModel = {
  id: string;
  hours: number;
  type: NotificationType;
  title: string;
  memoPackId: UniqueId;
  body?: string;
  subTitle?: string;
};

export enum IntervalNotificationHours {
  FIRST = 1,
  SECOND = 5,
  THIRD = 24,
  FOURTH = 24 * 7,
  NTH = 24 * 14,
}

export type ScheduleFunction = (
  hours: number,
  title: string,
  type: NotificationType,
  memoPackId: UniqueId,
  body?: string,
  subTitle?: string
) => Promise<string | undefined>;

export const IntervalNotificationConfig: Record<
  IntervalNotificationHours,
  Omit<NotificationModel, 'id' | 'memoPackId'>
> = {
  [IntervalNotificationHours.FIRST]: {
    hours: IntervalNotificationHours.FIRST,
    title: 'Время для первого повторения',
    body: 'Изучите материал по тем карточкам, которые вы добавили ранее',
    type: NotificationTypeEnum.INTERVAL,
  },
  [IntervalNotificationHours.SECOND]: {
    hours: IntervalNotificationHours.SECOND,
    title: 'Время для повторения #2',
    body: 'Повторите материал ранее изученных карточек',
    type: NotificationTypeEnum.INTERVAL,
  },
  [IntervalNotificationHours.THIRD]: {
    hours: IntervalNotificationHours.THIRD,
    title: 'Время для повторения #3',
    body: 'Вы на верном пути! Повторите материал ранее изученных карточек',
    type: NotificationTypeEnum.INTERVAL,
  },
  [IntervalNotificationHours.FOURTH]: {
    hours: IntervalNotificationHours.FOURTH,
    title: 'Время для повторения #4',
    body: 'Чтобы отложить информацию в долгосрочную память, повторите ваши карточки',
    type: NotificationTypeEnum.INTERVAL,
  },
  [IntervalNotificationHours.NTH]: {
    hours: IntervalNotificationHours.NTH,
    title: 'Время для очередного повторения',
    body: 'Для закрепления информации в памяти навсегда следует повторять изученный материал',
    type: NotificationTypeEnum.INTERVAL,
  },
};

export const getNextIntervalHours = (currentInterval: IntervalNotificationHours) => {
  switch (currentInterval) {
    case IntervalNotificationHours.FIRST:
      return IntervalNotificationHours.SECOND;
    case IntervalNotificationHours.SECOND:
      return IntervalNotificationHours.THIRD;
    case IntervalNotificationHours.THIRD:
      return IntervalNotificationHours.FOURTH;
    case IntervalNotificationHours.FOURTH:
      return IntervalNotificationHours.NTH;
    default:
      return IntervalNotificationHours.NTH;
  }
};
