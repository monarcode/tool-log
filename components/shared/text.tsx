import { Text as NativeText, TextProps as NativeTextProps } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

export const Text = ({ children, ...props }: NativeTextProps) => {
  const { styles } = useStyles(_styles);

  return (
    <NativeText style={[styles.text, props.style]} {...props}>
      {children}
    </NativeText>
  );
};

const _styles = createStyleSheet((theme) => ({
  text: {},
}));
