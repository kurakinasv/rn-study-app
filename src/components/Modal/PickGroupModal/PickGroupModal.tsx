import { FC, useState, useEffect, useMemo, memo } from 'react';
import { Text, ToastAndroid, FlatList, Vibration } from 'react-native';

import { GroupModel } from '@stores/models/group';
import { Button, ButtonText } from '@styles/components';
import { UniqueId } from '@typings/common';

import { Group } from './PickGroupModal.styles';
import Modal from '../Modal';

type OptionType = {
  label: string;
  value: UniqueId;
};

type PickGroupModalProps = {
  targetId: UniqueId;
  targetGroupId: UniqueId;
  groups: GroupModel[];
  visible: boolean;
  onClose: () => void;
  onSave: <T>(groupId: UniqueId, args?: T) => Promise<void>;
};

const PickGroupModal: FC<PickGroupModalProps> = ({
  targetId,
  targetGroupId,
  groups = [],
  onClose,
  visible,
  onSave,
}) => {
  const [activeId, setActiveId] = useState<UniqueId>('');

  useEffect(() => {
    setActiveId(targetGroupId || '');
  }, [targetId, targetGroupId]);

  const groupsOptions = useMemo(
    () =>
      groups.reduce((options, group) => {
        return [
          ...options,
          {
            label: group.name,
            value: group._id,
          },
        ];
      }, [] as OptionType[]),
    [groups]
  );

  const chooseGroup = (id: UniqueId) => () => {
    setActiveId(id);
  };

  const save = async () => {
    Vibration.vibrate(100);
    onClose();
    if (!activeId) {
      return;
    }
    await onSave(activeId);
    ToastAndroid.show('Добавлено', ToastAndroid.CENTER);
  };

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      title="Выберите группу"
      footer={
        <Button onPress={save}>
          <ButtonText>Сохранить</ButtonText>
        </Button>
      }
    >
      <FlatList
        data={groupsOptions}
        renderItem={({ item }) => (
          <Group onPress={chooseGroup(item.value)} active={activeId === item.value}>
            <Text>{item.label}</Text>
          </Group>
        )}
      />
    </Modal>
  );
};

export default memo(PickGroupModal);
