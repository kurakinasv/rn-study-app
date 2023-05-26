import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default () => {
  return (
    <>
      <StatusBar style="light" />

      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="memoPacks" options={{ headerShown: false }} />
        <Stack.Screen name="auth" options={{ headerTitle: 'Authentication' }} />
      </Stack>
    </>
  );
};
