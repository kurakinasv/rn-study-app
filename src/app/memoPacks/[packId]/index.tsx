import { Text, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { Link, Stack, useRouter, useSearchParams } from 'expo-router';

const MemoPack = () => {
  const { packId } = useSearchParams();
  const router = useRouter();

  const ArrowBack = () => (
    <Ionicons
      onPress={() => router.back()}
      name="arrow-back"
      size={24}
      color="black"
      style={{ marginRight: 24 }}
    />
  );

  return (
    <View>
      <Stack.Screen options={{ headerTitle: `MemoPack ${packId}`, headerLeft: ArrowBack }} />

      <Text>MemoPack page {packId}</Text>

      <Link href={`/memoPacks/createMemoCard`}>+</Link>

      <Link href={`/memoPacks/${packId}/cards/1`}>card one</Link>
      <Link href={`/memoPacks/${packId}/cards/2`}>card two</Link>
    </View>
  );
};

export default MemoPack;
