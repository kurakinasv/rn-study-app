import { Pressable } from 'react-native';

import { styled } from 'styled-components';

import { colors } from '@styles/colors';

export const ButtonWrapper = styled(Pressable)`
  width: 50px;
  height: 50px;

  position: absolute;
  bottom: 5%;
  right: 10%;

  align-items: center;
  justify-content: center;

  background-color: ${colors.blue};
  border-radius: 25px;
`;
