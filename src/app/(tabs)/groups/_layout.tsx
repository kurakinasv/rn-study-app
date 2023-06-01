import { Stack } from 'expo-router';
import { MenuProvider } from 'react-native-popup-menu';

import { headerStyles } from '@styles/components';

export default () => (
  <MenuProvider skipInstanceCheck>
    <Stack screenOptions={{ ...headerStyles }}>
      <Stack.Screen name="index" options={{ headerTitle: 'Группы' }} />
      <Stack.Screen name="[groupId]" />
      <Stack.Screen name="createGroup" options={{ headerTitle: 'Создание группы' }} />
    </Stack>
  </MenuProvider>
);
