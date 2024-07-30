import Ionicons from '@expo/vector-icons/Ionicons';
import { TouchableOpacity } from '@gorhom/bottom-sheet';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Pressable } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { View, Text } from '~/components/shared';
import categories, { CATEGORY } from '~/utils/categories';

export type TOOL_STATUS = 'available' | 'unavailable';
export interface ToolProps {
  id: string | number;
  title: string;
  category: string;
  status: TOOL_STATUS;
  lastUsed: Date | string | number;
  onPress: () => void;
}

const ToolKit = ({ id, category, title, lastUsed, status, onPress }: ToolProps) => {
  const { styles } = useStyles(_styles);
  const isAvailable = status === 'available';
  const router = useRouter();
  const goToDetailsScreen = () => {
    router.navigate(`/my-tools/${id}`);
  };
  return (
    <Pressable onPress={goToDetailsScreen} style={styles.toolWrapper}>
      <View style={styles.toolImageContainer}>
        <Image
          resizeMode="contain"
          style={styles.toolImage}
          source={categories(category as CATEGORY)}
        />
      </View>
      <View style={styles.toolContent}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <Text style={styles.date}>{new Date(lastUsed).toLocaleString()}</Text>
        <View
          style={[styles.status, isAvailable ? styles.availableStatus : styles.unavailableStatus]}>
          <View style={[isAvailable ? styles.availableIndicator : styles.unavailableIndicator]} />
          <Text style={styles.statusText}>{status}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={onPress} style={styles.icon}>
        <Ionicons name="ellipsis-vertical" size={18} color="black" />
      </TouchableOpacity>
    </Pressable>
  );
};

const _styles = createStyleSheet((theme) => ({
  toolWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
    marginVertical: 16,
  },
  toolContent: {
    flex: 1,
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  toolImageContainer: {
    width: 73,
    height: 73,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.colors.pink,
  },
  toolImage: {
    width: '100%',
    height: '100%',
    // aspectRatio: 1,
  },
  title: {
    fontSize: 14,
    fontFamily: theme.fontFamily.regular,
    color: theme.colors.text,
  },
  date: {
    fontSize: 12,
    marginVertical: 8,
    fontFamily: theme.fontFamily.light,
    color: theme.colors.text2,
  },
  status: {
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    width: '30%',
    borderRadius: 20,
  },
  statusText: {
    fontSize: 8.72,
    textTransform: 'capitalize',
    fontFamily: theme.fontFamily.light,
  },
  availableIndicator: {
    width: 4.92,
    height: 4.92,
    borderRadius: 10,
    backgroundColor: theme.colors.success,
  },
  availableStatus: {
    backgroundColor: theme.colors.successTag,
  },
  unavailableIndicator: {
    width: 4.92,
    height: 4.92,
    borderRadius: 10,
    backgroundColor: 'red',
  },
  unavailableStatus: {
    backgroundColor: theme.colors.errorTag,
  },
  icon: {
    alignSelf: 'flex-end',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    borderColor: theme.colors.border,
  },
}));

export default ToolKit;
