import { Pressable, Text, View, StyleProp, ViewStyle } from 'react-native';

import { MenuTriggerProps } from 'react-native-popup-menu';
import styled from 'styled-components/native';

import { colors } from '@styles/colors';
import { shadow } from '@styles/mixins';
import { elementText, fontFamilies } from '@styles/typography';

export const InfoCards = styled.View`
  margin-bottom: 34px;

  flex-direction: row;
  justify-content: space-between;
` as typeof View;

export const InfoCardView = styled.View`
  padding: 22px 28px;

  align-items: center;
  justify-content: center;

  background-color: ${colors.white};
  border-radius: 6px;

  ${shadow};
` as typeof View;

export const InfoCardNumber = styled.Text`
  font-family: ${fontFamilies.MontserratExtraBold};
  font-size: 28px;
  color: ${colors.blue};
` as typeof Text;

export const InfoCardText = styled.Text`
  font-family: ${fontFamilies.MontserratSemiBold};
  font-size: 11px;
  color: ${colors.blue};
` as typeof Text;

export const ButtonsView = styled.View`
  margin-bottom: 34px;

  flex-direction: row;
  justify-content: space-between;
` as typeof View;

export const Button = styled.Pressable`
  padding: 14px 24px;
  background-color: ${colors.blue};
  border-radius: 6px;
` as typeof Pressable;

export const ButtonText = styled.Text`
  ${elementText()}
` as typeof Text;

export const CardContent = styled.View`
  flex: 1;
  gap: 8px;
` as typeof View;

export const Question = styled.Text.attrs({
  numberOfLines: 3,
})`
  font-family: ${fontFamilies.Rubik};
  font-size: 14px;

  color: ${colors.black};
` as typeof Text;

export const Answer = styled.Text.attrs({
  numberOfLines: 3,
})`
  font-family: ${fontFamilies.RubikLight};
  font-size: 14px;

  color: ${colors.black};
` as typeof Text;

export const Divider = styled.View`
  width: 100%;
  height: 1px;
  opacity: 0.5;
  background-color: ${colors.secondaryBlue};
` as typeof View;

export const headerMenuStyles = {
  trigger: { triggerWrapper: { padding: 7, margin: -7 } },
  options: { optionsContainer: { marginTop: 35 } },
  option: { optionWrapper: { paddingHorizontal: 12, paddingVertical: 16 } },
};

type CustomStyleProperty = Record<string, StyleProp<ViewStyle>>;

export const cardMenuStyles: Record<string, CustomStyleProperty> = {
  trigger: {
    triggerWrapper: {
      padding: 7,
      margin: -7,
      position: 'absolute',
      right: 1,
    },
  },
  options: { optionsContainer: { marginTop: 35 } },
  option: { optionWrapper: { paddingHorizontal: 12, paddingVertical: 16 } },
};
