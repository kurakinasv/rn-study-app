import { TextInput, Text, View } from 'react-native';

import styled, { css } from 'styled-components';

import { colors, rgb } from '@styles/colors';
import { additionalText, header } from '@styles/typography';

export const StyledHeader = styled(TextInput).attrs({
  placeholderTextColor: colors.textGray,
})`
  ${header(3)}
  margin-bottom: 6px;
  padding: 8px 0;

  border-bottom-color: rgba(${rgb.textGray}, 0.5);
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
  color: rgba(${rgb.red}, 0.7);
`;
