import React, { useState } from 'react';
import { Alert, ToastAndroid, Platform } from 'react-native';

// eslint-disable-next-line import/named
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import { observer } from 'mobx-react';

import FloatButton from '@components/FloatButton';
import { API_LEVEL } from '@config/device';
import { useGroupsStore } from '@stores/RootStore/hooks';
import { Input, InputLabel, InputView, PageView } from '@styles/components';

type AndroidMode = 'date' | 'time';

const CreateGroup = () => {
  const router = useRouter();
  const { createGroup, loading } = useGroupsStore();

  const [name, setName] = useState('');
  const [deadline, setDeadline] = useState({
    date: '',
    time: '',
  });

  const handleCreate = async () => {
    if (!name) {
      ToastAndroid.show('Заполните все поля', ToastAndroid.CENTER);
      return;
    }

    await createGroup({ name, deadline: date ? date.toISOString() : undefined });

    Alert.alert('Группа создана', '', [
      {
        text: 'Ок',
        onPress: () => router.back(),
      },
    ]);
  };

  const handleNameInput = (text: string) => {
    setName(text);
  };

  const [date, setDate] = useState<Date | null>(null);
  const [mode, setMode] = useState<AndroidMode>('date');
  const [show, setShow] = useState(false);

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShow(false);

    if (selectedDate) {
      setDate(selectedDate);
      setDeadline({
        date: selectedDate.toLocaleDateString(),
        time: selectedDate.toLocaleTimeString(),
      });
    }
  };

  const showMode = (currentMode: AndroidMode) => {
    if (Platform.OS === 'android') {
      setShow(false);
    }
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
    setShow(true);
  };

  const showTimepicker = () => {
    showMode('time');
    setShow(true);
  };

  return (
    <PageView>
      <InputView>
        <InputLabel>Название</InputLabel>
        <Input editable={!loading} inputMode="text" onChangeText={handleNameInput} value={name} />
      </InputView>

      {Number(API_LEVEL) >= 21 && (
        <InputView>
          <InputLabel>Дедлайн</InputLabel>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date || new Date()}
              mode={mode}
              is24Hour={true}
              onChange={onChange}
            />
          )}
          <Input
            editable={!loading}
            inputMode="text"
            onPressIn={showDatepicker}
            value={deadline.date}
            showSoftInputOnFocus={false}
            placeholder="Дата"
            style={{ marginBottom: 10 }}
          />
          <Input
            editable={!loading}
            inputMode="text"
            onPressIn={showTimepicker}
            value={deadline.time}
            showSoftInputOnFocus={false}
            placeholder="Время"
          />
        </InputView>
      )}
      <FloatButton
        icon="check"
        onPressAction={handleCreate}
        disabled={loading || !name}
        loading={loading}
      />
    </PageView>
  );
};

export default observer(CreateGroup);
