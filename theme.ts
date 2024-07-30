export const colors = {
  white: '#ffffff',
  primary: '#2D2966',
  pink: '#F9DCDC',
  neutral: {
    100: '#776D6A',
    200: '#5C4F4A',
    300: '#413C3A',
  },
  gray: '#D9D5D4',
  text: '#413C3A',
  text2: '#776D6A',
  text3: '#47474F',
  dark: '#0A0A0A',
  successTag: '#E1F3D8',
  errorTag: '#F9E7EA',
  success: '#6DC347',
  border: '#DCDCDE',
} as const;

const fontSizes = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  xxl: 20,
};

const fontFamily = {
  light: 'Manrope_300Light',
  regular: 'Manrope_400Regular',
  medium: 'Manrope_500Medium',
  semiBold: 'Manrope_600SemiBold',
};

export const lightTheme = {
  colors,
  fontSizes,
  fontFamily,
  components: {
    container: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
      padding: 24,
    },
    separator: {
      height: 1,
      marginVertical: 30,
      width: '80%',
      backgroundColor: 'grey',
    },
    button: {
      alignItems: 'center',
      backgroundColor: colors.white,
      borderRadius: 24,
      elevation: 5,
      flexDirection: 'row',
      justifyContent: 'center',
      padding: 16,
      shadowColor: '#000',
      shadowOffset: {
        height: 2,
        width: 0,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    buttonText: {
      color: colors.white,
      fontSize: 16,
      fontWeight: '600',
      textAlign: 'center',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    subtitle: {
      color: colors.neutral[100],
      fontSize: 36,
    },
  },
  margins: {
    sm: 2,
    md: 4,
    lg: 8,
    xl: 12,
    xxl: 16,
    containerMargin: 24,
  },
} as const;
