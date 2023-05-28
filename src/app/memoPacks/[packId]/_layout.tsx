import { Stack } from 'expo-router';

export default () => {
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="cards" options={{ headerShown: false }} />
      <Stack.Screen name="learning" />
    </Stack>
  );
};
