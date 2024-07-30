import { useEffect } from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import NfcManager, { NfcTech } from 'react-native-nfc-manager';
import ReadTag from '~/assets/icons/read-tag.svg';
import { Button, Text, View } from '~/components/shared';

const CreateToolPopup = () => {
  const { styles, theme } = useStyles(_styles);

  useEffect(() => {
    async function readNdef() {
      try {
        // register for the NFC tag with NDEF in it
        await NfcManager.requestTechnology(NfcTech.Ndef);
        // the resolved tag object will contain `ndefMessage` property
        const tag = await NfcManager.getTag();
        console.warn('Tag found', tag);
      } catch (ex) {
        console.warn('Oops!', ex);
      } finally {
        // stop the nfc scanning
        NfcManager.cancelTechnologyRequest();
      }
    }

    readNdef();

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
