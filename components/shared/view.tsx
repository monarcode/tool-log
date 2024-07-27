import { View as NativeView, ViewProps as NativeViewProps } from 'react-native';

export const View = ({ children, style, ...props }: NativeViewProps) => {
  return (
    <NativeView style={[style]} {...props}>
      {children}
    </NativeView>
  );
};
