import { createStyleSheet } from 'react-native-unistyles';
import HomeHeader from '~/components/modules/layout/home-header';
import SearchBar from '~/components/SearchBar';
import { Text, View } from '~/components/shared';

const MyToolsScreen = () => {
  return (
    <View>
      <HomeHeader />
    </View>
  );
};

const stylesheet = createStyleSheet((theme) => ({}));

export default MyToolsScreen;
