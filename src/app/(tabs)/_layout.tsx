import { AntDesign } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

import { colors } from '@styles/colors';
import { headerStyles } from '@styles/components';

export default () => {
  return (
    <Tabs
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: colors.blue,
        tabBarIcon: ({ color }) => <AntDesign name="star" size={24} color={color} />,
        ...headerStyles,
      }}
    >
      <Tabs.Screen name="notes" options={{ headerTitle: 'Заметки' }} />
      <Tabs.Screen name="groups" options={{ headerShown: false }} />
      <Tabs.Screen name="memo" options={{ headerShown: false }} />
      <Tabs.Screen name="profile" options={{ headerTitle: 'Профиль' }} />
    </Tabs>
  );
};
