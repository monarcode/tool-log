import { View as NativeView, ViewProps as NativeViewProps } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

export const View = ({ children, style, ...props }: NativeViewProps) => {
  const { styles } = useStyles(_styles);

  return (
    <NativeView style={[styles.view, style]} {...props}>
      {children}
    </NativeView>
  );
};

const _styles = createStyleSheet(() => ({
  view: {
    backgroundColor: 'transparent',
  },
}));
