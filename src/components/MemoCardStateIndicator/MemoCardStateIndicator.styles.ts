import { Text } from 'react-native';

import { styled } from 'styled-components';

export const CardStateIndicator = styled(Text)<{ color: string }>`
  width: 58px;
  height: 8px;

  border-radius: 30px;
  background-color: ${({ color }) => color};
`;
