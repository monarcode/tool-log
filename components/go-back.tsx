import { useRouter } from 'expo-router';
import { useStyles } from 'react-native-unistyles';

import { Button } from './shared';

import ChevronLeft from '~/assets/icons/chevron-left.svg';

const GoBack = () => {
  const router = useRouter();
  const { theme } = useStyles();

  return (
    <Button
      containerStyle={{ alignSelf: 'flex-start', paddingHorizontal: theme.margins.xl }}
      type="outline"
      onPress={() => (router.canGoBack() ? router.back() : null)}>
      <ChevronLeft />
    </Button>
  );
};
export default GoBack;
