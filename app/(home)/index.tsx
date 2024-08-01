import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import { Image } from 'expo-image';
import { Link, router } from 'expo-router';
import React, { useMemo, useRef } from 'react';
import { Alert, Keyboard, Pressable, TouchableWithoutFeedback } from 'react-native';
import { createStyleSheet, UnistylesRuntime, useStyles } from 'react-native-unistyles';

import AddTool from '~/assets/icons/add-tool.svg';
import MyTools from '~/assets/icons/my-tools.svg';
import ScanToolIcon from '~/assets/icons/scan-tag.svg';
import CustomBackdrop from '~/components/modules/bottom-sheet/custom-backdrop';
import NfcPopup from '~/components/modules/nfc/nfc-popup';
import { Text, View } from '~/components/shared';
import { useNfc } from '~/hooks/useNfc';
import { useAccountStore } from '~/store/account.store';
import { useNfcStore } from '~/store/nfc.store';

const { top: topInset, bottom: bottomInset } = UnistylesRuntime.insets;

const HomeScreen: React.FC = () => {
  const { styles } = useStyles(_styles);
  const account = useAccountStore((store) => store.account);
  const { readNfc } = useNfc();
  const { disableScanning } = useNfcStore();

  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ['50%'], []);

  const handleScanTool = () => {
    bottomSheetRef.current?.present();
  };

  const closeBottomSheet = () => {
    bottomSheetRef.current?.dismiss();
    disableScanning();
  };

  const handleScan = async () => {
    try {
      const tagId = await readNfc();

      if (!tagId) {
        Alert.alert('No Tag Found', 'Would you like to add a new tool?', [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Add New Tool', onPress: () => router.push('/add-tool') },
        ]);
        return;
      }

      router.push(`/scan-tool/${tagId}`);
    } catch (error) {
      console.error('Error scanning NFC:', error);
      Alert.alert(
        'Scan Error',
        'There was an error while scanning the NFC tag. Please try again.',
        [{ text: 'OK' }]
      );
    }
  };

  const renderAction = (icon: React.ReactNode, label: string, onPress: () => void) => (
    <Pressable style={styles.action} onPress={onPress}>
      {icon}
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );

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
          <NfcPopup mode="read" onClose={closeBottomSheet} onAction={handleScan} />
        </BottomSheetView>
      </BottomSheetModal>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.welcomeText}>{`Welcome ${account?.name || 'there!'}`}</Text>

          <View style={styles.content}>
            <Image source={require('~/assets/logo.png')} style={styles.logo} contentFit="contain" />

            <View style={styles.actions}>
              {renderAction(<ScanToolIcon style={styles.icon} />, 'Scan Tool', handleScanTool)}
              <Link href="/add-tool" asChild>
                {renderAction(<AddTool style={styles.icon} />, 'Add New Tool', () => {})}
              </Link>
              <Link href="/my-tools" asChild>
                {renderAction(<MyTools style={styles.icon} />, 'My tools', () => {})}
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
    fontSize: 15,
    fontFamily: theme.fontFamily.semiBold,
  },
  icon: {
    width: 64,
    aspectRatio: 1,
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
