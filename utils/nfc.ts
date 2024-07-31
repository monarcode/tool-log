import NfcManager, { Ndef, NdefRecord, NfcTech } from 'react-native-nfc-manager';

class NFCHandler {
  async init(): Promise<boolean> {
    try {
      await NfcManager.start();
      return await NfcManager.isSupported();
    } catch (error) {
      console.error('Error initializing NFC:', error);
      return false;
    }
  }

  async readNdefTag(): Promise<{ message: string; records: NdefRecord[] } | null> {
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);
      const tag = await NfcManager.getTag();
      if (tag && tag.ndefMessage && tag.ndefMessage.length > 0) {
        const ndefRecords = tag.ndefMessage;
        const firstRecord = ndefRecords[0];
        const message = Ndef.text.decodePayload(firstRecord.payload);
        return { message, records: ndefRecords };
      } else {
        throw new Error('No NDEF message found on the tag');
      }
    } catch (error) {
      console.error('Error reading NDEF tag:', error);
      throw error;
    } finally {
      this.cancelNfcSession();
    }
  }

  async writeNdefTag(text: string): Promise<void> {
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);
      const bytes = Ndef.encodeMessage([Ndef.textRecord(text)]);
      if (bytes) {
        await NfcManager.ndefHandler.writeNdefMessage(bytes);
      } else {
        throw new Error('Failed to encode NDEF message');
      }
    } catch (error) {
      console.error('Error writing NDEF tag:', error);
      throw error;
    } finally {
      this.cancelNfcSession();
    }
  }

  private cancelNfcSession() {
    NfcManager.cancelTechnologyRequest().catch(() => {
      console.warn('Error cancelling NFC session, possibly already cancelled');
    });
  }
}

export default new NFCHandler();
