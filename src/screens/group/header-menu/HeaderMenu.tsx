import { memo, useCallback } from 'react';
import { Alert, ToastAndroid } from 'react-native';

import { Entypo } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';

import { routes } from '@config/routes';
import { useGroupsStore } from '@stores/RootStore/hooks';
import { colors } from '@styles/colors';
import { headerMenuStyles } from '@styles/shared';
import { UniqueId } from '@typings/common';

type Props = {
  groupId: UniqueId;
  changeMode: () => void;
};

const HeaderMenu = ({ groupId, changeMode }: Props) => {
  const router = useRouter();

  const { deleteGroup } = useGroupsStore();

  const handleDeleteGroup = useCallback(
    (id: UniqueId) => () => {
      Alert.alert(
        'Удалить группу?',
        'Заметки и наборы карточек, связанные с ней, не будут удалены',
        [
          { text: 'Нет', style: 'cancel' },
          {
            text: 'Да',
            onPress: async () => {
              await deleteGroup(id);
              ToastAndroid.show('Группа удалена', ToastAndroid.CENTER);
              router.push(routes.groups);
            },
            style: 'destructive',
          },
        ],
        { cancelable: true }
      );
    },
    [groupId]
  );

  return (
    <Menu>
      <MenuTrigger customStyles={headerMenuStyles.trigger}>
        <Entypo name="dots-three-vertical" size={22} color={colors.white} />
      </MenuTrigger>

      <MenuOptions customStyles={headerMenuStyles.options}>
        <MenuOption
          text="Редактировать"
          onSelect={changeMode}
          customStyles={headerMenuStyles.option}
        />
        <MenuOption
          text="Удалить группу"
          onSelect={handleDeleteGroup(groupId)}
          customStyles={headerMenuStyles.option}
        />
      </MenuOptions>
    </Menu>
  );
};

export default memo(HeaderMenu);
