import { Stack } from 'expo-router';

import { headerStyles } from '@styles/components';

export default () => (
  <Stack screenOptions={{ ...headerStyles }}>
    <Stack.Screen name="index" options={{ headerTitle: 'Группы' }} />
    <Stack.Screen name="[groupId]" />
    <Stack.Screen name="createGroup" options={{ headerTitle: 'Создание группы' }} />
  </Stack>
);
