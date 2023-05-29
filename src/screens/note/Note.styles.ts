import { TextInput, Text, View } from 'react-native';

import styled, { css } from 'styled-components';

import { colors } from '@styles/colors';
import { rgbaColor } from '@styles/mixins';
import { additionalText, header } from '@styles/typography';

export const StyledHeader = styled(TextInput).attrs({
  placeholderTextColor: colors.textGray,
})`
  ${header(3)}
  margin-bottom: 6px;
  padding: 8px 0;

  border-bottom-color: ${rgbaColor('textGray', 0.5)};
  border-bottom-width: 1px;
` as typeof TextInput;

export const DateCreated = styled(Text)`
  ${additionalText()}
  margin-bottom: 17px;
`;

export const FloatButtonWrapper = styled(View)<{ keyboardShown: boolean }>`
  ${({ keyboardShown }) =>
    keyboardShown
      ? css`
          position: relative;
          bottom: 10%;
          right: -10%;
        `
      : css`
          position: absolute;
          bottom: 5%;
          right: 12%;
        `}
`;

export const ErrorText = styled(Text)`
  margin-top: 6px;
  font-size: 14px;
  color: ${rgbaColor('red', 0.7)};
`;
