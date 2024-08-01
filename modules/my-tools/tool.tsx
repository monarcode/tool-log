import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable } from 'react-native';
import Animated from 'react-native-reanimated';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Text, View } from '~/components/shared';
import categories, { CATEGORY } from '~/utils/categories';

export type TOOL_STATUS = 'available' | 'unavailable';

export interface ToolProps {
  id: string | number;
  title: string;
  category: string;
  description: string;
  status: TOOL_STATUS;
  lastUsed: Date | string | number;
}

const Tool = ({ id, category, description, lastUsed, status, title }: ToolProps) => {
  const { styles } = useStyles(_style);
  const isAvailable = status === 'available';
  const router = useRouter();

  const goToDetailsScreen = () => {
    router.navigate(`/my-tools/${id}`);
  };

  return (
    <Pressable onPress={goToDetailsScreen} style={styles.toolWrapper}>
      <View
        style={{
          width: 50,
          height: 50,
          padding: 4,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Animated.Image
          resizeMode="cover"
          style={styles.toolImage}
          source={categories(category as CATEGORY)}
          sharedTransitionTag={`tool-${id}`}
        />
      </View>

      <View style={styles.toolContent}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.category}>{category}</Text>
        </View>
        <Text style={styles.description}>{description.slice(0, 30)}...</Text>
        <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}>
          <Text style={styles.timeUsed}>Last Used:</Text>
          <Text style={styles.category}>{new Date(lastUsed).toLocaleString()}</Text>
        </View>
      </View>

      <View
        style={[styles.status, isAvailable ? styles.availableStatus : styles.unavailableStatus]}>
        <View style={[isAvailable ? styles.availableIndicator : styles.unavailableIndicator]} />
        <Text style={styles.statusText}>{status}</Text>
      </View>
    </Pressable>
  );
};

const _style = createStyleSheet((theme) => ({
  toolWrapper: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    alignItems: 'flex-start',
    gap: 16,
    marginVertical: 16,
  },
  toolContent: {
    justifyContent: 'space-between',
    // flex: 1,
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 15,
  },
  toolImage: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    color: theme.colors.text,
  },
  category: {
    fontSize: 12,
    fontWeight: '400',
    color: theme.colors.text2,
  },
  timeUsed: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: theme.fontFamily.medium,
  },
  description: {
    fontSize: 13,
    marginVertical: 2,
    fontWeight: '400',
    color: theme.colors.text2,
    lineHeight: 19.5,
  },
  status: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderRadius: 20,
  },
  statusText: {
    fontFamily: theme.fontFamily.medium,
    fontSize: 10,
    textTransform: 'capitalize',
  },
  availableIndicator: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: theme.colors.success,
  },
  availableStatus: {
    backgroundColor: theme.colors.successTag,
  },
  unavailableIndicator: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: 'red',
  },
  unavailableStatus: {
    backgroundColor: theme.colors.errorTag,
  },
}));

export default Tool;
