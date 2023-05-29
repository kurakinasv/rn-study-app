import { Pressable, Text, View } from 'react-native';

import styled from 'styled-components/native';

import { colors, rgb } from '@styles/colors';
import { shadow } from '@styles/mixins';
import { additionalText, header, regularText } from '@styles/typography';

export const NotesView = styled.View`
  padding: 20px 10px;
  flex: 1;
`;

export const NoteContainer = styled.Pressable`
  flex-direction: row;

  padding: 12px;
  margin: 0 10px 10px 10px;

  background-color: ${colors.lightGray};
  border-radius: 8px;
  border-color: rgba(${rgb.textGray}, 0.2);
  border-width: 1px;

  ${shadow}
` as typeof Pressable;

export const NoteView = styled.View`
  flex: 1;
  gap: 5px;
` as typeof View;

export const NoteTitle = styled.Text`
  ${header(3)};
` as typeof Text;

export const NoteInfo = styled.Text`
  ${additionalText()};
` as typeof Text;

export const NoteContent = styled.Text`
  ${regularText()};
` as typeof Text;
