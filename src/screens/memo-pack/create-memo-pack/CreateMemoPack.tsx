import { useState } from 'react';
import { Alert } from 'react-native';

import { useRouter } from 'expo-router';
import { observer } from 'mobx-react';

import FloatButton from '@components/FloatButton';
import { useMemoStore } from '@stores/RootStore/hooks';
import { PageView } from '@styles/components';

import { StyledInput } from './CreateMemoPack.styles';

const CreateMemoPack = () => {
  const router = useRouter();
  const { createMemoPack, loading } = useMemoStore();

  const [name, setName] = useState('');

  const handleCreate = async () => {
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
      <StyledInput
        editable={!loading}
        inputMode="text"
        onChangeText={handleNameInput}
        value={name}
      />

      <FloatButton icon="check" onPressAction={handleCreate} disabled={loading} loading={loading} />
    </PageView>
  );
};

export default observer(CreateMemoPack);
