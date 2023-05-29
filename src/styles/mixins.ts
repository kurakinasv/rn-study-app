import { css } from 'styled-components';

import { Colors, rgb } from './colors';

export const rgbaColor = (color: Colors, opacity = 0.5) => {
  return `rgba(${rgb[color]}, ${opacity});`;
};

export const shadow = css`
  shadow-color: ${rgbaColor('black', 0.2)};
  elevation: 4;
`;
