import { Text, View, Pressable, Animated } from 'react-native';

import styled from 'styled-components/native';

import { rgbaColor } from '@styles/mixins';
import { header } from '@styles/typography';

export const Backdrop = styled(Animated.View)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 500;
  background-color: ${rgbaColor('black', 0.3)};
` as typeof Animated.View;

export const ContentContainer = styled.View`
  padding: 0 20px 60px 20px;

  flex-grow: 1;
  align-items: center;
  justify-content: flex-end;
  z-index: 510;
` as typeof View;

export const ContentWrapper = styled.View`
  width: 100%;
  height: 60%;

  padding: 35px;
  align-items: center;

  background-color: white;
  border-radius: 10px;
` as typeof View;

export const ModalTitle = styled.Text`
  ${header(3)};
  text-align: center;
  margin-bottom: 20px;
` as typeof Text;

export const CloseButton = styled.Pressable`
  position: absolute;
  top: 10px;
  right: 10px;
` as typeof Pressable;

export const Content = styled.View`
  flex: 1;
  width: 100%;
` as typeof View;
