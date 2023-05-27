import { View, Pressable, ActivityIndicator } from 'react-native';

import styled from 'styled-components/native';

import { colors } from '@styles/colors';

export const NotesView = styled.View`
  flex: 1;
  padding: 20px;
` as typeof View;

export const StyledLoader = styled.ActivityIndicator`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 10;
  transform: scale(1.5);
` as typeof ActivityIndicator;

export const NoteContainer = styled.Pressable`
  flex-direction: row;

  padding: 12px;
  margin-bottom: 10px;
  background-color: ${colors.lightGray};
  border-radius: 8px;
  border-color: ${colors.textGray};
  border-width: 1px;
` as typeof Pressable;

export const NoteText = styled.Text`
  flex: 1;
`;
