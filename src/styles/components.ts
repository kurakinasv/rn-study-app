import { View, ActivityIndicator } from 'react-native';

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

export const PageLoader = styled.ActivityIndicator`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 10;
  transform: scale(1.5);
` as typeof ActivityIndicator;
