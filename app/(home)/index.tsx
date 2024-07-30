import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Image } from 'expo-image';
import { Link, router } from 'expo-router';
import { useRef, useCallback, useMemo, useState } from 'react';
import { Keyboard, Pressable, TouchableWithoutFeedback } from 'react-native';
import { createStyleSheet, UnistylesRuntime, useStyles } from 'react-native-unistyles';

import AddTool from '~/assets/icons/add-tool.svg';
import MyTools from '~/assets/icons/my-tools.svg';
import ScanToolIcon from '~/assets/icons/scan-tag.svg';
import ToolMgnt from '~/assets/icons/tool-mgnt.svg';
import Header from '~/components/header';
import { Text, View } from '~/components/shared';
import CreateToolPopup from '~/modules/add-tool/create-tool-popup';

const topInset = UnistylesRuntime.insets.top;
const bottomInset = UnistylesRuntime.insets.bottom;

const HomeScreen = () => {
  const { styles } = useStyles(_styles);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [isAddingTool, setIsAddingTool] = useState(false);
  const [isScanningTool, setIsScanningTool] = useState(false);

  // Memoize snapPoints
  const snapPoints = useMemo(() => ['45%'], []);

  const handleCreateTool = useCallback(() => {
    if (isAddingTool) return;

    setIsAddingTool(true);
    setIsBottomSheetVisible(true);
    bottomSheetRef.current?.expand();

    setTimeout(() => {
      setIsBottomSheetVisible(false);
      bottomSheetRef.current?.close();
      router.push('/add-tool');
      setIsAddingTool(false);
    }, 4000);
  }, [isAddingTool]);

  const handleScanTool = useCallback(() => {
    if (isScanningTool) return;

    setIsScanningTool(true);
    setIsBottomSheetVisible(true);
    bottomSheetRef.current?.expand();

    setTimeout(() => {
      setIsBottomSheetVisible(false);
      bottomSheetRef.current?.close();
      router.push('/scan-tool/3');
      setIsScanningTool(false);
    }, 4000);
  }, [isScanningTool]);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Header showSort={false} />

        <View style={styles.content}>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.logo}
            contentFit="contain"
          />

          <View style={styles.actions}>
            <Pressable style={styles.action} onPress={handleScanTool} disabled={isScanningTool}>
              <ScanToolIcon style={styles.icon} />

              <Text style={styles.label}>Scan Tool</Text>
            </Pressable>

            <Pressable style={styles.action} onPress={handleCreateTool} disabled={isAddingTool}>
              <AddTool style={styles.icon} />

              <Text style={styles.label}>Add New Tool</Text>
            </Pressable>

            <Link href="/my-tools" asChild>
              <Pressable style={styles.action}>
                <MyTools style={styles.icon} />

                <Text style={styles.label}>My tools</Text>
              </Pressable>
            </Link>

            <Link href="/manage-tool" asChild>
              <Pressable style={styles.action}>
                <ToolMgnt style={styles.icon} />

                <Text style={styles.label}>Management</Text>
              </Pressable>
            </Link>
          </View>
        </View>
        {isBottomSheetVisible && <View style={styles.overlay} />}
        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          enablePanDownToClose>
          <BottomSheetView style={styles.sheetContentContainer}>
            <CreateToolPopup />
          </BottomSheetView>
        </BottomSheet>
      </View>
    </TouchableWithoutFeedback>
  );
};

const _styles = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    paddingTop: topInset + 8,
    paddingBottom: bottomInset + 8,
    paddingHorizontal: theme.margins.containerMargin,
    backgroundColor: theme.colors.white,
  },
  header: {
    flexDirection: 'row',
    columnGap: theme.margins.lg,
  },
  content: {
    flex: 1,
    paddingTop: 50,
    alignItems: 'center',
    rowGap: 32,
    width: '100%',
    marginHorizontal: 'auto',
  },
  logo: {
    width: 120,
    height: 160,
  },
  actions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 18,
    width: '100%',
  },
  action: {
    flex: 1,
    minWidth: '44%',
    maxWidth: '48%',
    height: 200,
    backgroundColor: '#fafafa',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 28,
    flexShrink: 0,
  },
  label: {
    fontSize: 16,
    fontFamily: theme.fontFamily.semiBold,
  },
  icon: {
    width: 64,
    aspectRatio: 1,
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

export default HomeScreen;
