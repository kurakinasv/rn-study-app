import { View, Text } from 'react-native';

import styled from 'styled-components/native';

import { colors } from '@styles/colors';
import { fontFamilies } from '@styles/typography';

export const PlaceholderView = styled.View`
  padding: 100px 0;
  align-items: center;
  justify-content: center;
` as typeof View;

export const PlaceholderText = styled.Text`
  margin-bottom: 20px;
  font-family: ${fontFamilies.MontserratSemiBold};
  font-size: 20px;
  color: ${colors.textGray};
  opacity: 0.7;
` as typeof Text;

export const PlaceholderEmoji = styled.Text`
  font-family: ${fontFamilies.MontserratMedium};
  font-size: 28px;
  color: ${colors.textGray};

  opacity: 0.6;
` as typeof Text;
