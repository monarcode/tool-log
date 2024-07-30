import { useState } from 'react';
import { ScrollView } from 'react-native';
import { createStyleSheet, UnistylesRuntime, useStyles } from 'react-native-unistyles';

import GoBack from '~/components/go-back';
import { Button, Dropdown, Text, TextInput, View } from '~/components/shared';

const topInset = UnistylesRuntime.insets.top;
const bottomInset = UnistylesRuntime.insets.bottom;
const AddToolScreen = () => {
  const { styles, theme } = useStyles(_styles);
  const [_category, setCategory] = useState('');

  const categoryOptions = ['Electrical', 'Mechanical', 'Hand Tool'];
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <GoBack />
        <Text style={styles.headerLabel}>Add New Tool</Text>
      </View>

      <ScrollView>
        <View style={styles.subtitleContainer}>
          <Text style={[styles.label, { fontSize: 24 }]}>Add New Tool</Text>
          <Text style={[styles.label, { fontSize: 16, color: theme.colors.gray }]}>
            Brief details of the tools
          </Text>
        </View>
        <View style={styles.contentContainer}>
          <TextInput
            label="Tool Name"
            placeholder="Enter the tool name"
            value=""
            onChangeText={() => {}}
            style={styles.inputContainer}
          />
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { marginBottom: 4 }]}>Category</Text>
            <Dropdown options={categoryOptions} onSelect={setCategory} placeholder="Category..." />
          </View>
          <TextInput
            label="Description"
            placeholder="Tool Description"
            value=""
            onChangeText={() => {}}
            inputStyle={{ alignSelf: 'flex-start' }}
            containerStyle={{ height: 125, marginBottom: 24 }}
          />

          <Button style={styles.addButton}>Add Tool</Button>
        </View>
      </ScrollView>
    </View>
  );
};
export default AddToolScreen;

const _styles = createStyleSheet((theme) => ({
  container: {
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
    marginTop: 140,
  },
  contentContainer: {
    marginTop: 50,
  },
  addButton: {
    marginTop: 32,
    width: 282,
  },
}));
