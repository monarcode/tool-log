import { BottomSheetBackdropProps } from '@gorhom/bottom-sheet';
import React, { useMemo } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated';

const CustomBackdrop = ({
  animatedIndex,
  style,
  close,
}: BottomSheetBackdropProps & { close?: (() => void) | undefined }) => {
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(animatedIndex.value, [0, 1], [0.5, 0.8], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
  }));

  const containerStyle = useMemo(
    () => [
      style,
      {
        backgroundColor: '#000000',
      },
      containerAnimatedStyle,
    ],
    [style, containerAnimatedStyle]
  );

  return (
    <TouchableWithoutFeedback onPress={close}>
      <Animated.View onTouchEnd={close} style={containerStyle} />
    </TouchableWithoutFeedback>
  );
};

export default CustomBackdrop;
