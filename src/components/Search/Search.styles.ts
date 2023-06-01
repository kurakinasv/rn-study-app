import { Pressable, TextInput } from 'react-native';

import styled from 'styled-components/native';

import { colors } from '@styles/colors';
import { rgbaColor } from '@styles/mixins';

export const SearchInput = styled.TextInput.attrs({
  placeholderTextColor: rgbaColor('blue', 0.5),
  cursorColor: colors.blue,
  selectionColor: rgbaColor('blue', 0.5),
})`
  margin-bottom: 24px;
  padding: 8px 14px;

  border-radius: 6px;
  background-color: ${rgbaColor('secondaryBlue', 0.3)};
` as typeof TextInput;
