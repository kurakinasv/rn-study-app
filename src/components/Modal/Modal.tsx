import { useEffect, PropsWithChildren, FC, useRef } from 'react';
import { Modal as NativeModal, Animated } from 'react-native';

import { Entypo } from '@expo/vector-icons';

import { colors } from '@styles/colors';

import {
  Backdrop,
  CloseButton,
  Content,
  ContentContainer,
  ContentWrapper,
  ModalTitle,
} from './Modal.styles';

type ModalProps = {
  visible: boolean;
  onClose: () => void;
  title?: string;
  footer?: React.ReactNode;
};

const Modal: FC<PropsWithChildren<ModalProps>> = ({
  children,
  title,
  onClose,
  visible,
  footer,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [fadeAnim, visible]);

  return (
    <>
      <NativeModal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
      >
        <ContentContainer>
          <ContentWrapper>
            <CloseButton onPress={onClose}>
              <Entypo name="cross" size={24} color={colors.textGray} />
            </CloseButton>

            <ModalTitle>{title}</ModalTitle>

            <Content>{children}</Content>

            {footer}
          </ContentWrapper>
        </ContentContainer>

        <Backdrop style={{ opacity: fadeAnim }} />
      </NativeModal>
    </>
  );
};

export default Modal;
