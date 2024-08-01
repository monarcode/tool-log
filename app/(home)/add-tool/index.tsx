import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import { router } from 'expo-router';
import { useMemo, useRef, useState } from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import { createStyleSheet, UnistylesRuntime, useStyles } from 'react-native-unistyles';
import uuid from 'react-native-uuid';

import GoBack from '~/components/go-back';
import CustomBackdrop from '~/components/modules/bottom-sheet/custom-backdrop';
import NfcPopup from '~/components/modules/nfc/nfc-popup';
import { Button, Dropdown, Text, TextInput, View } from '~/components/shared';
import Toast from '~/components/shared/toast';
import { useNfc } from '~/hooks/useNfc';
import { useInventoryStore } from '~/store/inventory.store';

export const categoryOptions = ['Electrical', 'Mechanical', 'Hand Tool'];
const topInset = UnistylesRuntime.insets.top;
const bottomInset = UnistylesRuntime.insets.bottom;

const AddToolScreen = () => {
  const { styles, theme } = useStyles(_styles);
  const [category, setCategory] = useState('');
  const [toolName, setToolName] = useState('');
  const [description, setDescription] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'info' | 'success' | 'error' | 'warning'>('info');
  const { writeNfc } = useNfc();
  const store = useInventoryStore((store) => store);

  // Memoize snapPoints
  const snapPoints = useMemo(() => ['50%'], []);

  const addToolSheet = useRef<BottomSheetModal>(null);

  const closeBottomSheet = () => {
    if (!addToolSheet) return;
    addToolSheet?.current?.close();
  };

  const openBottomSheet = () => {
    if (!addToolSheet) return;
    addToolSheet?.current?.present();
  };

  const handleSavetag = async () => {
    const newId = uuid.v4().toString();

    const payload = {
      name: toolName,
      description,
      category,
      id: newId,
    };

    try {
      await writeNfc(newId);
      store.addTool({
        id: newId,
        category: payload?.category || '',
        description: payload?.description || '',
        name: payload?.name || '',
      });
      Alert.alert('Success', 'Tool added successfully');
      router.replace(`/my-tools`);
    } catch (error) {
      console.error('Error saving tool:', error);
      Alert.alert('Error', 'Failed to write NFC tag. Please try again.');
    } finally {
      closeBottomSheet();
    }
  };

  return (
    <BottomSheetModalProvider>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
        {toastVisible && (
          <Toast message={toastMessage} type={toastType} onClose={() => setToastVisible(false)} />
        )}

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.innerContainer}>
            <View style={styles.row}>
              <GoBack />
              <Text style={styles.headerLabel}>Add New Tool</Text>
            </View>

            <ScrollView
              contentContainerStyle={[styles.scrollViewContent]}
              keyboardShouldPersistTaps="handled">
              <View style={styles.subtitleContainer}>
                <Text style={[styles.label, { fontSize: 20 }]}>Add New Tool</Text>
                <Text style={[styles.label, { fontSize: 16, color: theme.colors.neutral[100] }]}>
                  Brief details of the tools
                </Text>
              </View>

              <View style={styles.contentContainer}>
                <TextInput
                  label="Tool Name"
                  value={toolName}
                  onChangeText={setToolName}
                  style={styles.inputContainer}
                />

                <View style={styles.inputContainer}>
                  <Text
                    style={[
                      styles.label,
                      { marginBottom: 4, fontFamily: theme.fontFamily.regular },
                    ]}>
                    Category
                  </Text>
                  <Dropdown options={categoryOptions} onSelect={setCategory} placeholder="" />
                </View>

                <TextInput
                  label="Description"
                  value={description}
                  onChangeText={setDescription}
                  inputStyle={{ alignSelf: 'flex-start' }}
                  containerStyle={{ marginBottom: 24 }}
                />

                <Button onPress={openBottomSheet}>Add Tool</Button>
              </View>
            </ScrollView>

            <BottomSheetModal
              ref={addToolSheet}
              index={0}
              snapPoints={snapPoints}
              backdropComponent={({ animatedIndex, style, animatedPosition }) => (
                <CustomBackdrop
                  style={style}
                  animatedIndex={animatedIndex}
                  animatedPosition={animatedPosition}
                  close={closeBottomSheet}
                />
              )}
              enablePanDownToClose>
              <BottomSheetView style={styles.sheetContentContainer}>
                <NfcPopup mode="write" onClose={closeBottomSheet} onAction={handleSavetag} />
              </BottomSheetView>
            </BottomSheetModal>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </BottomSheetModalProvider>
  );
};
export default AddToolScreen;

const _styles = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    paddingBottom: 24,
  },
  innerContainer: {
    flex: 1,
    paddingTop: topInset + 8,
    paddingBottom: bottomInset + 8,
    paddingHorizontal: theme.margins.containerMargin,
    backgroundColor: theme.colors.white,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerLabel: {
    fontSize: 16,
    fontFamily: theme.fontFamily.semiBold,
    marginLeft: 16,
  },
  label: {
    fontSize: 14,
    fontFamily: theme.fontFamily.semiBold,
    color: '#120903',
  },
  input: {
    backgroundColor: theme.colors.neutral,
  },
  categoryInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputContainer: {
    marginBottom: theme.margins.containerMargin,
    zIndex: 2,
  },
  subtitleContainer: {
    marginTop: 130,
  },
  contentContainer: {
    marginTop: 30,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 0,
  },
  sheetContainer: {
    flex: 1,
    padding: 24,
    backgroundColor: theme.colors.gray,
  },
  sheetContentContainer: {
    flex: 1,
    alignItems: 'center',
  },
}));
