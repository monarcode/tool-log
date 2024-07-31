import { useEffect } from 'react';
import nfcManager, { Ndef, NfcTech } from 'react-native-nfc-manager';

import { useNfcStore } from '~/store/nfc.store';

export function useNfc() {
  const nfcStoreState = useNfcStore((state) => state.state);
  const nfcStoreUpdate = useNfcStore((state) => state.updateState);

  const initializeNfc = async () => {
    try {
      const supported = await nfcManager.isSupported();
      nfcStoreUpdate({ supported });

      if (supported) {
        await nfcManager.start();
        const enabled = await nfcManager.isEnabled();
        nfcStoreUpdate({ enabled });
      }
      return supported;
    } catch (error) {
      console.error('Error initializing NFC:', error);
      nfcStoreUpdate({ status: 'Error initializing NFC' });
      return false;
    }
  };

  const readNfc = async () => {
    nfcStoreUpdate({ scanning: true });
    nfcStoreUpdate({ status: 'Scanning for NFC tag...' });

    try {
      await nfcManager.requestTechnology(NfcTech.Ndef);
      const tag = await nfcManager.getTag();

      if (tag && tag.ndefMessage && tag.ndefMessage.length > 0) {
        const ndefRecord = tag.ndefMessage[0];
        const tagId = Ndef.text.decodePayload(new Uint8Array(ndefRecord.payload));
        nfcStoreUpdate({ status: 'Tag read successfully' });
        // eslint-disable-next-line no-console
        console.log('NFC Data read:', tagId);
        return tagId;
      } else {
        nfcStoreUpdate({ status: 'No NDEF message found on tag' });
        return null;
      }
    } catch (ex) {
      console.error('Error reading NFC:', ex);
      nfcStoreUpdate({ status: 'Error reading NFC tag' });
      return null;
    } finally {
      nfcManager.cancelTechnologyRequest();
      nfcStoreUpdate({ scanning: false });
      return null;
    }
  };

  const writeNfc = async (id: string) => {
    nfcStoreUpdate({ scanning: true });
    nfcStoreUpdate({ status: 'Ready to write. Approach an NFC tag...' });

    try {
      await nfcManager.requestTechnology(NfcTech.Ndef);
      const bytes = Ndef.encodeMessage([Ndef.textRecord(id)]);
      if (bytes) {
        await nfcManager.ndefHandler.writeNdefMessage(bytes);
        nfcStoreUpdate({ status: 'Data written successfully' });
      }
    } catch (ex) {
      console.error('Error writing NFC:', ex);
      nfcStoreUpdate({ status: 'Error writing to NFC tag' });
    } finally {
      nfcManager.cancelTechnologyRequest();
      nfcStoreUpdate({ scanning: false });
    }
  };

  useEffect(() => {
    initializeNfc();
  }, []);

  const nfcAvailable = nfcStoreState.supported || nfcStoreState.enabled;

  return { nfcAvailable, readNfc, writeNfc };
}
