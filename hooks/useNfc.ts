import { useEffect } from 'react';
import nfcManager, { Ndef, NfcTech } from 'react-native-nfc-manager';

import { useNfcStore } from '~/store/nfc.store';

export function useNfc() {
  const {
    scanning,
    writing,
    supported,
    enabled,
    toggleScanning,
    toggleWriting,
    updateStatus,
    enableSupported,
    enableEnabled,
  } = useNfcStore();

  const readNfc = async () => {
    if (scanning) return null;

    try {
      toggleScanning();
      updateStatus('Scanning for NFC tag...');

      await nfcManager.requestTechnology(NfcTech.Ndef);
      const tag = await nfcManager.getTag();

      if (tag && tag.ndefMessage && tag.ndefMessage.length > 0) {
        const ndefRecord = tag.ndefMessage[0];
        const tagId = Ndef.text.decodePayload(new Uint8Array(ndefRecord.payload));
        updateStatus('Tag read successfully');
        console.log('NFC TagID read:', tagId);
        return tagId;
      } else {
        updateStatus('No NDEF message found on tag');
        return null;
      }
    } catch (ex) {
      console.error('Error reading NFC:', ex);
      updateStatus('Error reading NFC tag');
      return null;
    } finally {
      nfcManager.cancelTechnologyRequest();
      toggleScanning();
    }
  };

  const writeNfc = async (id: string) => {
    if (scanning) return false;

    try {
      toggleScanning();
      toggleWriting();
      updateStatus('Ready to write. Approach an NFC tag...');

      await nfcManager.requestTechnology(NfcTech.Ndef);
      const bytes = Ndef.encodeMessage([Ndef.textRecord(id)]);

      if (!bytes) {
        throw new Error('Failed to encode NDEF message');
      }

      await nfcManager.ndefHandler.writeNdefMessage(bytes);
      updateStatus('Data written successfully');
      return true;
    } catch (ex) {
      console.error('Error writing NFC:', ex);
      updateStatus('Error writing to NFC tag');
      throw ex;
    } finally {
      await nfcManager.cancelTechnologyRequest();
      toggleScanning();
      toggleWriting();
    }
  };

  useEffect(() => {
    const initializeNfc = async () => {
      try {
        const isSupported = await nfcManager.isSupported();

        if (isSupported) {
          enableSupported();
          await nfcManager.start();
          const isEnabled = await nfcManager.isEnabled();
          if (isEnabled) {
            enableEnabled();
          }
        }
        return isSupported;
      } catch (error) {
        console.error('Error initializing NFC:', error);
        updateStatus('Error initializing NFC');
        return false;
      }
    };

    initializeNfc();

    return () => {
      nfcManager.cancelTechnologyRequest();
    };
  }, []);

  const nfcUnavailable = !supported || !enabled;
  const processing = scanning || writing;

  return { nfcUnavailable, readNfc, writeNfc, processing };
}
