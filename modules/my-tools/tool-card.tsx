import { router } from 'expo-router';
import { Pressable } from 'react-native';
import Animated from 'react-native-reanimated';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Text, View } from '~/components/shared';
import Chip from '~/components/shared/chip';
import categories, { CATEGORY } from '~/utils/categories';

const ToolCard = ({ tool }: { tool: ToolProps }) => {
  const { styles } = useStyles(_style);

  const goToDetailsScreen = () => {
    router.navigate(`/my-tools/${tool.id}`);
  };

  return (
    <Pressable style={styles.wrapper} onPress={goToDetailsScreen}>
      <View style={styles.imageWrapper}>
        <Animated.Image
          resizeMode="cover"
          style={styles.toolImage}
          source={categories(tool.category as CATEGORY)}
          sharedTransitionTag={`tool-${tool.id}`}
        />
      </View>

      <View style={styles.body}>
        <Text style={styles.title} numberOfLines={1}>
          {tool.title}
        </Text>
        <Text numberOfLines={2} style={styles.description}>
          {tool.description}
        </Text>
        <Text style={styles.date}>{new Date(tool.lastUsed).toLocaleString()}</Text>
      </View>

      <View style={styles.status}>
        <Chip status={tool.status}>{tool.status}</Chip>
      </View>
    </Pressable>
  );
};
export default ToolCard;

const _style = createStyleSheet((theme) => ({
  wrapper: {
    flexDirection: 'row',
    width: '100%',
    overflow: 'hidden',
    height: 80,
    gap: 6,
  },
  imageWrapper: {
    flex: 0.4,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    // borderColor: '#F9E7EA',
  },
  toolImage: {
    width: '100%',
    height: '100%',
    aspectRatio: 1,
    objectFit: 'fill',
  },
  body: {
    flex: 0.5,
    columnGap: 4,
    flexGrow: 1,
    flexShrink: 0,
  },
  title: {
    fontSize: 14,
    fontFamily: 'Manrope_600SemiBold',
  },
  status: {
    flexShrink: 0,
  },
  description: {
    fontSize: 13,
    color: '#776D6A',
    fontFamily: 'Manrope_400Regular',
  },
  date: {
    fontSize: 12,
    color: '#776D6A',
    fontFamily: 'Manrope_400Regular',
    textTransform: 'capitalize',
    marginTop: 'auto',
    paddingBottom: 4,
  },
}));

export type TOOL_STATUS = 'available' | 'unavailable';

export interface ToolProps {
  id: string | number;
  title: string;
  category: string;
  description: string;
  status: TOOL_STATUS;
  lastUsed: Date | string | number;
}
