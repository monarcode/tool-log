import React, { ReactNode } from 'react';
import { TextInput as NativeTextInput, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Text } from './text';

import { colors } from '~/theme';

export const TextInput: React.FC<TextInputProps> = ({
  placeholder = '',
  value,
  onChangeText,
  icon,
  style,
  containerStyle,
  inputStyle,
  focusColor = colors.primary,
  unfocusedColor = colors.gray,
  label,
}) => {
  const focusProgress = useSharedValue(0);
  const { styles, theme } = useStyles(_styles);

  const animatedContainerStyle = useAnimatedStyle(() => {
    const borderColor = interpolateColor(focusProgress.value, [0, 1], [unfocusedColor, focusColor]);

    return {
      borderColor,
    };
  });

  const handleFocus = () => {
    focusProgress.value = withTiming(1, { duration: 200 });
  };

  const handleBlur = () => {
    focusProgress.value = withTiming(0, { duration: 200 });
  };

  return (
    <View style={[styles.outerContainer, style]}>
      {label && <Text style={styles.inputLabel}>{label}</Text>}
      <Animated.View style={[styles.container, containerStyle, animatedContainerStyle]}>
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <NativeTextInput
          style={[styles.input, inputStyle]}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </Animated.View>
    </View>
  );
};

const _styles = createStyleSheet((theme) => ({
  outerContainer: {
    width: 'auto',
    overflow: 'hidden',
    borderRadius: 8,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.5,
    borderRadius: 8,
    padding: 10,
    height: 45,
  },
  iconContainer: {
    marginRight: 10,
  },
  input: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: theme.fontFamily.regular,
    marginBottom: 5,
  },
}));

interface TextInputProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  icon?: ReactNode;
  containerStyle?: ViewStyle;
  style?: ViewStyle;
  inputStyle?: TextStyle;
  focusColor?: string;
  unfocusedColor?: string;
  label?: string;
}
