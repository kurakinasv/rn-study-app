import { Text } from 'react-native';

import styled from 'styled-components/native';

import { regularText } from '@styles/typography';

export const NoteContent = styled.Text`
  ${regularText()};
` as typeof Text;

export const menuStyles = {
  trigger: { triggerWrapper: { padding: 7, margin: -7 } },
  options: { optionsContainer: { marginTop: -65 } },
  option: { optionWrapper: { paddingHorizontal: 12, paddingVertical: 16 } },
};
