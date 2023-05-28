import { View } from 'react-native';

import styled from 'styled-components/native';

import { colors } from './colors';
import { fontFamilies } from './typography';

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
