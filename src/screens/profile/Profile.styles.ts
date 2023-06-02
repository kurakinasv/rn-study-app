import { View } from 'react-native';

import styled from 'styled-components/native';

export const StyledScrollView = styled.ScrollView.attrs({
  contentContainerStyle: { flexGrow: 1 },
})``;

export const FormView = styled.View`
  flex: 1;
` as typeof View;

export const FloatButtonWrapper = styled.View`
  position: absolute;
  bottom: 20%;
  right: 12%;
` as typeof View;
