import { Stack } from 'expo-router';

export default () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="memoPacks" options={{ headerShown: false }} />
    </Stack>
  );
};
