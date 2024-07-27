import { Stack } from 'expo-router';
import { StyleSheet } from 'react-native';

import { Button, Text, View } from '~/components/shared';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Tab One' }} />
      <View style={styles.container}>
        <Text>ToolLog App</Text>
        <Button containerStyle={{ marginTop: 16, width: '100%' }}>Button Demo</Button>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
