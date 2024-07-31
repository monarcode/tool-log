import { useEffect } from 'react';
import nfcManager, { Ndef, NfcTech } from 'react-native-nfc-manager';

import { useNfcStore } from '~/store/nfc.store';

export function useNfc() {
  const nfcStoreStore = useNfcStore((state) => state);

  const initializeNfc = async () => {
    try {
      const supported = await nfcManager.isSupported();
      supported && nfcStoreStore.enableSupported();

      if (supported) {
        await nfcManager.start();
        const enabled = await nfcManager.isEnabled();
        enabled && nfcStoreStore.enableEnabled();
      }
      return supported;
    } catch (error) {
      console.error('Error initializing NFC:', error);
      nfcStoreStore.updateStatus('Error initializing NFC');
      return false;
    }
  };

  const readNfc = async () => {
    nfcStoreStore.toggleScanning();
    nfcStoreStore.updateStatus('Scanning for NFC tag...');

    try {
      await nfcManager.requestTechnology(NfcTech.Ndef);
      const tag = await nfcManager.getTag();

      if (tag && tag.ndefMessage && tag.ndefMessage.length > 0) {
        const ndefRecord = tag.ndefMessage[0];
        const tagId = Ndef.text.decodePayload(new Uint8Array(ndefRecord.payload));
        nfcStoreStore.updateStatus('Tag read successfully');
        // eslint-disable-next-line no-console
        console.log('NFC Data read:', tagId);
        return tagId;
      } else {
        nfcStoreStore.updateStatus('No NDEF message found on tag');
        return null;
      }
    } catch (ex) {
      console.error('Error reading NFC:', ex);
      nfcStoreStore.updateStatus('Error reading NFC tag');
      return null;
    } finally {
      nfcManager.cancelTechnologyRequest();
      nfcStoreStore.toggleScanning();
      return null;
    }
  };

  const writeNfc = async (id: string) => {
    if (nfcStoreStore.scanning) return;
    nfcStoreStore.toggleScanning();
    nfcStoreStore.updateStatus('Ready to write. Approach an NFC tag...');

    try {
      await nfcManager.requestTechnology(NfcTech.Ndef);
      const bytes = Ndef.encodeMessage([Ndef.textRecord(id)]);
      if (bytes) {
        await nfcManager.ndefHandler.writeNdefMessage(bytes);
        nfcStoreStore.updateStatus('Data written successfully');
      }
    } catch (ex) {
      console.error('Error writing NFC:', ex);
      nfcStoreStore.updateStatus('Error writing to NFC tag');
    } finally {
      nfcManager.cancelTechnologyRequest();
      nfcStoreStore.toggleScanning();
    }
  };

  useEffect(() => {
    initializeNfc();
  }, []);

  const nfcUnavailable = !nfcStoreStore.supported || !nfcStoreStore.enabled;
  const processing = nfcStoreStore.scanning || nfcStoreStore.writing;

  return { nfcUnavailable, readNfc, writeNfc, processing };
}
