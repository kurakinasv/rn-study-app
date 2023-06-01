import { useState, useEffect } from 'react';
import { ToastAndroid, View } from 'react-native';

import { Stack, useSearchParams } from 'expo-router';
import { observer } from 'mobx-react';

import MemoPacksListItem from '@components/MemoPacksListItem';
import NotesListItem from '@components/NotesListItem';
import {
  InfoCardNumber,
  InfoCardTime,
  InfoCardView,
  InfoDateView,
  InfoCardText,
} from '@screens/memo-pack/MemoPack.styles';
import { EditMode } from '@stores/models/group';
import { MemoPackModel } from '@stores/models/memo';
import { NoteModel } from '@stores/models/note';
import { useGroupsStore, useMemoStore, useNotesStore } from '@stores/RootStore/hooks';
import { Button, ButtonText, CardsList, PageLoader, PageView } from '@styles/components';
import { UniqueId } from '@typings/common';
import formatHHmmFromDate from '@utils/formatHHmmFromDate';

import { ButtonsWrapper } from './Group.styles';
import HeaderMenu from './header-menu';

const Group = () => {
  const { groupId } = useSearchParams();
  const { groups, removeElements, loading, currentGroup, setCurrentGroup } = useGroupsStore();
  const { memoPacks } = useMemoStore();
  const { notes, deleteNote } = useNotesStore();

  const [mode, setMode] = useState<EditMode>(EditMode.DEFAULT);

  const [checkedElements, setCheckedElements] = useState({
    notes: [],
    memoPacks: [],
  });

  const [groupNotes, setGroupNotes] = useState<NoteModel[]>([]);
  const [groupMemoPacks, setGroupMemoPacks] = useState<MemoPackModel[]>([]);

  // следит за изменением memoPacks и notes
  useEffect(() => {
    if (!notes || !memoPacks || !currentGroup) {
      return;
    }

    const groupNotesIds = currentGroup.notes.map((note) => note._id);
    const foundNotes = notes.filter((note) => groupNotesIds.includes(note._id));
    setGroupNotes(foundNotes);

    const groupPacksIds = currentGroup.memoPacks.map((pack) => pack._id);
    const foundPacks = memoPacks.filter((pack) => groupPacksIds.includes(pack._id));
    setGroupMemoPacks(foundPacks);
  }, [notes, memoPacks, currentGroup]);

  useEffect(() => {
    const found = groups.find((group) => group._id === groupId);

    if (found) {
      setCurrentGroup(found);
    }
  }, [groups]);

  const handleCheckedElements = (type: 'notes' | 'memoPacks') => (id: UniqueId) => {
    setCheckedElements((elements) => ({
      ...elements,
      [type]: [...elements[type], id],
    }));
  };

  const deleteElements = async () => {
    if (!currentGroup) {
      ToastAndroid.show('Нет информации о группе', ToastAndroid.CENTER);
      return;
    }

    await removeElements(currentGroup._id, checkedElements.notes, checkedElements.memoPacks);

    setCheckedElements({
      notes: [],
      memoPacks: [],
    });
    setMode(EditMode.DEFAULT);
  };

  if (typeof groupId !== 'string' || !currentGroup) {
    return null;
  }

  return (
    <>
      {loading && <PageLoader size="large" />}

      <PageView>
        <Stack.Screen
          options={{
            headerTitle: currentGroup.name,
            headerRight: () => (
              <HeaderMenu groupId={groupId} changeMode={() => setMode(EditMode.EDIT)} />
            ),
          }}
        />

        {currentGroup.deadline && (
          <View style={{ flex: 0, flexDirection: 'row', marginBottom: 34 }}>
            <InfoCardView>
              <InfoDateView>
                <InfoCardTime outdated={new Date(currentGroup.deadline) < new Date()}>
                  {formatHHmmFromDate(new Date(currentGroup.deadline))}
                </InfoCardTime>
                <InfoCardNumber outdated={new Date(currentGroup.deadline) < new Date()}>
                  {new Date(currentGroup.deadline).toLocaleDateString()}
                </InfoCardNumber>
              </InfoDateView>
              <InfoCardText>дедлайн</InfoCardText>
            </InfoCardView>
          </View>
        )}

        <CardsList
          data={[...groupNotes, ...groupMemoPacks]}
          extraData={groups}
          renderItem={({ item }) =>
            'title' in item ? (
              <NotesListItem
                note={item}
                editMode={mode}
                onCheck={handleCheckedElements('notes')}
                onDeleteNote={() => deleteNote(item._id)}
              />
            ) : (
              <MemoPacksListItem
                pack={item}
                editMode={mode}
                onCheck={handleCheckedElements('memoPacks')}
              />
            )
          }
        />

        {mode === EditMode.EDIT && (
          <ButtonsWrapper>
            <Button onPress={() => setMode(EditMode.DEFAULT)}>
              <ButtonText>Отмена</ButtonText>
            </Button>

            <Button onPress={deleteElements}>
              <ButtonText>Удалить</ButtonText>
            </Button>
          </ButtonsWrapper>
        )}
      </PageView>
    </>
  );
};

export default observer(Group);
