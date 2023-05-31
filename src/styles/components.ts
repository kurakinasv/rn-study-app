import { View, ActivityIndicator, Text, TextInput, Pressable, FlatList } from 'react-native';

import styled from 'styled-components/native';

import { colors } from './colors';
import { rgbaColor, shadow } from './mixins';
import { additionalText, elementText, fontFamilies, header } from './typography';

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

  padding: 14px;
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

export const SectionTitle = styled.Text`
  ${header(3)};
  margin-bottom: 20px;
` as typeof Text;

export const InputView = styled.View`
  margin-bottom: 20px;
` as typeof View;

export const InputLabel = styled.Text`
  ${header(3)};
  margin-bottom: 8px;
` as typeof Text;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: rgbaColor('blue', 0.5),
  cursorColor: colors.blue,
  selectionColor: rgbaColor('blue', 0.5),
})`
  padding: 12px 10px;

  border-radius: 6px;
  background-color: ${rgbaColor('secondaryBlue', 0.3)};
` as typeof TextInput;

export const Button = styled.Pressable`
  padding: 14px 24px;
  background-color: ${colors.blue};
  border-radius: 6px;
` as typeof Pressable;

export const ButtonText = styled.Text`
  ${elementText()}
` as typeof Text;
