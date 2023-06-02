import { FontAwesome5, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

import { colors } from '@styles/colors';
import { headerStyles } from '@styles/components';
import { TabBarText } from '@styles/typography';

export default () => {
  return (
    <Tabs
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: colors.blue,
        ...headerStyles,
      }}
    >
      <Tabs.Screen
        name="notes"
        options={{
          headerTitle: 'Заметки',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="sticker-text-outline" size={24} color={color} />
          ),

          tabBarLabel: ({ focused }) => (focused ? <TabBarText>заметки</TabBarText> : ''),
        }}
      />
      <Tabs.Screen
        name="groups"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <Feather name="folder" size={24} color={color} />,
          tabBarLabel: ({ focused }) => (focused ? <TabBarText>группы</TabBarText> : ''),
        }}
      />
      <Tabs.Screen
        name="memo"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cards-outline" size={24} color={color} />
          ),
          tabBarLabel: ({ focused }) => (focused ? <TabBarText>мемо</TabBarText> : ''),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerTitle: 'Профиль',
          tabBarIcon: ({ color }) => <FontAwesome5 name="user" size={24} color={color} />,
          tabBarLabel: ({ focused }) => (focused ? <TabBarText>профиль</TabBarText> : ''),
        }}
      />
    </Tabs>
  );
};
