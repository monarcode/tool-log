import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useRouter } from 'expo-router';
import { useCallback, useMemo, useRef, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import { createStyleSheet, UnistylesRuntime, useStyles } from 'react-native-unistyles';

import GoBack from '~/components/go-back';
import { Button, Dropdown, Text, TextInput, View } from '~/components/shared';
import Toast from '~/components/shared/toast';
import CreateToolPopup, { Payload } from '~/modules/add-tool/create-tool-popup';
import { useInventoryStore } from '~/store/inventory.store';

export const categoryOptions = ['Electrical', 'Mechanical', 'Hand Tool'];
const topInset = UnistylesRuntime.insets.top;
const bottomInset = UnistylesRuntime.insets.bottom;
const AddToolScreen = () => {
  const { styles, theme } = useStyles(_styles);
  const [category, setCategory] = useState('');
  const [toolName, setToolName] = useState('');
  const [description, setDescription] = useState('');

  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [isAddingTool, setIsAddingTool] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [toolData, setToolData] = useState<Payload>(null!);
  // Memoize snapPoints
  const snapPoints = useMemo(() => ['45%'], []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);
  const handleAddTool = () => {
    if (!canAdd) return;
    if (isAddingTool) return;

    setIsAddingTool(true);
    setIsBottomSheetVisible(true);
    bottomSheetRef.current?.expand();
    setToolData({
      name: toolName,
      description,
      category,
    });

    setIsAddingTool(false);
  };

  const canAdd = Boolean(toolName && category && description);

  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'info' | 'success' | 'error' | 'warning'>('info');
  const closeBottomSheet = () => {
    if (!bottomSheetRef) return;
    bottomSheetRef?.current?.close();
    setIsBottomSheetVisible(false);
  };
  return (
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
            contentContainerStyle={styles.scrollViewContent}
            keyboardShouldPersistTaps="handled">
            <View style={styles.subtitleContainer}>
              <Text style={[styles.label, { fontSize: 20 }]}>Add New Tool</Text>
              <Text style={[styles.label, { fontSize: 16, color: theme.colors.gray }]}>
                Brief details of the tools
              </Text>
            </View>
            <View style={styles.contentContainer}>
              <TextInput
                label="Tool Name"
                placeholder="Enter the tool name"
                value={toolName}
                onChangeText={setToolName}
                style={styles.inputContainer}
              />
              <View style={styles.inputContainer}>
                <Text
                  style={[styles.label, { marginBottom: 4, fontFamily: theme.fontFamily.regular }]}>
                  Category
                </Text>
                <Dropdown
                  options={categoryOptions}
                  onSelect={setCategory}
                  placeholder="Category..."
                />
              </View>
              <TextInput
                label="Description"
                placeholder="Tool Description"
                value={description}
                onChangeText={setDescription}
                inputStyle={{ alignSelf: 'flex-start' }}
                containerStyle={{ height: 125, marginBottom: 24 }}
              />
              <View
                style={{
                  width: '100%',
                  marginHorizontal: 'auto',
                  marginTop: 32,
                  opacity: canAdd ? 1 : 0.6,
                }}>
                <Button onPress={handleAddTool} disabled={!canAdd}>
                  Add Tool
                </Button>
              </View>
            </View>
          </ScrollView>
          {isBottomSheetVisible && <View style={styles.overlay} />}
          <BottomSheet
            ref={bottomSheetRef}
            index={-1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            enablePanDownToClose>
            <BottomSheetView style={styles.sheetContentContainer}>
              <CreateToolPopup
                payload={toolData}
                type="write"
                closeBottomSheet={closeBottomSheet}
              />
            </BottomSheetView>
          </BottomSheet>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
export default AddToolScreen;

const _styles = createStyleSheet((theme) => ({
  container: {
    flex: 1,
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
    marginTop: 50,
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
