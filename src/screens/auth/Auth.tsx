import { useState, useEffect } from 'react';
import { Text, ToastAndroid, Vibration } from 'react-native';

import { Redirect } from 'expo-router';
import { observer } from 'mobx-react';
import { ScrollView } from 'react-native-gesture-handler';

import { routes } from '@config/routes';
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

import { Asterisk, ButtonWrapper, InfoText, LinkButton, LinkButtonText } from './Auth.styles';

const Auth = () => {
  const { isAuth, init, register, login, loading } = useAuthStore();

  const [hasAccount, setHasAccount] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');

  useEffect(() => {
    init();
  }, []);

  const handleLogin = async () => {
    Vibration.vibrate(100);

    if (!email || !password) {
      ToastAndroid.show('Заполните все поля', ToastAndroid.SHORT);
      return;
    }
    const res = await login(email, password);
    if (res) {
      ToastAndroid.show('Авторизация выполнена', ToastAndroid.SHORT);
    }
  };

  const handleRegister = async () => {
    Vibration.vibrate(100);

    if (!email || !password || !repeatedPassword) {
      ToastAndroid.show('Заполните все обязательные поля', ToastAndroid.SHORT);
      return;
    }
    if (password !== repeatedPassword) {
      ToastAndroid.show('Пароли не совпадают', ToastAndroid.SHORT);
      return;
    }
    const res = await register(email, password);
    if (res) {
      ToastAndroid.show('Авторизация выполнена', ToastAndroid.SHORT);
    }
  };

  const toggleHasAccount = () => {
    setHasAccount((has) => !has);
  };

  if (isAuth) {
    return <Redirect href={routes.notes} />;
  }

  return (
    <>
      {loading && <PageLoader size="large" />}

      <ScrollView>
        <PageView>
          <InfoText>Чтобы начать пользоваться приложением, необходимо войти в систему</InfoText>

          {!hasAccount && (
            <InputView>
              <InputLabel>Имя</InputLabel>
              <Input value={name} onChangeText={setName} editable={!loading} inputMode="text" />
            </InputView>
          )}

          <InputView>
            <InputLabel>
              <Text>Email</Text>
              <Asterisk>*</Asterisk>
            </InputLabel>
            <Input value={email} onChangeText={setEmail} editable={!loading} inputMode="email" />
          </InputView>

          <InputView>
            <InputLabel>
              <Text>Пароль</Text>
              <Asterisk>*</Asterisk>
            </InputLabel>
            <Input
              value={password}
              onChangeText={setPassword}
              editable={!loading}
              secureTextEntry={true}
            />
          </InputView>

          {!hasAccount && (
            <InputView>
              <InputLabel>
                <Text>Повторите пароль</Text>
                <Asterisk>*</Asterisk>
              </InputLabel>
              <Input
                value={repeatedPassword}
                onChangeText={setRepeatedPassword}
                editable={!loading}
                secureTextEntry={true}
              />
            </InputView>
          )}

          <ButtonWrapper>
            {hasAccount && (
              <Button onPress={handleLogin} disabled={loading}>
                <ButtonText>Войти</ButtonText>
              </Button>
            )}

            {!hasAccount && (
              <Button onPress={handleRegister} disabled={loading}>
                <ButtonText>Зарегистрироваться</ButtonText>
              </Button>
            )}
          </ButtonWrapper>

          <LinkButton onPress={toggleHasAccount} disabled={loading}>
            <LinkButtonText>
              {hasAccount ? 'Нет аккаунта?' : 'Уже зарегистрированы?'}
            </LinkButtonText>
          </LinkButton>
        </PageView>
      </ScrollView>
    </>
  );
};

export default observer(Auth);
