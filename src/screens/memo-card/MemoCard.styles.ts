import { TextInput } from 'react-native';

import styled from 'styled-components/native';

import { colors } from '@styles/colors';

export const StyledInput = styled.TextInput.attrs({
  textAlignVertical: 'top',
})`
  border-width: 1px;
  border-color: ${colors.textGray};
  padding: 10px;
` as typeof TextInput;
