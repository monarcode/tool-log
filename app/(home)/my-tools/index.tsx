import { createStyleSheet, UnistylesRuntime, useStyles } from 'react-native-unistyles';
import { TextInput, View } from '~/components/shared';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ScrollView, TouchableOpacity } from 'react-native';
import GoBack from '~/components/go-back';
import Tool, { TOOL_STATUS } from '~/components/Tool';
import { useState } from 'react';
const topInset = UnistylesRuntime.insets.top;
const bottomInset = UnistylesRuntime.insets.bottom;

const data = [
  {
    title: 'Cordless Impact Driver',
    category: 'Machine',
    description:
      'This impact driver offers high torque and variable speed, making it perfect for heavy-duty tasks.',
    status: 'available',
    lastUsed: new Date('2024-07-29T12:34:56Z'),
    id: '2',
  },
  {
    title: 'Laser Level',
    category: 'Measurement',
    description:
      'Provides accurate level and alignment measurements with bright laser lines for visibility.',
    status: 'unavailable',
    lastUsed: new Date('2024-07-28T09:15:30Z'),
    id: '3',
  },
  {
    title: 'Angle Grinder',
    category: 'Machine',
    description:
      'A versatile tool for grinding, cutting, and polishing with a powerful motor and ergonomic design.',
    status: 'available',
    lastUsed: new Date('2024-07-25T17:22:14Z'),
    id: '4',
  },
  {
    title: 'Digital Caliper',
    category: 'Measurement',
    description:
      'High-precision digital caliper for measuring internal and external dimensions with an easy-to-read display.',
    status: 'available',
    lastUsed: new Date('2024-07-30T08:45:00Z'),
    id: '5',
  },
  {
    title: 'Heat Gun',
    category: 'Machine',
    description:
      'Multi-functional heat gun with adjustable temperature settings for stripping paint, thawing pipes, and more.',
    status: 'unavailable',
    lastUsed: new Date('2024-07-20T14:10:50Z'),
    id: '6',
  },
  {
    title: 'Oscillating Tool',
    category: 'Machine',
    description: 'An essential tool for cutting, sanding, scraping, and grinding in tight spaces.',
    status: 'available',
    lastUsed: new Date('2024-07-22T10:55:33Z'),
    id: '7',
  },
];

const MyToolsScreen = () => {
  const { styles } = useStyles(_styles);
  const [searchQuery, setSearchQuery] = useState('');
  const tools = data.filter((tool) => tool.title.toLowerCase().match(searchQuery));
  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <View style={styles.header}>
            <GoBack />
          </View>
          <View style={styles.searchBar}>
            <TextInput
              value={searchQuery}
              style={{ flex: 1 }}
              placeholder="Search for tools, categories"
              onChangeText={(text) => setSearchQuery(text)}
            />
            <TouchableOpacity style={styles.sortButton}>
              <MaterialIcons name="sort" />
            </TouchableOpacity>
          </View>
        </View>
        {tools.map((tool, index) => {
          return (
            <Tool
              title={tool.title}
              category={tool.category}
              description={tool.description}
              status={tool.status as TOOL_STATUS}
              lastUsed={tool.lastUsed}
              id={tool.id}
              key={index}
            />
          );
        })}
      </View>
    </ScrollView>
  );
};

const stylesheet = createStyleSheet((theme) => ({}));

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
