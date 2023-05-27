import { TextInput, View } from 'react-native';

import styled from 'styled-components';

import { colors } from '@styles/colors';
import { header } from '@styles/typography';

export const ContainerView = styled(View)`
  flex: 1;
  padding: 10px;
`;

export const StyledHeader = styled(TextInput).attrs({
  placeholderTextColor: colors.textGray,
})`
  ${header(3)}
` as typeof TextInput;

export const StyledInput = styled(TextInput).attrs({
  textAlignVertical: 'top',
})<{ height: number }>`
  border-width: 1px;
  border-color: ${colors.textGray};
  padding: 10px;
  height: ${({ height }) => height + 'px'};
`;
