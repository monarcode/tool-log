import { useState } from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import Search from '~/assets/icons/search.svg';
import SortIcon from '~/assets/icons/sort-icon.svg';
import { Button, TextInput, View } from '~/components/shared';

const Header = ({ showSort = true, value = '', disabled=false, onChangeText = (ev) => null }: THeaderProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { styles, theme } = useStyles(_styles);

  return (
    <View>
      <View style={styles.header}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder="Search for tools"
          icon={<Search />}
          style={{ flexGrow: 1, backgroundColor: '#FAFAFA' }}
          focusColor="#333"
        />
        {showSort && (
          <Button
            type="outline"
            containerStyle={{ alignSelf: 'flex-start', paddingHorizontal: theme.margins.xl }}>
            <SortIcon />
          </Button>
        )}
      </View>
    </View>
  );
};

const _styles = createStyleSheet((theme) => ({
  header: {
    flexDirection: 'row',
    columnGap: theme.margins.lg,
  },
}));

export default Header;

type THeaderProps = {
  showSort?: boolean;
  value?: string;
  disabled?: boolean;
  onChangeText?: (text?: string) => void;
};
