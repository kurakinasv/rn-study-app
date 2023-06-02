import React, { useMemo } from 'react';

import { PlaceholderEmoji, PlaceholderText, PlaceholderView } from './Placeholder.styles';

type Props = {
  message?: string;
};

const Placeholder = ({ message }: Props) => {
  const emoji = ['(￣o￣) . z Z', '（＞人＜；）', '┐(•_•)┌', '（>﹏<）', 'ಥ_ಥ'];

  const randomEmoji = useMemo(() => {
    const randIndex = Math.floor(Math.random() * 10) % emoji.length;
    return emoji[randIndex];
  }, []);

  return (
    <PlaceholderView>
      <PlaceholderText>{message || 'Здесь пока ничего нет'}</PlaceholderText>
      <PlaceholderEmoji>{randomEmoji}</PlaceholderEmoji>
    </PlaceholderView>
  );
};

export default Placeholder;
