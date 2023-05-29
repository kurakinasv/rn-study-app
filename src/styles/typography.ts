import { css } from 'styled-components';

import { colors } from './colors';

export const fontFamilies = {
  MontserratRegular: 'Montserrat',
  MontserratLight: 'Montserrat-Light',
  MontserratMedium: 'Montserrat-Medium',
  MontserratSemiBold: 'Montserrat-SemiBold',
  MontserratExtraBold: 'Montserrat-ExtraBold',

  Rubik: 'Rubik',
  RubikLight: 'Rubik-Light',
  RubikSemibold: 'Rubik-SemoBold',
};

export const header = (size: number, color = colors.black) => {
  if (size === 3) {
    return css`
      font-family: ${fontFamilies.MontserratSemiBold};
      font-size: 18px;
      color: ${color};
    `;
  }
};

export const additionalText = (color = colors.textGray) => {
  return css`
    font-family: ${fontFamilies.Rubik};
    font-size: 10px;
    color: ${color};
  `;
};

export const regularText = (color = colors.black) => {
  return css`
    font-family: ${fontFamilies.Rubik};
    font-size: 13px;
    color: ${color};
  `;
};

export const elementText = (color = colors.white) => {
  return css`
    font-family: ${fontFamilies.MontserratSemiBold};
    font-size: 20px;
    text-align: center;
    color: ${color};
  `;
};
