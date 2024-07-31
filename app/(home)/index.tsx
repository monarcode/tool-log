import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import { Image } from 'expo-image';
import { Link, router } from 'expo-router';
import { useMemo, useRef } from 'react';
import { Keyboard, Pressable, TouchableWithoutFeedback } from 'react-native';
import { createStyleSheet, UnistylesRuntime, useStyles } from 'react-native-unistyles';

import AddTool from '~/assets/icons/add-tool.svg';
import MyTools from '~/assets/icons/my-tools.svg';
import ScanToolIcon from '~/assets/icons/scan-tag.svg';
import CustomBackdrop from '~/components/modules/bottom-sheet/custom-backdrop';
import NfcPopup from '~/components/modules/nfc/nfc-popup';
import { Text, View } from '~/components/shared';
import { useNfc } from '~/hooks/useNfc';
import { useAccountStore } from '~/store/account.store';

const topInset = UnistylesRuntime.insets.top;
const bottomInset = UnistylesRuntime.insets.bottom;

const HomeScreen = () => {
  const { styles } = useStyles(_styles);
  const account = useAccountStore((store) => store.account);
  const { readNfc } = useNfc();

  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ['42%'], []);

  const handleScanTool = () => {
    bottomSheetRef.current?.present();
  };

  const closeBottomSheet = () => {
    if (!bottomSheetRef) return;
    bottomSheetRef?.current?.dismiss();
  };

  const handleScan = async () => {
    const tagId = await readNfc();
    if (!tagId) return;
    router.navigate(`/scan-tool/${tagId}`);
  };

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetRef}
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
          {/* <CreateToolPopup closeBottomSheet={closeBottomSheet} /> */}
          <NfcPopup mode="read" onClose={closeBottomSheet} onAction={handleScan} />
        </BottomSheetView>
      </BottomSheetModal>

      <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View>
            <Text style={styles.welcomeText}>{`Welcome ${account ? account.name : 'there!'}`}</Text>
          </View>

          <View style={styles.content}>
            <Image source={require('~/assets/logo.png')} style={styles.logo} contentFit="contain" />

            <View style={styles.actions}>
              <Pressable style={styles.action} onPress={handleScanTool}>
                <ScanToolIcon style={styles.icon} />

                <Text style={styles.label}>Scan Tool</Text>
              </Pressable>

              <Link href="/add-tool" asChild>
                <Pressable style={styles.action}>
                  <AddTool style={styles.icon} />

                  <Text style={styles.label}>Add New Tool</Text>
                </Pressable>
              </Link>

              <Link href="/my-tools" asChild>
                <Pressable style={styles.action}>
                  <MyTools style={styles.icon} />

                  <Text style={styles.label}>My tools</Text>
                </Pressable>
              </Link>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </BottomSheetModalProvider>
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
    paddingTop: 32,
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
  welcomeText: {
    fontSize: 18,
    marginBottom: 20,
    textTransform: 'capitalize',
    fontFamily: theme.fontFamily.semiBold,
  },
}));

export default HomeScreen;
