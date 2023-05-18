import { Text, View } from 'react-native';

import { Stack, useSearchParams } from 'expo-router';

const MemoCard = () => {
  const { cardId } = useSearchParams();

  return (
    <View>
      <Stack.Screen options={{ headerTitle: `MemoCard ${cardId}` }} />

      <Text>MemoCard page {cardId}</Text>
    </View>
  );
};

export default MemoCard;
