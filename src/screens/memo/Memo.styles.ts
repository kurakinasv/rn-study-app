import { Pressable } from 'react-native';

import styled from 'styled-components/native';

import { colors } from '@styles/colors';

export const MemoPacksContainer = styled.Pressable`
  flex-direction: row;

  padding: 12px;
  margin-bottom: 10px;
  background-color: ${colors.lightGray};
  border-radius: 8px;
  border-color: ${colors.textGray};
  border-width: 1px;
` as typeof Pressable;

export const PackInfo = styled.Text`
  flex: 1;
`;
