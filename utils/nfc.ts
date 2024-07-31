import NfcManager, { Ndef, NfcTech } from 'react-native-nfc-manager';

class NFCHandler {
  async init(): Promise<boolean> {
    await NfcManager.start();
    return NfcManager.isSupported();
  }

  async readNFC(): Promise<string | null> {
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);
      const tag = await NfcManager.getTag();
      if (tag && tag.ndefMessage && tag.ndefMessage.length > 0) {
        return Ndef.text.decodePayload(tag.ndefMessage[0].payload);
      }
    } catch (ex) {
      console.warn('Error reading NFC:', ex);
    } finally {
      NfcManager.cancelTechnologyRequest();
    }
    return null;
  }

  async writeNFC(text: string): Promise<boolean> {
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);
      const bytes = Ndef.encodeMessage([Ndef.textRecord(text)]);
      if (bytes) {
        await NfcManager.ndefHandler.writeNdefMessage(bytes);
        return true;
      }
    } catch (ex) {
      console.warn('Error writing NFC:', ex);
    } finally {
      NfcManager.cancelTechnologyRequest();
    }
    return false;
  }
}

export default new NFCHandler();
