import { useEffect } from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import NfcManager, { NfcTech } from 'react-native-nfc-manager';
import ReadTag from '~/assets/icons/read-tag.svg';
import { Button, Text, View } from '~/components/shared';

const CreateToolPopup = () => {
  const { styles, theme } = useStyles(_styles);

  useEffect(() => {
    async function readNfc() {
      try {
        await NfcManager.requestTechnology(NfcTech.Ndef);
        const tag = await NfcManager.getTag();
        console.log('Tag found:', tag);
        // Handle the tag data as needed
      } catch (ex) {
        console.warn('NFC Read Error', ex);
      } finally {
        NfcManager.setAlertMessageIOS('NFC tag reading finished');
        NfcManager.cancelTechnologyRequest();
      }
    }

    readNfc();

    return () => {
      NfcManager.cancelTechnologyRequest();
    };
  }, []);

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
