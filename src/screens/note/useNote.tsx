import { useCallback, useEffect, useState } from 'react';
import { Keyboard } from 'react-native';

const useNote = () => {
  const [focused, setFocused] = useState(false);
  const [keyboardShown, setKeyboardShown] = useState(false);
  const [showEmptyError, setShowEmptyError] = useState(false);

  const focuseInput = () => {
    setFocused(true);
  };

  const blurInput = () => {
    setFocused(false);
  };

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardShown(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardShown(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const validateNote = useCallback((title: string, content: string) => {
    // replace with the empty string
    const replaceHTML = content.replace(/<(.|\n)*?>/g, '').trim();
    const replaceWhiteSpace = replaceHTML.replace(/&nbsp;/g, '').trim();

    if (!replaceWhiteSpace.length && !title.length) {
      setShowEmptyError(true);
      return false;
    }

    return true;
  }, []);

  return {
    focused,
    keyboardShown,
    showEmptyError,
    focuseInput,
    blurInput,
    setShowEmptyError,
    validateNote,
  };
};

export default useNote;
