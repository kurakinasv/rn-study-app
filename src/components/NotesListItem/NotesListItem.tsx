import { useState, useCallback } from 'react';
import { Alert, Vibration } from 'react-native';

import { Entypo } from '@expo/vector-icons';
import { Checkbox } from 'expo-checkbox';
import { useRouter } from 'expo-router';
import { observer } from 'mobx-react';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';

import { useModal } from '@components/Modal';
import PickGroupModal from '@components/Modal/PickGroupModal';
import { routes } from '@config/routes';
import { EditMode } from '@stores/models/group';
import { NoteModel } from '@stores/models/note';
import { useGroupsStore } from '@stores/RootStore/hooks';
import { colors } from '@styles/colors';
import { CardContainer, CardInfo, CardTitle, CardView } from '@styles/components';
import { UniqueId } from '@typings/common';
import { divToLineBreaks } from '@utils/replaceHTML';

import { menuStyles, NoteContent } from './NotesListItem.styles';

type Props = {
  note: NoteModel;
  onDeleteNote: () => void;
  editMode?: EditMode;
  onCheck?: <T extends string>(args: T) => void;
};

const NotesListItem = ({ note, editMode, onCheck, onDeleteNote }: Props) => {
  const router = useRouter();

  const { openModal, closeModal, modalVisible } = useModal();
  const { groups, addGroupElement } = useGroupsStore();

  const [isChecked, setChecked] = useState(false);
  const [target, setTarget] = useState('');
  const [targetGroupId, setTargetGroupId] = useState('');

  const hadleCheck = (checked: boolean) => {
    setChecked(checked);
    if (onCheck) {
      onCheck(note._id);
    }
  };

  const handleDelete = useCallback(() => {
    Vibration.vibrate(100);

    Alert.alert(
      'Удалить заметку?',
      'Зметка будет удалена без возможности восстановления',
      [
        { text: 'Нет', style: 'cancel' },
        {
          text: 'Да',
          onPress: () => {
            Vibration.vibrate(100);
            onDeleteNote();
          },
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  }, [onDeleteNote]);

  const open = (noteId: UniqueId, groupId: UniqueId) => () => {
    setTarget(noteId);
    setTargetGroupId(groupId);
    Vibration.vibrate(100);
    openModal();
  };

  const addToGroup = (noteId: UniqueId) => async (groupId: UniqueId) => {
    await addGroupElement({ groupId, noteId });
  };

  return (
    <>
      <PickGroupModal
        targetId={target}
        targetGroupId={targetGroupId}
        groups={groups}
        onClose={closeModal}
        visible={modalVisible}
        onSave={addToGroup(target)}
      />

      <CardContainer
        onPress={() => router.push(routes.note(note._id))}
        disabled={editMode === EditMode.EDIT}
        style={{ alignItems: editMode === EditMode.EDIT ? 'center' : 'flex-start' }}
      >
        <CardView>
          {note.title && <CardTitle>{note.title}</CardTitle>}
          {note.groupName && <CardInfo>{note.groupName}</CardInfo>}
          {note.content && (
            <NoteContent numberOfLines={3}>{divToLineBreaks(note.content)}</NoteContent>
          )}
        </CardView>

        {editMode === EditMode.EDIT && (
          <Checkbox
            value={isChecked}
            onValueChange={hadleCheck}
            color={isChecked ? colors.blue : undefined}
          />
        )}

        {editMode !== EditMode.EDIT && (
          <Menu onOpen={() => Vibration.vibrate(100)}>
            <MenuTrigger customStyles={menuStyles.trigger}>
              <Entypo name="dots-three-vertical" size={18} color={colors.textGray} />
            </MenuTrigger>

            <MenuOptions customStyles={menuStyles.options}>
              <MenuOption
                text="Добавить в группу"
                onSelect={open(note._id, note.group || '')}
                customStyles={menuStyles.option}
              />
              <MenuOption text="Удалить" onSelect={handleDelete} customStyles={menuStyles.option} />
            </MenuOptions>
          </Menu>
        )}
      </CardContainer>
    </>
  );
};

export default observer(NotesListItem);
