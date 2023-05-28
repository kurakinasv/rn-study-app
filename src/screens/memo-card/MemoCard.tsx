import React, { FC, memo, useCallback, useState } from 'react';
import { Alert } from 'react-native';

import { Stack, useRouter } from 'expo-router';

import FloatButton from '@components/FloatButton/FloatButton';
import { PageView } from '@styles/components';
import { UniqueId } from '@typings/common';

import { StyledInput } from './MemoCard.styles';

type Props = {
  loading: boolean;
  initialState: {
    question: string;
    answer: string;
  };
  parentMemoPack: UniqueId;
  cardAction: (question: string, answer: string) => Promise<void>;
  alertMessage: string;
  pageTitle: string;
};

const MemoCard: FC<Props> = ({
  loading,
  initialState,
  parentMemoPack,
  cardAction,
  alertMessage,
  pageTitle,
}) => {
  const router = useRouter();

  const [cardInfo, setCardInfo] = useState(initialState);

  const handleAction = async () => {
    if (typeof parentMemoPack !== 'string') {
      return;
    }

    await cardAction(cardInfo.question, cardInfo.answer);

    Alert.alert(alertMessage, '', [
      {
        text: 'Ок',
        onPress: () => router.back(),
      },
    ]);
  };

  const handleInput = useCallback(
    (inputName: 'question' | 'answer') => (text: string) => {
      setCardInfo((info) => ({ ...info, [inputName]: text }));
    },
    []
  );

  return (
    <PageView>
      <Stack.Screen options={{ headerTitle: pageTitle }} />

      <StyledInput
        editable={!loading}
        inputMode="text"
        onChangeText={handleInput('question')}
        value={cardInfo.question}
        placeholder="Вопрос"
      />

      <StyledInput
        editable={!loading}
        inputMode="text"
        onChangeText={handleInput('answer')}
        value={cardInfo.answer}
        placeholder="Ответ"
      />

      <FloatButton icon="check" onPressAction={handleAction} disabled={loading} loading={loading} />
    </PageView>
  );
};

export default memo(MemoCard);
