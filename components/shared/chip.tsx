import { createStyleSheet, UnistylesVariants, useStyles } from 'react-native-unistyles';

import { Text, View } from '~/components/shared';

const Chip = ({ status, children }: ChipPops) => {
  const { styles } = useStyles(_styles, {
    status,
  });

  return (
    <View style={styles.chip}>
      <View style={styles.indicator} />
      <Text style={styles.text}>{children}</Text>
    </View>
  );
};

type ChipPops = UnistylesVariants<typeof _styles> & {
  children?: React.ReactNode;
};

const _styles = createStyleSheet((theme) => ({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    padding: 6,
    paddingRight: 10,
    borderRadius: 44,
    width: 'auto',
    alignSelf: 'flex-start',
    variants: {
      status: {
        available: {
          backgroundColor: '#E1F3D8',
        },
        unavailable: {
          backgroundColor: '#F9DCDC',
        },
      },
    },
  },
  text: {
    fontSize: 8,
    fontFamily: theme.fontFamily.regular,
    textTransform: 'capitalize',
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 20,
    backgroundColor: 'red',
    variants: {
      status: {
        available: {
          backgroundColor: '#6DC347',
        },
        unavailable: {
          backgroundColor: '#DC2626',
        },
      },
    },
  },
}));

export default Chip;
