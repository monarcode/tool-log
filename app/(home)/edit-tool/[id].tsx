import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Image, Keyboard, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { createStyleSheet, UnistylesRuntime, useStyles } from 'react-native-unistyles';

import GoBack from '~/components/go-back';
import { Button, Dropdown, Text, TextInput, View } from '~/components/shared';
import Toast from '~/components/shared/toast';
import { useInventoryStore } from '~/store/inventory.store';
import categories, { CATEGORY } from '~/utils/categories';
import CreateToolPopup, { Payload } from '~/modules/add-tool/create-tool-popup';
import { categoryOptions } from '../add-tool';

const topInset = UnistylesRuntime.insets.top;
const bottomInset = UnistylesRuntime.insets.bottom;

const EditToolScreen = () => {
  const { styles, theme } = useStyles(_styles);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'info' | 'success' | 'error' | 'warning'>('info');
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [isAddingTool, setIsAddingTool] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [toolData, setToolData] = useState<Payload>(null!);

  const { id } = useLocalSearchParams();
  const tools = useInventoryStore((store) => store.tools);
  const getTool = tools.filter((tool) => tool.id == id)[0];
  console.log('getTool', getTool)

  const [category, setCategory] = useState(getTool.category);
  const [toolName, setToolName] = useState(getTool.name);
  const [description, setDescription] = useState(getTool.description);

  const { updateTool } = useInventoryStore((store) => store);

  useEffect(() => {
    if (toastVisible) {
      const timer = setTimeout(() => {
        setToastVisible(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toastVisible]);

  const snapPoints = useMemo(() => ['45%'], []);

  const canAdd = Boolean(toolName && category && description);

  const closeBottomSheet = () => {
    if (!bottomSheetRef) return;
    bottomSheetRef?.current?.close();
    setIsBottomSheetVisible(false);
  };

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const handleAddTool = () => {
    if (!canAdd) return;
    if (isAddingTool) return;

    setIsAddingTool(true);
    setIsBottomSheetVisible(true);
    bottomSheetRef.current?.expand();
    const toolObj = {
      name: toolName,
      description,
      category,
    };

    updateTool(getTool.id, toolObj)
    setToolData(toolObj);

    // TODO: Add tool to the  NFC tag
    setIsAddingTool(false);
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
        <View style={styles.mainContainer}>
          <View style={styles.row}>
            <GoBack />
            <Text style={styles.headerLabel}>Edit Tool</Text>
          </View>
          <ScrollView
            contentContainerStyle={styles.scrollViewContent}
            keyboardShouldPersistTaps="handled">
            <Image
              resizeMode="contain"
              style={styles.toolImage}
              source={categories(getTool.category as CATEGORY)}
            />

            {!getTool ? (
              <View>
                <Image
                  resizeMode="contain"
                  style={styles.toolImage}
                  source={require('../../../assets/images/empty-box.png')}
                />
                <Text style={styles.notFoundText}>Tool not found</Text>
              </View>
            ) : (
              <View style={styles.contentContainer}>
                <TextInput
                  label="Tool Name"
                  placeholder="Enter the tool name"
                  value={toolName}
                  onChangeText={setToolName}
                  style={styles.inputContainer}
                />
                <View style={styles.inputContainer}>
                  <Text style={[styles.label, { marginBottom: 4 }]}>Category</Text>
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
                    Save
                  </Button>
                </View>
              </View>
            )}
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>

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
    </KeyboardAvoidingView>
  );
};
export default EditToolScreen;

const _styles = createStyleSheet((theme) => ({
  mainContainer: {
    position: 'relative',
    paddingTop: topInset + 8,
    paddingBottom: bottomInset + 8,
  },
  container: {
    paddingHorizontal: theme.margins.containerMargin,
  },
  bodyContainer: {
    padding: theme.margins.containerMargin,
  },
  notFoundText: {
    fontSize: 30,
    textAlign: 'center',
    fontFamily: theme.fontFamily.semiBold,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  subDetailCon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  selectCard: {
    borderRadius: 8,
    borderWidth: 0.5,
    width: 136,
    height: 102,
    borderColor: theme.colors.border,
    padding: 16,
    gap: 16,
    position: 'absolute',
    top: 105,
    right: theme.margins.containerMargin,
    zIndex: 5,
    backgroundColor: theme.colors.white,
  },
  selectText: {
    fontSize: 14,
    fontWeight: '400',
    color: theme.colors.text3,
    height: 25,
  },
  optionButton: {
    padding: theme.margins.xl,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: theme.colors.gray,
    borderWidth: 0.5,
    borderRadius: 8,
  },
  errorDot: {
    width: 4.98,
    height: 4.98,
    backgroundColor: "red",
    borderRadius: 3,
  },
  successDot: {
    width: 4.98,
    height: 4.98,
    backgroundColor: theme.colors.success,
    borderRadius: 3,
  },
  successTagCon: {
    flexDirection: 'row',
    gap: 4,
    backgroundColor: theme.colors.successTag,
    borderRadius: 14,
    width: 64,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorTagCon: {
    flexDirection: 'row',
    gap: 4,
    backgroundColor: theme.colors.errorTag,
    borderRadius: 14,
    width: 64,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    fontSize: 14,
    fontWeight: '300',
    marginTop: 12,
    color: theme.colors.text2,
    lineHeight: 19.6,
  },
  toolImage: {
    width: 'auto',
    height: 180,
    zIndex: 2,
  },
  borderLine: {
    width: '100%',
    borderColor: theme.colors.gray,
    borderWidth: 0.5,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: theme.colors.text,
  },
  textCon: {
    alignItems: 'center',
    gap: 3,
    flexDirection: 'row',
  },
  detailCon: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10,
    gap: 10,
  },
  category: {
    fontSize: 12,
    fontWeight: '400',
    color: theme.colors.text2,
  },
  toolsBtns: {
    marginTop: 25,
    gap: 20,
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
  scrollViewContent: {
    flexGrow: 1,
  },
  subtitleContainer: {
    marginTop: 140,
  },
  label: {
    fontSize: 14,
    fontFamily: theme.fontFamily.semiBold,
  },
  contentContainer: {
    marginTop: 50,
  },
  inputContainer: {
    marginBottom: theme.margins.containerMargin,
    zIndex: 2,
  },
  innerContainer: {
    flex: 1,
    paddingTop: topInset + 8,
    paddingBottom: bottomInset + 8,
    paddingHorizontal: theme.margins.containerMargin,
    backgroundColor: theme.colors.white,
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
}));
