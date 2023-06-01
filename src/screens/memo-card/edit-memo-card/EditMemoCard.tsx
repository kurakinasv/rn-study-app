import { useEffect, useMemo, useState } from 'react';

import { useLocalSearchParams, useSearchParams } from 'expo-router';
import { observer } from 'mobx-react';

import { useLocalStore } from '@hooks/useLocalStore';
import MemoCardStore from '@stores/MemoCardStore';
import { useMemoStore } from '@stores/RootStore/hooks';

import MemoCard from '../MemoCard';

const EditMemoCard = () => {
  const { packId } = useLocalSearchParams();
  const { cardId } = useSearchParams();

  const { cardsFromCurrentPack, getPackById } = useMemoStore();
  const { loading, editCard } = useLocalStore(() => new MemoCardStore());

  const [tempCardInfo, setTempCardInfo] = useState({
    question: '',
    answer: '',
  });

  if (typeof packId !== 'string' || typeof cardId !== 'string') {
    return null;
  }

  const packName = useMemo(() => {
    const currentPack = getPackById(packId);
    return currentPack?.name || '';
  }, [packId]);

  useEffect(() => {
    const foundCard = cardsFromCurrentPack.find((card) => card._id === cardId);

    if (foundCard) {
      setTempCardInfo({
        question: foundCard.question,
        answer: foundCard.answer,
      });
    }
  }, [cardId]);

  return tempCardInfo.question && tempCardInfo.answer ? (
    <MemoCard
      alertMessage="Изменения сохранены"
      cardAction={(question: string, answer: string) =>
        editCard({
          cardId,
          question,
          answer,
          memoPackId: packId,
        })
      }
      initialState={tempCardInfo}
      loading={loading}
      pageTitle={`Карточка [${packName}]`}
      parentMemoPack={packId}
    />
  ) : null;
};

export default observer(EditMemoCard);
