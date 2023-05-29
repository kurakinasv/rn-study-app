import { useState, memo, useCallback, useRef } from 'react';
import { Alert, ScrollView } from 'react-native';

import { Stack, useRouter } from 'expo-router';
import { RichEditor, RichToolbar, actions } from 'react-native-pell-rich-editor';

import FloatButton from '@components/FloatButton';
import { InputType } from '@stores/models/note';
import { colors } from '@styles/colors';
import { PageView } from '@styles/components';
import { rgbaColor } from '@styles/mixins';
import { DateString } from '@typings/common';

import { DateCreated, ErrorText, FloatButtonWrapper, StyledHeader } from './Note.styles';
import useNote from './useNote';

type Props = {
  noteAction: (title: string, content: string) => Promise<void>;
  alertButtonTitle: string;
  loading: boolean;
  pageTitle: string;
  initialTitle: string;
  initialContent: string;
  date?: DateString;
};

const Note = ({
  noteAction,
  alertButtonTitle,
  loading,
  pageTitle,
  initialTitle,
  initialContent,
  date,
}: Props) => {
  const router = useRouter();

  const editorRef = useRef(null);

  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  const {
    keyboardShown,
    focused,
    showEmptyError,
    focuseInput,
    blurInput,
    validateNote,
    setShowEmptyError,
  } = useNote();

  const handleInput = useCallback(
    (inputName: InputType) => (text: string) => {
      switch (inputName) {
        case InputType.CONTENT:
          if (text) {
            setShowEmptyError(false);
          }
          setContent(text);
          break;
        case InputType.TITLE:
          setTitle(text);
          break;
      }
    },
    []
  );

  const saveNote = async () => {
    if (!validateNote(title, content)) {
      return;
    }

    await noteAction(title, content);

    Alert.alert(alertButtonTitle, '', [
      {
        text: 'Ок',
        onPress: () => router.back(),
      },
    ]);
  };

  return (
    <PageView>
      <Stack.Screen options={{ headerTitle: pageTitle }} />

      <StyledHeader
        editable={!loading}
        inputMode="text"
        value={title}
        placeholder="Заголовок"
        onChangeText={handleInput(InputType.TITLE)}
      />

      <DateCreated>
        {date ? new Date(date).toLocaleDateString() : new Date().toLocaleDateString()}
      </DateCreated>

      <ScrollView>
        <RichEditor
          ref={editorRef}
          initialContentHTML={initialContent}
          disabled={loading}
          onChange={handleInput(InputType.CONTENT)}
          placeholder="Что бы вы хотели запомнить?"
          containerStyle={{ borderRadius: 6 }}
          androidHardwareAccelerationDisabled={true}
          initialHeight={250}
          onFocus={focuseInput}
          onBlur={blurInput}
        />
        {showEmptyError && <ErrorText>Заметка не может быть пустой</ErrorText>}
      </ScrollView>

      {focused && keyboardShown && (
        <RichToolbar
          editor={editorRef}
          selectedIconTint={colors.purple}
          iconTint={rgbaColor('purple', 0.5)}
          iconSize={24}
          actions={[
            actions.keyboard,
            actions.setBold,
            actions.setItalic,
            actions.setUnderline,
            actions.setStrikethrough,
            actions.insertBulletsList,
            actions.insertLink,
            actions.undo,
            actions.redo,
          ]}
        />
      )}

      <FloatButtonWrapper keyboardShown={keyboardShown}>
        <FloatButton icon="check" onPressAction={saveNote} disabled={loading} loading={loading} />
      </FloatButtonWrapper>
    </PageView>
  );
};

export default memo(Note);
