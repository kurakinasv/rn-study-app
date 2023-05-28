import { Pressable, Text } from 'react-native';

import styled from 'styled-components/native';

import { colors } from '@styles/colors';

export const MemoCardContainer = styled.Pressable`
  flex-direction: row;

  padding: 12px;
  margin-bottom: 10px;
  background-color: ${colors.lightGray};
  border-radius: 8px;
  border-color: ${colors.textGray};
  border-width: 1px;
` as typeof Pressable;

export const CardInfo = styled.Text`
  flex: 1;
` as typeof Text;
