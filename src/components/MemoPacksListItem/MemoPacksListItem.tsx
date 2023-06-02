import { useState, memo, useCallback } from 'react';
import { Vibration } from 'react-native';

import { Feather } from '@expo/vector-icons';
import { Checkbox } from 'expo-checkbox';
import { useRouter } from 'expo-router';

import { routes } from '@config/routes';
import { EditMode } from '@stores/models/group';
import { MemoPackModel } from '@stores/models/memo';
import { colors } from '@styles/colors';
import { CardInfo, CardTitle, CardView } from '@styles/components';
import { UniqueId } from '@typings/common';
import localizeCardAmount from '@utils/localizeCardAmount';

import { MemoPackContainer } from './MemoPacksListItem.styles';

type Props = {
  pack: MemoPackModel;
  editMode?: EditMode;
  onCheck?: <T extends string>(args: T) => void;
};

const MemoPacksListItem = ({ pack, editMode, onCheck }: Props) => {
  const router = useRouter();

  const [isChecked, setChecked] = useState(false);

  const handleCheck = (checked: boolean) => {
    setChecked(checked);
    if (onCheck) {
      onCheck(pack._id);
    }
  };

  const goToMemoPack = useCallback(
    (id: UniqueId) => () => {
      Vibration.vibrate(100);
      router.push(routes.memoPack(id));
    },
    []
  );

  return (
    <MemoPackContainer onPress={goToMemoPack(pack._id)} disabled={editMode === EditMode.EDIT}>
      <CardView>
        <CardTitle>{pack.name}</CardTitle>
        <CardInfo>
          {pack.cards.length} {localizeCardAmount(pack.cards.length)}
        </CardInfo>
      </CardView>

      <>
        {editMode !== EditMode.EDIT && (
          <Feather name="chevron-right" size={32} color={colors.textGray} />
        )}

        {editMode === EditMode.EDIT && (
          <Checkbox
            value={isChecked}
            onValueChange={handleCheck}
            color={isChecked ? colors.blue : undefined}
          />
        )}
      </>
    </MemoPackContainer>
  );
};

export default memo(MemoPacksListItem);
