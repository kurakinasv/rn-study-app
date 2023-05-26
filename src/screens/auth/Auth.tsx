import { useState, useEffect } from 'react';
import { SafeAreaView, Text, Pressable, TextInput, Alert, ActivityIndicator } from 'react-native';

import { Redirect } from 'expo-router';
import { observer } from 'mobx-react';

import { useAuthStore } from '@stores/RootStore/hooks';

const Auth = () => {
  const auth = useAuthStore();

  const [email, setEmail] = useState('sv11@gmail.com');
  const [password, setPassword] = useState('12345678');

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    auth.init();
  }, []);

  const handleLogin = async () => {
    setLoading(true);

    if (email && password) {
      await auth.login(email, password);
    } else {
      Alert.alert('Error', 'Заполните все поля');
    }

    setLoading(false);
  };

  const handleRegister = async () => {
    setLoading(true);

    if (email && password) {
      await auth.register(email, password);
    } else {
      Alert.alert('Error', 'Заполните все поля');
    }

    setLoading(false);
  };

  if (auth.isAuth) {
    return <Redirect href="notes" />;
  }

  return (
    <SafeAreaView>
      <Text>You are not logged in</Text>

      <TextInput value={email} onChangeText={setEmail} />

      <TextInput value={password} onChangeText={setPassword} />

      <Pressable onPress={handleLogin} disabled={loading}>
        <Text>Click to log in</Text>
      </Pressable>

      <Pressable onPress={handleRegister} disabled={loading}>
        <Text>Or here to register</Text>
      </Pressable>

      <ActivityIndicator size="large" animating={loading} />
    </SafeAreaView>
  );
};

export default observer(Auth);
