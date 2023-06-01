import { useState, memo } from 'react';

import { Feather } from '@expo/vector-icons';
import { Checkbox } from 'expo-checkbox';
import { useRouter } from 'expo-router';

import { routes } from '@config/routes';
import { EditMode } from '@stores/models/group';
import { MemoPackModel } from '@stores/models/memo';
import { colors } from '@styles/colors';
import { CardInfo, CardTitle, CardView } from '@styles/components';
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

  return (
    <MemoPackContainer
      onPress={() => router.push(routes.memoPack(pack._id))}
      disabled={editMode === EditMode.EDIT}
    >
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
