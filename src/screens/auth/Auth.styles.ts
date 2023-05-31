import { Text, Pressable, View } from 'react-native';

import styled from 'styled-components/native';

import { colors } from '@styles/colors';
import { fontFamilies } from '@styles/typography';

export const InfoText = styled.Text`
  margin-top: 24px;
  margin-bottom: 34px;

  font-family: ${fontFamilies.Rubik};
  font-size: 16px;
  color: ${colors.black};
  text-align: center;
` as typeof Text;

export const Asterisk = styled.Text`
  font-family: ${fontFamilies.MontserratSemiBold};
  font-size: 18px;
  color: ${colors.red};
` as typeof Text;

export const ButtonWrapper = styled.View`
  margin-top: 24px;
` as typeof View;

export const LinkButton = styled.Pressable`
  padding: 18px;
` as typeof Pressable;

export const LinkButtonText = styled.Text`
  font-family: ${fontFamilies.MontserratSemiBold};
  font-size: 16px;
  text-align: center;
  color: ${colors.blue};
` as typeof Text;
