import { Text, TouchableOpacity } from 'react-native';

import { Link, useRouter } from 'expo-router';

const Groups = () => {
  const router = useRouter();

  return (
    <>
      <Text>Groups page</Text>

      <TouchableOpacity
        onPress={() => {
          router.push('groups/createGroup');
        }}
      >
        <Text>+</Text>
      </TouchableOpacity>

      <Link href="/groups/1">group one</Link>
      <Link href="/groups/2">group two</Link>
      <Link href="/groups/3">group three</Link>
    </>
  );
};

export default Groups;
