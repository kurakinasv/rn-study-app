import { View, Text } from 'react-native';

import { Stack } from 'expo-router';

const CreateNote = () => {
  return (
    <View>
      <Stack.Screen options={{ headerTitle: 'Create Note' }} />
      <Text>CreateNote page</Text>
    </View>
  );
};

export default CreateNote;
