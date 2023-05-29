export type Colors =
  | 'blue'
  | 'secondaryBlue'
  | 'purple'
  | 'black'
  | 'textGray'
  | 'lightGray'
  | 'white'
  | 'red'
  | 'green';

type ColorMap = Record<Colors, string>;

export const colors: ColorMap = {
  blue: '#4B6D9B',
  secondaryBlue: '#A9BCD6',
  purple: '#5E53A3',
  black: '#282828',
  textGray: '#BFBFBF',
  lightGray: '#F9F9F9',
  white: '#fff',
  red: '#FF856B',
  green: '#57D084',
};

export const rgb: ColorMap = {
  blue: '75, 109, 155',
  secondaryBlue: '169, 188, 214',
  purple: '94, 83, 163',
  black: '0, 0, 0',
  textGray: '191, 191, 191',
  lightGray: '249, 249, 249',
  white: '255, 255, 255',
  red: '255, 133, 107',
  green: '87, 208, 132',
};
