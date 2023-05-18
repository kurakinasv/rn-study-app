import { Stack } from 'expo-router';

export default () => {
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="createMemoCard" />
      <Stack.Screen name="[packId]" options={{ headerShown: false }} />
    </Stack>
  );
};
