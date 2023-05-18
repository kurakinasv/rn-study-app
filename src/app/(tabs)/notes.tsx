import { Text, View } from 'react-native';

import { Link } from 'expo-router';

const Notes = () => {
  return (
    <View>
      <Text>Notes page</Text>

      <Link href="/notes/createNote">+</Link>

      <Link href="/notes/1">note one</Link>
      <Link href="/notes/2">note two</Link>
      <Link href="/notes/3">note three</Link>
    </View>
  );
};

export default Notes;
