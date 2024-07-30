import { createStyleSheet, UnistylesRuntime, useStyles } from 'react-native-unistyles';
import { Text, View } from '~/components/shared';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';
import { Image, ScrollView, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import GoBack from '~/components/go-back';

const topInset = UnistylesRuntime.insets.top;
const bottomInset = UnistylesRuntime.insets.bottom;

const MyToolsScreen = () => {
  const { styles } = useStyles(_styles);
  const [showOption, setShowOption] = useState(false);

  const handleToggle = () => {
    setShowOption((option) => !option);
  };

  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <View style={styles.header}>
            <GoBack />

            <TouchableOpacity onPress={handleToggle} style={styles.optionButton}>
              <Entypo name="dots-three-vertical" size={15} color="#47474F" />
            </TouchableOpacity>
          </View>
        </View>
        {showOption && (
          <View style={styles.selectCard}>
            <TouchableOpacity>
              <Text style={styles.selectText}>Edit Tool</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.selectText}>Delete Tool</Text>
            </TouchableOpacity>
          </View>
        )}
        <Image
          resizeMode="contain"
          style={styles.toolImage}
          source={require('../../../assets/images/tool.png')}
        />
        <View style={styles.borderLine} />
        <View style={styles.bodyContainer}>
          <View style={styles.textCon}>
            <Text style={styles.title}>Electric drilling</Text>
            <Text style={styles.category}>Machine</Text>
          </View>
          <View style={styles.detailCon}>
            <View style={styles.subDetailCon}>
              <Text style={styles.category}>Current Status</Text>
              <View style={styles.successTagCon}>
                <View style={styles.successDot} />
                <Text style={{ fontSize: 8.72, fontWeight: '400' }}>Available</Text>
              </View>
            </View>
            <View style={styles.subDetailCon}>
              <Text style={styles.category}>No of tools available</Text>
              <View style={styles.errorTagCon}>
                <Text style={{ fontSize: 8.72, fontWeight: '400' }}>17</Text>
              </View>
            </View>
          </View>

          <Text style={styles.description}>
            This tool is intended for light-duty applications where it must drill tiny holes
            quickly. Drilling small holes requires a high speed and hand feed. Bolts and nuts are
            used to mount the machine's base on the floor or on a bench.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const stylesheet = createStyleSheet((theme) => ({}));

export default MyToolsScreen;

const _styles = createStyleSheet((theme) => ({
  mainContainer: {
    position: 'relative',
    flex: 1,
    paddingTop: topInset + 8,
    paddingBottom: bottomInset + 8,
  },
  container: {
    paddingHorizontal: theme.margins.containerMargin,
  },
  bodyContainer: {
    padding: theme.margins.containerMargin,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  subDetailCon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  selectCard: {
    borderRadius: 8,
    borderWidth: 0.5,
    width: 136,
    height: 102,
    borderColor: theme.colors.border,
    padding: 16,
    gap: 16,
    position: 'absolute',
    top: 105,
    right: theme.margins.containerMargin,
    zIndex: 5,
    backgroundColor: theme.colors.white,
  },
  selectText: {
    fontSize: 14,
    fontWeight: '400',
    color: theme.colors.text3,
    height: 25,
  },
  optionButton: {
    padding: theme.margins.xl,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: theme.colors.gray,
    borderWidth: 0.5,
    borderRadius: 8,
  },
  successDot: {
    width: 4.98,
    height: 4.98,
    backgroundColor: theme.colors.success,
    borderRadius: 3,
  },
  successTagCon: {
    flexDirection: 'row',
    gap: 4,
    backgroundColor: theme.colors.successTag,
    borderRadius: 14,
    width: 64,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorTagCon: {
    flexDirection: 'row',
    gap: 4,
    backgroundColor: theme.colors.errorTag,
    borderRadius: 14,
    width: 27.92,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    fontSize: 14,
    fontWeight: '300',
    marginTop: 12,
    color: theme.colors.text2,
    lineHeight: 19.6,
  },
  toolImage: {
    width: '100%',
    height: 400,
    marginTop: -20,
    zIndex: 2,
  },
  borderLine: {
    width: '100%',
    borderColor: theme.colors.gray,
    borderWidth: 0.5,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: theme.colors.text,
  },
  textCon: {
    alignItems: 'center',
    gap: 3,
    flexDirection: 'row',
  },
  detailCon: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10,
    gap: 10,
  },
  category: {
    fontSize: 12,
    fontWeight: '400',
    color: theme.colors.text2,
  },
}));
