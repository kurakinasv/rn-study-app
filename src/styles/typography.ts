import { colors } from './colors';

export const fontFamilies = {
  MontserratRegular: 'Montserrat',
  MontserratLight: 'Montserrat-Light',
  MontserratMedium: 'Montserrat-Medium',
  MontserratSemiBold: 'Montserrat-SemiBold',
  MontserratExtraBold: 'Montserrat-ExtraBold',
};

export const header = (size: number, color = colors.black) => {
  if (size === 3) {
    return `
            font-family: ${fontFamilies.MontserratSemiBold};
            font-size: 18px;
            color: ${color};
        `;
  }
};
