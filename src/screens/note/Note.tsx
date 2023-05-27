import { useState, memo, useCallback } from 'react';
import { Alert } from 'react-native';

import { Stack, useRouter } from 'expo-router';

import FloatButton from '@components/FloatButton';

import { ContainerView, StyledHeader, StyledInput } from './Note.styles';

type Props = {
  noteAction: (title: string, content: string) => Promise<void>;
  alertButtonTitle: string;
  loading: boolean;
  pageTitle: string;
  initialTitle: string;
  initialContent: string;
};

const Note = ({
  noteAction,
  alertButtonTitle,
  loading,
  pageTitle,
  initialTitle,
  initialContent,
}: Props) => {
  const router = useRouter();

  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  const [height, setHeight] = useState(35);

  const saveNote = async () => {
    await noteAction(title, content);

    Alert.alert(alertButtonTitle, '', [
      {
        text: 'Ок',
        onPress: () => router.back(),
      },
    ]);
  };

  const handleInput = useCallback(
    (inputName: 'text' | 'title') => (text: string) => {
      switch (inputName) {
        case 'text':
          setContent(text);
          break;
        case 'title':
          setTitle(text);
          break;
      }
    },
    []
  );

  return (
    <ContainerView>
      <Stack.Screen options={{ headerTitle: pageTitle }} />

      <StyledHeader
        editable={!loading}
        inputMode="text"
        value={title}
        placeholder="Заголовок"
        onChangeText={handleInput('title')}
        selectTextOnFocus={!loading}
      />

      <StyledInput
        editable={!loading}
        multiline
        inputMode="text"
        onChangeText={handleInput('text')}
        value={content}
        onContentSizeChange={(event) => {
          setHeight(event.nativeEvent.contentSize.height);
        }}
        height={height}
      />

      <FloatButton icon="check" onPressAction={saveNote} disabled={loading} />
    </ContainerView>
  );
};

export default memo(Note);
