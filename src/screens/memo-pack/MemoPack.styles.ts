import { Text, View, StyleProp, ViewStyle } from 'react-native';

import styled_ from 'styled-components';
import styled from 'styled-components/native';

import { colors } from '@styles/colors';
import { rgbaColor, shadow } from '@styles/mixins';
import { fontFamilies } from '@styles/typography';

export const InfoCards = styled.View`
  margin-bottom: 34px;

  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 18px;
` as typeof View;

export const InfoCardView = styled.View`
  padding: 22px 10px;

  flex: 1;
  align-items: center;
  justify-content: center;

  background-color: ${colors.white};
  border-radius: 6px;

  ${shadow};
` as typeof View;

export const InfoDateView = styled.View`
  align-items: center;
  justify-content: center;
` as typeof View;

export const InfoCardTime = styled_(Text)<{ outdated?: boolean }>`
  margin-bottom: -5px;

  font-family: ${fontFamilies.MontserratExtraBold};
  font-size: 18px;
  color: ${({ outdated }: { outdated?: boolean }) =>
    outdated ? rgbaColor('red', 0.6) : colors.secondaryBlue};

  opacity: 0.7;
`;

export const InfoCardNumber = styled_(Text)<{ outdated?: boolean }>`
  font-family: ${fontFamilies.MontserratExtraBold};
  font-size: 22px;
  color: ${({ outdated }: { outdated?: boolean }) =>
    outdated ? rgbaColor('red', 0.8) : colors.blue};
`;

export const InfoCardText = styled.Text`
  font-family: ${fontFamilies.MontserratSemiBold};
  font-size: 11px;
  color: ${colors.blue};
  text-align: center;
` as typeof Text;

export const ButtonsView = styled.View`
  margin-bottom: 34px;

  flex-direction: row;
  justify-content: space-between;
` as typeof View;

export const CardsTitleView = styled.View`
  align-items: flex-start;
  flex-direction: row;
` as typeof View;

export const CardsAmount = styled.Text`
  margin-left: 5px;

  font-family: ${fontFamilies.MontserratSemiBold};
  font-size: 12px;
  color: ${colors.black};

  opacity: 0.4;
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
