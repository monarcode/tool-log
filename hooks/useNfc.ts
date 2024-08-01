import { useEffect } from 'react';
import nfcManager, { Ndef, NfcTech } from 'react-native-nfc-manager';

import { useNfcStore } from '~/store/nfc.store';

export function useNfc() {
  const nfcStoreStore = useNfcStore((state) => state);

  const readNfc = async () => {
    if (nfcStoreStore.scanning) return;

    try {
      nfcStoreStore.toggleScanning();
      nfcStoreStore.updateStatus('Scanning for NFC tag...');

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

    try {
      nfcStoreStore.toggleScanning();
      nfcStoreStore.toggleWriting();
      nfcStoreStore.updateStatus('Ready to write. Approach an NFC tag...');

      await nfcManager.requestTechnology(NfcTech.Ndef);
      const bytes = Ndef.encodeMessage([Ndef.textRecord(id)]);

      if (!bytes) {
        throw new Error('Failed to encode NDEF message');
      }

      await nfcManager.ndefHandler.writeNdefMessage(bytes);
      nfcStoreStore.updateStatus('Data written successfully');
      return true;
    } catch (ex) {
      console.error('Error writing NFC:', ex);
      nfcStoreStore.updateStatus('Error writing to NFC tag');
      throw ex;
    } finally {
      await nfcManager.cancelTechnologyRequest();
      nfcStoreStore.toggleScanning();
      nfcStoreStore.toggleWriting();
    }
  };

  useEffect(() => {
    const initializeNfc = async () => {
      try {
        const supported = await nfcManager.isSupported();

        if (supported) {
          nfcStoreStore.enableSupported();
          await nfcManager.start();
          const enabled = await nfcManager.isEnabled();
          if (enabled) {
            nfcStoreStore.enableEnabled();
          }
        }
        return supported;
      } catch (error) {
        console.error('Error initializing NFC:', error);
        nfcStoreStore.updateStatus('Error initializing NFC');
        return false;
      }
    };

    initializeNfc();

    return () => {
      nfcManager.cancelTechnologyRequest();
    };
  }, []);

  const nfcUnavailable = !nfcStoreStore.supported || !nfcStoreStore.enabled;
  const processing = nfcStoreStore.scanning || nfcStoreStore.writing;

  return { nfcUnavailable, readNfc, writeNfc, processing };
}
