import { useCallback, useState, useEffect, useMemo } from 'react';
import { ToastAndroid } from 'react-native';

import { useRouter } from 'expo-router';
import { observer } from 'mobx-react';

import FloatButton from '@components/FloatButton/FloatButton';
import { useAuthStore } from '@stores/RootStore/hooks';
import {
  Button,
  ButtonText,
  Input,
  InputLabel,
  InputView,
  PageLoader,
  PageView,
} from '@styles/components';

import { FloatButtonWrapper, FormView } from './Profile.styles';

const Profile = () => {
  const { logout, loading, getUser, user, editUser } = useAuthStore();
  const router = useRouter();

  const [userInfo, setUserInfo] = useState({
    email: '',
    username: '',
  });

  useEffect(() => {
    getUser().then((res) => {
      if (res) {
        setUserInfo({
          email: res.email,
          username: res.username || '',
        });
      }
    });
  }, []);

  const handleLogout = useCallback(async () => {
    await logout();
    router.replace('auth');
    ToastAndroid.show('Выполнен выход из системы', ToastAndroid.SHORT);
  }, []);

  const handleInput = useCallback((text: string) => {
    setUserInfo((info) => ({ ...info, username: text }));
  }, []);

  const save = async () => {
    await editUser(userInfo.username);
    ToastAndroid.show('Сохранено', ToastAndroid.CENTER);
  };

  const displayButton = useMemo(() => {
    const cond1 = user?.username === undefined && userInfo.username !== '';
    const cond2 = user?.username !== undefined && user.username !== userInfo.username;
    return cond1 || cond2;
  }, [user, userInfo]);

  return (
    <>
      {loading && <PageLoader />}

      <PageView>
        <FormView>
          <InputView>
            <InputLabel>Имя</InputLabel>
            <Input
              editable={!loading}
              inputMode="text"
              onChangeText={handleInput}
              value={userInfo.username}
            />
          </InputView>

          <InputView>
            <InputLabel>Email</InputLabel>
            <Input editable={false} inputMode="email" value={userInfo.email} />
          </InputView>

          <InputView>
            <InputLabel>Пароль</InputLabel>
            <Input editable={false} inputMode="text" value="*************" />
          </InputView>
        </FormView>

        <Button onPress={handleLogout}>
          <ButtonText>Выйти</ButtonText>
        </Button>

        {displayButton && (
          <FloatButtonWrapper>
            <FloatButton icon="check" onPressAction={save} disabled={loading} loading={loading} />
          </FloatButtonWrapper>
        )}
      </PageView>
    </>
  );
};

export default observer(Profile);
