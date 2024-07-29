import { Pressable, PressableProps, TextProps } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Text } from './text'; // Assuming you have a custom Text component

/**
 * Button component
 *
 * This component renders a customizable button using React Native's Pressable component.
 * It supports different button types (primary, secondary, outline) with corresponding styles.
 *
 * @param {ButtonProps} props - Props passed to the Button component.
 * @param {React.ReactNode} props.children - The content to be displayed inside the button.
 * @param {Buttontype} [props.type='primary'] - The type of the button (primary, secondary, outline).
 * @param {PressableProps['style']} [props.containerStyle] - Custom styles for the button container.
 * @param {TextProps['style']} [props.labelStyle] - Custom styles for the button label.
 */
export const Button = ({
  style,
  children,
  type = 'primary',
  containerStyle,
  labelStyle,
  ...others
}: ButtonProps) => {
  const { styles } = useStyles(_styles, {
    type,
  });

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        typeof containerStyle === 'function' ? containerStyle({ pressed }) : containerStyle,
      ]}
      {...others}>
      <Text style={[styles.label, labelStyle]}>{children}</Text>
    </Pressable>
  );
};

const _styles = createStyleSheet((theme) => ({
  container: {
    height: 45,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    // Define style variants based on button type
    variants: {
      type: {
        primary: {
          backgroundColor: theme.colors.primary,
        },
        secondary: {
          backgroundColor: theme.colors.gray,
        },
        outline: {
          backgroundColor: 'transparent',
          borderWidth: 0.5,
          borderColor: theme.colors.gray,
        },
      },
    },
  },
  label: {
    fontSize: theme.fontSizes.md, // Button label font size
    // Define style variants based on button type
    variants: {
      type: {
        primary: {
          color: theme.colors.white,
          fontFamily: theme.fontFamily.regular,
        },
        secondary: {
          color: theme.colors.dark,
          fontFamily: theme.fontFamily.regular,
        },
      },
    },
  },
}));

type Buttontype = 'primary' | 'secondary' | 'outline';

interface ButtonProps extends PressableProps {
  children: React.ReactNode;
  type?: Buttontype; // Type of the button based on button type
  containerStyle?: PressableProps['style'];
  labelStyle?: TextProps['style'];
}
