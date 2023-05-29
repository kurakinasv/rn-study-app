import { useMemo, FC, memo } from 'react';

import { MemoCardState } from '@stores/models/memo';
import { colors } from '@styles/colors';

import { CardStateIndicator } from './MemoCardStateIndicator.styles';

const MemoCardStateIndicator: FC<{ state: MemoCardState }> = ({ state }) => {
  const stateColor = useMemo(() => {
    let color = '';

    switch (state) {
      case 'easy':
        color = colors.green;
        break;
      case 'normal':
        color = colors.blue;
        break;
      case 'difficult':
        color = colors.red;
        break;
      default:
        color = colors.white;
        break;
    }

    return color;
  }, [state]);

  return state === 'new' ? null : <CardStateIndicator color={stateColor} />;
};

export default memo(MemoCardStateIndicator);
