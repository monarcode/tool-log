import React, { useState, useEffect, useRef, FC } from 'react';
import { View, Text, Animated, TouchableOpacity } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import SuccessIcon from '~/assets/icons/success-toast.svg';

interface ToastProps {
  message: string;
  duration?: number;
  type?: 'info' | 'success' | 'error' | 'warning';
  onClose?: () => void;
}

const Toast: FC<ToastProps> = ({ message, duration = 3000, type = 'info', onClose }) => {
  const { styles } = useStyles(_styles);
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate in
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    // Auto hide after duration
    const timer = setTimeout(() => {
      hideToast();
    }, duration);

    return () => clearTimeout(timer);
  }, []);

  const hideToast = () => {
    // Animate out
    Animated.timing(opacityAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      if (onClose) onClose();
    });
  };

  return (
    <Animated.View style={[styles.toast, styles[type], { opacity: opacityAnim }]}>
      {type === 'success' && <SuccessIcon />}
      <Text style={[styles.message, { color: type === 'info' ? '#fff' : '#222224' }]}>
        {message}
      </Text>
    </Animated.View>
  );
};

export default Toast;

// Styles
const _styles = createStyleSheet((theme) => ({
  toast: {
    position: 'absolute',
    top: 70,
    left: 20,
    right: 20,
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 1000,
    gap: 15,
  },
  message: {
    fontSize: 16,
    flex: 1,
  },

  info: {
    backgroundColor: theme.colors.primary,
  },
  success: {
    backgroundColor: '#E7F7E9',
  },
  error: {
    backgroundColor: '#F9DCDC',
  },
  warning: {
    // backgroundColor: theme.colors.warning,
  },
}));
