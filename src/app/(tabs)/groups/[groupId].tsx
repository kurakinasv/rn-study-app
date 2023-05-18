import { Text, View } from 'react-native';

import { Link, Stack, useSearchParams } from 'expo-router';

const Group = () => {
  const { groupId } = useSearchParams();

  return (
    <View>
      <Stack.Screen options={{ headerTitle: `Group ${groupId}` }} />

      <Text>Group page: {groupId}</Text>

      <Link href="/notes/2" asChild>
        <Text>К записке №2</Text>
      </Link>
      <Link href="/memoPacks/1">
        <Text>К мемо паку №1</Text>
      </Link>
    </View>
  );
};

export default Group;
