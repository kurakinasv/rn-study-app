import { Alert } from 'react-native';

import { Ionicons, AntDesign } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default () => {
  return (
    <Tabs
      screenOptions={{
        // tabBarActiveTintColor: 'black',
        headerRight: () => (
          <Ionicons
            onPress={() => Alert.alert('Do some actions')}
            name="md-ellipsis-vertical-sharp"
            size={24}
            color="black"
          />
        ),
        tabBarIcon: ({ color }) => <AntDesign name="star" size={24} color={color} />,
      }}
    >
      <Tabs.Screen name="notes" options={{ headerTitle: 'Notes' }} />
      <Tabs.Screen name="groups" options={{ headerShown: false }} />
      <Tabs.Screen name="memo" options={{ headerShown: false }} />
      <Tabs.Screen name="profile" options={{ headerTitle: 'Profile' }} />
    </Tabs>
  );
};
