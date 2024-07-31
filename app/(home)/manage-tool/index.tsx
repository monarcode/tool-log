import { FlatList } from 'react-native';
import { createStyleSheet, UnistylesRuntime, useStyles } from 'react-native-unistyles';

import GoBack from '~/components/go-back';
import { Text, View } from '~/components/shared';
import ToolKit from '~/modules/manage-tool/toolkit';
import { TOOL_STATUS } from '~/modules/my-tools/tool';
const topInset = UnistylesRuntime.insets.top;
const bottomInset = UnistylesRuntime.insets.bottom;
const dummyTools = [
  {
    id: '1',
    name: 'Hammer',
    category: 'Hand Tools',
    updatedAt: '2022-01-01',
    isAvailable: true,
  },
  {
    id: '2',
    name: 'Chisel',
    category: 'Hand Tools',
    updatedAt: '2022-01-02',
    isAvailable: true,
  },
];

const tools = dummyTools.filter((tool) => tool.name.toLowerCase().includes(''));
const ManageToolScreen = () => {
  const { styles } = useStyles(_styles);
  // const $tools = useInventoryStore((store) => store.tools);
  // const tools = $tools.filter((tool) => tool.name.toLowerCase().includes(''));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <GoBack />
        <Text style={styles.headerLabel}>Management</Text>
      </View>
      <FlatList
        data={tools}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ToolKit
            id={item.id}
            title={item.name}
            category={item.category}
            status={item.isAvailable ? 'available' : ('unavailable' as TOOL_STATUS)}
            lastUsed={item.updatedAt}
            onPress={function (): void {
              throw new Error('Function not implemented.');
            }}
          />
        )}
      />
    </View>
  );
};

export default ManageToolScreen;

const _styles = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    paddingTop: topInset + 12,
    paddingBottom: bottomInset + 8,
    paddingHorizontal: theme.margins.containerMargin,
    backgroundColor: theme.colors.white,
  },
  bodyContainer: {
    padding: theme.margins.containerMargin,
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  headerLabel: {
    fontSize: 16,
    fontFamily: theme.fontFamily.semiBold,
    marginLeft: 16,
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
    width: 27.92,
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
    width: '100%',
    height: 400,
    marginTop: -20,
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
}));
