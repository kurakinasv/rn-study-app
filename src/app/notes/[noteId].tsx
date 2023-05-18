import { Text, View } from 'react-native';

import { Stack, useSearchParams } from 'expo-router';

const Note = () => {
  const { noteId } = useSearchParams();

  return (
    <View>
      <Stack.Screen options={{ headerTitle: `Note ${noteId}` }} />
      <Text>Note page: {noteId}</Text>
    </View>
  );
};

export default Note;
