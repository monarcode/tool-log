import { useState } from 'react';
import { createStyleSheet, UnistylesRuntime, useStyles } from 'react-native-unistyles';

import { TextInput, View } from '~/components/shared';

const topInset = UnistylesRuntime.insets.top;

const HomeHeader = () => {
  const { styles } = useStyles(_styles);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View style={styles.container}>
      <TextInput value={searchQuery} onChangeText={setSearchQuery} placeholder="Search for tools" />
    </View>
  );
};

const _styles = createStyleSheet((theme) => ({
  container: {
    paddingTop: topInset,
    paddingHorizontal: 24,
  },
}));

export default HomeHeader;
