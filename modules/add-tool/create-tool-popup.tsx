import { createStyleSheet, useStyles } from 'react-native-unistyles';

import ReadTag from '~/assets/icons/read-tag.svg';
import { Button, Text, View } from '~/components/shared';

const CreateToolPopup = () => {
  const { styles, theme } = useStyles(_styles);
  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.label}>Ready to Scan</Text>
        <ReadTag style={styles.icon} />
        <Text style={[styles.label, { color: theme.colors.gray, fontSize: 16 }]}>
          Approach an NFC Tag
        </Text>
      </View>
      <Button containerStyle={styles.button} type="secondary">
        Cancel
      </Button>
    </View>
  );
};
export default CreateToolPopup;

const _styles = createStyleSheet((theme) => ({
  container: {
    flex: 1,
  },
  label: {
    fontSize: 20,
    fontFamily: theme.fontFamily.semiBold,
  },
  icon: {
    marginVertical: 24,
    marginHorizontal: 13,
    width: 131,
    aspectRatio: 1,
  },
  button: {
    marginTop: 32,
    width: 282,
  },
}));
