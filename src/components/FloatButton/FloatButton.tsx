import { FC, memo } from 'react';
import { PressableProps } from 'react-native';

import { Feather } from '@expo/vector-icons';

import { colors } from '@styles/colors';

import { ButtonWrapper } from './FloatButton.styles';

type FloatButtonProps = PressableProps & {
  onPressAction: () => void;
  icon: 'plus' | 'check' | JSX.Element;
};

const FloatButton: FC<FloatButtonProps> = ({ onPressAction, icon }) => {
  const innerIcon =
    icon === 'check' || icon === 'plus' ? (
      <Feather name={icon} size={24} color={colors.white} />
    ) : (
      icon
    );

  return <ButtonWrapper onPress={onPressAction}>{innerIcon}</ButtonWrapper>;
};

export default memo(FloatButton);
