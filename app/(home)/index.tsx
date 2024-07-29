import { Image } from 'expo-image';
import { Link, router } from 'expo-router';
import { Keyboard, Pressable, TouchableWithoutFeedback } from 'react-native';
import { createStyleSheet, UnistylesRuntime, useStyles } from 'react-native-unistyles';

import AddTool from '~/assets/icons/add-tool.svg';
import MyTools from '~/assets/icons/my-tools.svg';
import ScanToolIcon from '~/assets/icons/scan-tag.svg';
import ToolMgnt from '~/assets/icons/tool-mgnt.svg';
import Header from '~/components/header';
import { Text, View } from '~/components/shared';

const topInset = UnistylesRuntime.insets.top;
const bottomInset = UnistylesRuntime.insets.bottom;

const HomeScreen = () => {
  const { styles } = useStyles(_styles);

  const handleCreateTool = () => {
    // call bottom sheet

    setTimeout(() => {
      router.push('/add-tool');
    }, 3000);
  };

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
            <Pressable style={styles.action}>
              <ScanToolIcon style={styles.icon} />

              <Text style={styles.label}>Scan Tool</Text>
            </Pressable>

            <Pressable style={styles.action} onPress={handleCreateTool}>
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
}));

export default HomeScreen;
