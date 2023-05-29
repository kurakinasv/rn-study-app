import { useState } from 'react';
import { Alert, ToastAndroid } from 'react-native';

import { useRouter } from 'expo-router';
import { observer } from 'mobx-react';

import FloatButton from '@components/FloatButton';
import { useMemoStore } from '@stores/RootStore/hooks';
import { Input, InputLabel, InputView, PageView } from '@styles/components';

const CreateMemoPack = () => {
  const router = useRouter();
  const { createMemoPack, loading } = useMemoStore();

  const [name, setName] = useState('');

  const handleCreate = async () => {
    if (!name) {
      ToastAndroid.show('Заполните все поля', ToastAndroid.CENTER);
      return;
    }

    await createMemoPack({ name });

    Alert.alert('Набор карточек создан', '', [
      {
        text: 'Ок',
        onPress: () => router.back(),
      },
    ]);
  };

  const handleNameInput = (text: string) => {
    setName(text);
  };

  return (
    <PageView>
      <InputView>
        <InputLabel>Название</InputLabel>
        <Input editable={!loading} inputMode="text" onChangeText={handleNameInput} value={name} />
      </InputView>

      <FloatButton
        icon="check"
        onPressAction={handleCreate}
        disabled={loading || !name}
        loading={loading}
      />
    </PageView>
  );
};

export default observer(CreateMemoPack);
