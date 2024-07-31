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
  const [status, setStatus] = useState('');
  const router = useRouter();
  const addInventoryStore = useInventoryStore((s) => s.addTool);

  useEffect(() => {
    initializeNfc();
  }, []);

  const initializeNfc = async () => {
    try {
      const supported = await NfcManager.isSupported();
      setNfcSupported(supported);
      console.log('NFC supported:', supported);

      if (supported) {
        await NfcManager.start();
        console.log('NFC manager started');
        const enabled = await NfcManager.isEnabled();
        setNfcEnabled(enabled);
        console.log('NFC enabled:', enabled);
      }
      return supported;
    } catch (error) {
      console.error('Error initializing NFC:', error);
      setStatus('Error initializing NFC');
      return false;
    }
  };

  async function readNdef() {
    setScanning(true);
    setStatus('Scanning for NFC tag...');
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);
      const tag = await NfcManager.getTag();
      if (tag && tag.ndefMessage && tag.ndefMessage.length > 0) {
        const ndefRecord = tag.ndefMessage[0];
        const data = Ndef.text.decodePayload(new Uint8Array(ndefRecord.payload));
        setStatus('Tag read successfully');
        console.log('NFC Data read:', data);
        router.navigate(`/scan-tool/${data}`);
      } else {
        setStatus('No NDEF message found on tag');
      }
    } catch (ex) {
      console.error('Error reading NFC:', ex);
      setStatus('Error reading NFC tag');
    } finally {
      NfcManager.cancelTechnologyRequest();
      setScanning(false);
    }
  }

  async function writeNdef(data: string) {
    setScanning(true);
    setStatus('Ready to write. Approach an NFC tag...');
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);
      const bytes = Ndef.encodeMessage([Ndef.textRecord(data)]);
      if (bytes) {
        await NfcManager.ndefHandler.writeNdefMessage(bytes);
        setStatus('Data written successfully');
        addInventoryStore({
          id: data,
          category: payload?.category || '',
          description: payload?.description || '',
          name: payload?.name || '',
        });
        router.push(`/my-tools`);
      }
    } catch (ex) {
      console.error('Error writing NFC:', ex);
      setStatus('Error writing to NFC tag');
    } finally {
      NfcManager.cancelTechnologyRequest();
      setScanning(false);
    }
  }

  const handleAction = () => {
    if (isSupported && isEnabled) {
      if (type === 'read') {
        readNdef();
      } else if (type === 'write' && payload) {
        const $id = uuid.v4().toString();
        writeNdef($id);
      } else {
        setStatus('Invalid action or missing payload');
      }
    } else {
      setStatus('NFC is not supported or enabled on this device');
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.label}>
          {!isSupported || !isEnabled
            ? 'NFC is not supported or enabled'
            : `Ready to ${type === 'read' ? 'Read' : 'Write'}`}
        </Text>

        <ReadTag
          style={[
            styles.icon,
            {
              opacity: !isSupported || !isEnabled ? 0.4 : 1,
            },
          ]}
        />
        <Text
          style={[
            styles.label,
            {
              fontSize: 14,
              fontFamily: theme.fontFamily.regular,
            },
          ]}>
          {status ||
            (!isSupported || !isEnabled
              ? "Oops! Looks like you don't have NFC Enabled"
              : 'Approach an NFC Tag')}
        </Text>
      </View>
      <View style={styles.actionWrapper}>
        <Button
          containerStyle={{ flex: 1 }}
          onPress={handleAction}
          disabled={scanning || !isSupported || !isEnabled}>
          {scanning
            ? `${type === 'read' ? 'Reading' : 'Writing'}...`
            : `${type === 'read' ? 'Read' : 'Write'} NFC Tag`}
        </Button>
        <Button
          containerStyle={{ flex: 1 }}
          onPress={closeBottomSheet}
          type="secondary"
          style={{ marginTop: 10 }}>
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
  actionWrapper: {
    marginHorizontal: 'auto',
    marginTop: 32,
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 8,
  },
}));
