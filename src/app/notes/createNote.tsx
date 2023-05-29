import { Stack } from 'expo-router';

import CreateNote from '@screens/note/create-note';
import { headerStyles } from '@styles/components';

export default () => (
  <>
    <Stack.Screen options={{ ...headerStyles }} />
    <CreateNote />
  </>
);
