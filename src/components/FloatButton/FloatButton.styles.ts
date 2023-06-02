import { Pressable } from 'react-native';

import styled from 'styled-components';

import { colors } from '@styles/colors';
import { rgbaColor } from '@styles/mixins';

export const ButtonWrapper = styled(Pressable)`
  width: 50px;
  height: 50px;

  position: absolute;
  bottom: 5%;
  right: 12%;

  align-items: center;
  justify-content: center;

  background-color: ${({ disabled }) => (disabled ? rgbaColor('blue', 0.7) : colors.blue)};
  border-radius: 25px;

  shadow-color: ${rgbaColor('black', 0.3)};
  elevation: 7;
`;
