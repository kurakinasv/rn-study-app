import { FC, memo } from 'react';
import { PressableProps, ActivityIndicator, GestureResponderEvent, Vibration } from 'react-native';

import { Feather } from '@expo/vector-icons';

import { colors } from '@styles/colors';

import { ButtonWrapper } from './FloatButton.styles';

type FloatButtonProps = PressableProps & {
  onPressAction: (event: GestureResponderEvent) => void;
  icon: 'plus' | 'check' | JSX.Element;
  disabled?: boolean;
  loading?: boolean;
};

const FloatButton: FC<FloatButtonProps> = ({
  onPressAction,
  icon,
  disabled = false,
  loading = false,
}) => {
  const innerIcon =
    icon === 'check' || icon === 'plus' ? (
      <Feather name={icon} size={24} color={colors.white} />
    ) : (
      icon
    );

  const handlePress = (event: GestureResponderEvent) => {
    onPressAction(event);
    Vibration.vibrate(100);
  };

  return (
    <ButtonWrapper onPress={handlePress} disabled={disabled}>
      {loading ? <ActivityIndicator size="small" color={colors.white} /> : innerIcon}
    </ButtonWrapper>
  );
};

export default memo(FloatButton);
