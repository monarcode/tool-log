import { useRouter } from 'expo-router';

import { Button } from './shared';

import ChevronLeft from '~/assets/icons/chevron-left.svg';

const GoBack = () => {
  const router = useRouter();

  return (
    <Button
      containerStyle={{ alignSelf: 'flex-start', height: 40, paddingHorizontal: 8 }}
      type="outline"
      onPress={() => (router.canGoBack() ? router.back() : null)}>
      <ChevronLeft />
    </Button>
  );
};
export default GoBack;
