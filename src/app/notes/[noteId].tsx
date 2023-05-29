import { Stack } from 'expo-router';

import EditNote from '@screens/note/edit-note';
import { headerStyles } from '@styles/components';

export default () => (
  <>
    <Stack.Screen options={{ ...headerStyles }} />
    <EditNote />
  </>
);
