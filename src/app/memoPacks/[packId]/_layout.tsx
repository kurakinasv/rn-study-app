import { useMemo } from 'react';

import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { MenuProvider } from 'react-native-popup-menu';

import { colors } from '@styles/colors';
import { headerStyles } from '@styles/components';

export default () => {
  const router = useRouter();

  const ArrowBack = useMemo(
    () => () =>
      (
        <Ionicons
          onPress={() => router.back()}
          name="arrow-back"
          size={24}
          color={colors.white}
          style={{ marginRight: 24 }}
        />
      ),
    []
  );

  return (
    <MenuProvider skipInstanceCheck>
      <Stack screenOptions={{ ...headerStyles }}>
        <Stack.Screen name="index" options={{ headerLeft: ArrowBack }} />
        <Stack.Screen name="cards" options={{ headerShown: false }} />
        <Stack.Screen name="learning" />
      </Stack>
    </MenuProvider>
  );
};
