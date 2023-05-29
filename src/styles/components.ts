import { View, ActivityIndicator, Text, Pressable, FlatList } from 'react-native';

import styled from 'styled-components/native';

import { colors } from './colors';
import { rgbaColor, shadow } from './mixins';
import { additionalText, fontFamilies, header } from './typography';

export const PageView = styled.View`
  flex: 1;
  padding: 20px;
` as typeof View;

export const headerStyles = {
  headerStyle: { backgroundColor: colors.blue },
  headerTintColor: colors.white,
  headerTitleStyle: {
    fontFamily: fontFamilies.MontserratExtraBold,
    fontSize: 20,
  },
};

export const PageLoader = styled.ActivityIndicator.attrs({
  size: 'large',
  color: colors.blue,
})`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: ${rgbaColor('black', 0.1)};
  z-index: 10;
  transform: scale(1.5);
` as typeof ActivityIndicator;

export const CardsList = styled.FlatList`
  margin: 0 -10px;
  flex: 1;
` as typeof FlatList;

export const CardContainer = styled.Pressable`
  flex-direction: row;

  padding: 12px;
  margin: 0 10px 10px 10px;

  background-color: ${colors.lightGray};
  border-radius: 6px;
  border-color: ${rgbaColor('textGray', 0.1)};
  border-width: 1px;

  ${shadow}
` as typeof Pressable;

export const CardView = styled.View`
  flex: 1;
  gap: 5px;
` as typeof View;

export const CardTitle = styled.Text`
  ${header(3)};
` as typeof Text;

export const CardInfo = styled.Text`
  ${additionalText()};
` as typeof Text;
