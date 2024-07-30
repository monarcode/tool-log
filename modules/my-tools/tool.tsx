import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Pressable } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { View, Text } from '~/components/shared';

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
      <Image
        resizeMode="contain"
        style={styles.toolImage}
        source={require('~/assets/images/tool.png')}
      />
      <View style={styles.toolContent}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.category}>{category}</Text>
        </View>
        <Text style={styles.description}>{description.slice(0, 30)}...</Text>
        <Text>
          <Text style={styles.timeUsed}>Last Used:</Text>
          <Text style={styles.category}>{new Date(lastUsed).toLocaleString()}</Text>
        </Text>
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
    padding: 20,
    alignItems: 'flex-start',
  },
  toolContent: {
    flex: 1,
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 15,
  },
  toolImage: {
    width: 50,
    height: 50,
    zIndex: 2,
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
    fontWeight: '700',
  },
  description: {
    fontSize: 13,
    marginVertical: 5,
    fontWeight: '400',
    color: theme.colors.text2,
    lineHeight: 19.5,
  },
  status: {
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 12,
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
