import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { colors } from '@styles/colors';

export default () => (
  <>
    <StatusBar style="light" />

    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.blue },
        headerTintColor: colors.white,
        headerTitleStyle: {
          fontSize: 20,
        },
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="memoPacks" options={{ headerShown: false }} />
      <Stack.Screen name="auth" options={{ headerTitle: 'Authentication' }} />
    </Stack>
  </>
);
