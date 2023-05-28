import { Stack } from 'expo-router';

import { headerStyles } from '@styles/components';

export default () => (
  <Stack screenOptions={{ ...headerStyles }}>
    <Stack.Screen name="index" options={{ headerTitle: 'Мемо' }} />
    <Stack.Screen name="createMemoPack" options={{ headerTitle: 'Создание набора' }} />
  </Stack>
);
