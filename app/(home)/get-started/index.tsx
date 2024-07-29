import { router } from 'expo-router';
import { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import { createStyleSheet, UnistylesRuntime, useStyles } from 'react-native-unistyles';

import Logo from '~/assets/helmet.svg';
import { Button, Text, TextInput, View } from '~/components/shared';
import { useAccountStore } from '~/store/account.store';

const topInset = UnistylesRuntime.insets.top;

const GetStarted = () => {
  const { styles } = useStyles(_styles);
  const [username, setUsername] = useState('');
  const account = useAccountStore((v) => v);

  const handleCreateUser = () => {
    account.setAccount({ name: username });
    router.push('/');
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={{ alignItems: 'center' }}>
            <Logo />

            <View style={styles.content}>
              <Text style={styles.title}>Welcome to ToolLog</Text>
              <Text style={styles.subTitle}>Enter a username for your device</Text>
            </View>
          </View>

          <TextInput
            placeholder="Enter your username"
            label="Username"
            value={username}
            onChangeText={setUsername}
            style={{ marginTop: 50 }}
          />

          <View style={{ width: '80%', marginHorizontal: 'auto', marginTop: 50 }}>
            <Button onPress={handleCreateUser}>Save</Button>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const _styles = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    paddingTop: topInset + 50,
    paddingHorizontal: theme.margins.containerMargin,
  },
  title: {
    fontSize: theme.fontSizes.xxl,
    fontFamily: theme.fontFamily.semiBold,
  },
  content: {
    alignItems: 'center',
  },
  subTitle: {
    fontSize: theme.fontSizes.md,
    fontFamily: theme.fontFamily.regular,
    marginTop: theme.margins.lg,
  },
}));

export default GetStarted;
