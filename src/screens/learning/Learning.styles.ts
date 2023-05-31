import { Pressable, Text, View } from 'react-native';

import styled_ from 'styled-components';
import styled from 'styled-components/native';

import { colors } from '@styles/colors';
import { PageView } from '@styles/components';
import { fontFamilies, header } from '@styles/typography';

export const StyledPageView = styled(PageView)`
  padding-top: 24px;
  padding-bottom: 70px;
  gap: 34px;
`;

export const CardCounter = styled.Text`
  ${header(3, colors.white)};
  padding: 0 14px;
` as typeof Text;

export const IndicatorWrapper = styled.View`
  position: absolute;
  top: 16px;
  left: 16px;
` as typeof View;

export const CardWrapper = styled.Pressable`
  position: relative;

  flex: 1;
  align-items: center;
  justify-content: center;

  border-radius: 6px;
  background-color: ${colors.white};
` as typeof Pressable;

export const CardText = styled.Text`
  font-family: ${fontFamilies.RubikLight};
  font-size: 18px;
  color: ${colors.black};
` as typeof Text;

export const ButtonsWrapper = styled.View`
  margin: 0 -14px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
` as typeof View;

export const StyledButton = styled_(Pressable)<{ color: string }>`
  padding: 14px 26px;
  background-color: ${({ color }) => color};
  border-radius: 6px;
`;
