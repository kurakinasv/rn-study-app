import { Text, TouchableOpacity } from 'react-native';

import { Link, useRouter } from 'expo-router';

const Memo = () => {
  const router = useRouter();

  return (
    <>
      <Text>Memo page</Text>

      <TouchableOpacity
        onPress={() => {
          router.push('/memo/createMemoPack');
        }}
      >
        <Text>+</Text>
      </TouchableOpacity>

      <Link href="/memoPacks/1">To memoPack 1</Link>
      <Link href="/memoPacks/2">To memoPack 2</Link>
      <Link href="/memoPacks/3">To memoPack 3</Link>
    </>
  );
};

export default Memo;
