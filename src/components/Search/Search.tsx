import { useCallback, useState, FC, memo } from 'react';

import { SearchInput } from './Search.styles';

type SearchProps = {
  loading: boolean;
  placeholder?: string;
  onInputText?: <T extends string>(args: T) => void;
};

const Search: FC<SearchProps> = ({ loading, placeholder, onInputText }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const search = useCallback(
    (text: string) => {
      setSearchQuery(text);

      if (onInputText) {
        onInputText(text);
      }
    },
    [onInputText]
  );

  return (
    <SearchInput
      editable={!loading}
      inputMode="search"
      onChangeText={search}
      value={searchQuery}
      placeholder={placeholder}
      blurOnSubmit={true}
    />
  );
};

export default memo(Search);
