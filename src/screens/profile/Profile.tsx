import { useCallback } from 'react';
import { Pressable, Text, ToastAndroid } from 'react-native';

import { useRouter } from 'expo-router';
import { observer } from 'mobx-react';

import { useAuthStore } from '@stores/RootStore/hooks';
import { PageView } from '@styles/components';

const Profile = () => {
  const auth = useAuthStore();
  const router = useRouter();

  const handleLogout = useCallback(async () => {
    await auth.logout();
    router.replace('auth');
    ToastAndroid.show('Выполнен выход из системы', ToastAndroid.SHORT);
  }, []);

  return (
    <PageView>
      <Pressable onPress={handleLogout}>
        <Text>Logout</Text>
      </Pressable>
    </PageView>
  );
};

export default observer(Profile);
