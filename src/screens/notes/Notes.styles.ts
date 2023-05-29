import { Text } from 'react-native';

import styled from 'styled-components/native';

import { regularText } from '@styles/typography';

export const NoteContent = styled.Text`
  ${regularText()};
` as typeof Text;
