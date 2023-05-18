import { Stack } from 'expo-router';

export default () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerTitle: 'Memo' }} />
      <Stack.Screen name="createMemoPack" options={{ headerTitle: 'CreateMemoPack' }} />
    </Stack>
  );
};
