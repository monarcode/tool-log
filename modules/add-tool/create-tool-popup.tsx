import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import NfcManager, { Ndef, NfcTech } from 'react-native-nfc-manager';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import uuid from 'react-native-uuid';

import ReadTag from '~/assets/icons/read-tag.svg';
import { Button, Text, View } from '~/components/shared';
import { useInventoryStore } from '~/store/inventory.store';

export interface Payload {
  name: string;
  description: string;
  category: string;
  isAvailable?: boolean;
}

interface CreateToolPopupProps {
  closeBottomSheet: any;
  type?: 'read' | 'write';
  payload?: Payload;
}

const CreateToolPopup = ({ closeBottomSheet, type = 'read', payload }: CreateToolPopupProps) => {
  const { styles, theme } = useStyles(_styles);
  const [scanning, setScanning] = useState(false);
  const [isSupported, setNfcSupported] = useState(false);
  const [isEnabled, setNfcEnabled] = useState(false);
  const router = useRouter();
  const addInventoryStore = useInventoryStore((s) => s.addTool);

  const initializeNfc = async () => {
    const supported = await NfcManager.isSupported();
    setNfcSupported(supported);

    if (supported) {
      const enabled = await NfcManager.isEnabled();
      setNfcEnabled(enabled);
    } else {
      // router.navigate("/scan-tool/2")
      // Alert.alert('NFC is not supported on this device');
    }
  };

  async function readNdef() {
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);
      const tag = await NfcManager.getTag();
      if (tag && tag?.ndefMessage.length >= 0) {
        const data = tag?.ndefMessage[0].payload;
        router.navigate(`/scan-tool/${data}`);
      }
      return null;
    } catch (ex) {
      return;
    } finally {
      NfcManager.close();
      NfcManager.cancelTechnologyRequest();
    }
  }

  async function writeNdef(data: string, callback = () => undefined) {
    let result = false;
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);

      const bytes = Ndef.encodeMessage([Ndef.textRecord(data)]);

      if (bytes) {
        await NfcManager.ndefHandler // STEP 2
          .writeNdefMessage(bytes); // STEP 3
        result = true;
        callback();
      }
    } catch (ex) {
      console.warn(ex);
    } finally {
      NfcManager.cancelTechnologyRequest();
    }

    return result;
  }

  useEffect(() => {
    initializeNfc();
    if (isSupported && isEnabled) {
      type === 'read' && readNdef();

      if (type === 'write' && payload) {
        const $id = uuid.v4().toString();
        writeNdef($id as string, () => {
          addInventoryStore({
            id: $id,
            category: payload.category,
            description: payload.description,
            name: payload.name,
          });
          router.push(`/my-tools`);
        });
      }
    }
  }, []);
  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.label}>
          {!isSupported || !isEnabled ? 'NFC is not supported or enabled' : 'Ready to Scan'}
        </Text>

        <ReadTag
          style={[
            styles.icon,
            {
              opacity: !isSupported || !isEnabled ? 0.4 : 1,
            },
          ]}
        />
        <Text style={[styles.label, { color: theme.colors.gray, fontSize: 16 }]}>
          {!isSupported || !isEnabled
            ? "Oops! Looks like you don't have NFC Enabled"
            : 'Approach an NFC Tag'}
        </Text>
      </View>
      <View style={{ width: 282, marginHorizontal: 'auto', marginTop: 32 }}>
        <Button onPress={closeBottomSheet} type="secondary">
          Cancel
        </Button>
      </View>
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
