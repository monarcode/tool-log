import { createStyleSheet, UnistylesRuntime, useStyles } from 'react-native-unistyles';
import { View } from '~/components/shared';
import { ScrollView } from 'react-native';
import GoBack from '~/components/go-back';
import Tool, { TOOL_STATUS } from '~/modules/my-tools/tool';
import { useState } from 'react';
import Header from '~/components/header';
import { useInventoryStore } from '~/store/inventory.store';
const topInset = UnistylesRuntime.insets.top;
const bottomInset = UnistylesRuntime.insets.bottom;


const MyToolsScreen = () => {
  const { styles } = useStyles(_styles);
  const [searchQuery, setSearchQuery] = useState('');
  const handleTextSearch = (text?: string) => setSearchQuery(text as string);
  const $tools = useInventoryStore((store) => store.tools);
  const tools = $tools.filter((tool) => tool.name.toLowerCase().includes(searchQuery.toLowerCase()));
  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <View style={styles.header}>
            <GoBack />
          </View>
          <Header value={searchQuery} onChangeText={handleTextSearch} showSort={true} />
        </View>
        {tools.map((tool, index) => {
          return (
            <Tool
              title={tool.name}
              category={tool.category}
              description={tool.description}
              status={tool.isAvailable ? 'available' : ('unavailable' as TOOL_STATUS)}
              lastUsed={tool.updatedAt}
              id={tool.id}
              key={index}
            />
          );
        })}
      </View>
    </ScrollView>
  );
};

export default MyToolsScreen;

const _styles = createStyleSheet((theme) => ({
  mainContainer: {
    position: 'relative',
    flex: 1,
    paddingTop: topInset + 8,
    paddingBottom: bottomInset + 8,
  },
  container: {
    paddingHorizontal: theme.margins.containerMargin,
  },
  bodyContainer: {
    padding: theme.margins.containerMargin,
  },
  searchBar: {
    flexDirection: 'row',
    flex: 1,
    gap: 10,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    marginVertical: 20,
  },
  sortButton: {
    borderColor: theme.colors.gray,
    borderWidth: 0.5,
    borderRadius: 8,
    padding: 10,
    height: 45,
    width: 45,
    justifyContent: 'center',
    alignItems: 'center',
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
