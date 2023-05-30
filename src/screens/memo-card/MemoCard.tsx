import React, { FC, memo, useCallback, useState } from 'react';
import { Alert, ToastAndroid } from 'react-native';

import { Stack, useRouter } from 'expo-router';

import FloatButton from '@components/FloatButton/FloatButton';
import { Input, InputLabel, InputView, PageView } from '@styles/components';
import { UniqueId } from '@typings/common';

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

    if (!cardInfo.question || !cardInfo.answer) {
      ToastAndroid.show('Заполните все поля', ToastAndroid.CENTER);
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

      <InputView>
        <InputLabel>Вопрос</InputLabel>
        <Input
          editable={!loading}
          multiline
          inputMode="text"
          onChangeText={handleInput('question')}
          value={cardInfo.question}
        />
      </InputView>

      <InputView>
        <InputLabel>Ответ</InputLabel>
        <Input
          editable={!loading}
          multiline
          inputMode="text"
          onChangeText={handleInput('answer')}
          value={cardInfo.answer}
        />
      </InputView>

      <FloatButton
        icon="check"
        onPressAction={handleAction}
        disabled={loading || !cardInfo.question || !cardInfo.answer}
        loading={loading}
      />
    </PageView>
  );
};

export default memo(MemoCard);
