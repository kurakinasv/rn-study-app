import { useLocalSearchParams } from 'expo-router';
import { observer } from 'mobx-react';

import { useLocalStore } from '@hooks/useLocalStore';
import MemoCardStore from '@stores/MemoCardStore';

import MemoCard from '../MemoCard';

const CreateMemoCard = () => {
  const { packId } = useLocalSearchParams();

  const { createCard, loading } = useLocalStore(() => new MemoCardStore());

  if (typeof packId !== 'string') {
    return null;
  }

  return (
    <MemoCard
      alertMessage="Карточка создана"
      cardAction={(question, answer) => createCard({ question, answer, memoPackId: packId })}
      initialState={{
        question: '',
        answer: '',
      }}
      loading={loading}
      pageTitle="Создание карточки"
      parentMemoPack={packId}
    />
  );
};

export default observer(CreateMemoCard);
