import { Stack } from 'expo-router';

import { headerStyles } from '@styles/components';

export default () => {
  return (
    <Stack screenOptions={{ ...headerStyles }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="createMemoCard" />
      <Stack.Screen name="[packId]" options={{ headerShown: false }} />
    </Stack>
  );
};
