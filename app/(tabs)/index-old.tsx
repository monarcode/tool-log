import { Link, Stack } from 'expo-router';
import { Keyboard, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import Search from '~/assets/icons/search.svg';
import SortIcon from '~/assets/icons/sort-icon.svg';
import { Button, TextInput, View } from '~/components/shared';

export default function Home() {
  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Stack.Screen options={{ title: 'Tab One' }} />
          {/* @ts-ignore */}
          <TextInput placeholder="Input" icon={<Search />} label="Search" />

          <View style={{ width: '80%', marginHorizontal: 'auto' }}>
            <Link href="/modal" asChild>
              <Button type="secondary" containerStyle={{ marginTop: 16 }}>
                Button Demo
              </Button>
            </Link>
            <Button containerStyle={{ marginTop: 16 }}>Button Demo</Button>
            <Button
              type="outline"
              containerStyle={{
                marginTop: 16,
                width: 'auto',
                alignSelf: 'flex-start',
                paddingHorizontal: 12,
              }}>
              <SortIcon />
            </Button>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
});
