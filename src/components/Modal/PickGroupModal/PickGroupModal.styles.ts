import styled from 'styled-components/native';

import { colors } from '@styles/colors';
import { rgbaColor } from '@styles/mixins';

export const Group = styled.Pressable<{ active: boolean }>`
  width: 100%;
  margin-bottom: 7px;
  padding: 12px;

  background-color: ${({ active }: { active: boolean }) =>
    active ? rgbaColor('secondaryBlue', 0.3) : colors.white};
  border-radius: 6px;
  border-color: ${colors.secondaryBlue};
  border-width: 1px;
`;
