import { createStyleSheet, UnistylesRuntime, useStyles } from 'react-native-unistyles';
import { Button, Text, View } from '~/components/shared';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';
import { Image, ScrollView, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import GoBack from '~/components/go-back';
import Toast from '~/components/shared/toast';
import { useInventoryStore } from '~/store/inventory.store';
import { useLocalSearchParams } from 'expo-router';

const topInset = UnistylesRuntime.insets.top;
const bottomInset = UnistylesRuntime.insets.bottom;

const ToolDetailScreen = () => {
  const { styles } = useStyles(_styles);
  const [showOption, setShowOption] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'info' | 'success' | 'error' | 'warning'>('info');
  const { id } = useLocalSearchParams();
  const handleToggle = () => {
    setShowOption((option) => !option);
  };

  const handleCollectTool = () => {
    setToastMessage('Tool collected successfully!');
    setToastType('success');
    setToastVisible(true);
  };

  const handleReturnTool = () => {
    setToastMessage('Tool returned!');
    setToastType('info');
    setToastVisible(true);
  };

  useEffect(() => {
    if (toastVisible) {
      const timer = setTimeout(() => {
        setToastVisible(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toastVisible]);

  const tools = useInventoryStore((store) => store.tools);
  const getTool = tools.filter((tool) => tool.id == id)[0];
  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      {toastVisible && (
        <Toast message={toastMessage} type={toastType} onClose={() => setToastVisible(false)} />
      )}
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
        {!getTool ? (
          <View>
            <Image
              resizeMode="contain"
              style={styles.toolImage}
              source={require('../../../assets/images/empty-box.png')}
            />
            <Text style={styles.notFoundText}>Tool not found</Text>
          </View>
        ) : (
          <View>
            <Image
              resizeMode="contain"
              style={styles.toolImage}
              source={require('../../../assets/images/tool.png')}
            />
            <View style={styles.borderLine} />
            <View style={styles.bodyContainer}>
              <View style={styles.textCon}>
                <Text style={styles.title}>{getTool.name}</Text>
                <Text style={styles.category}>{getTool.category}</Text>
              </View>
              <View style={styles.detailCon}>
                <View style={styles.subDetailCon}>
                  <Text style={styles.category}>Current Status</Text>
                  <View style={styles.successTagCon}>
                    <View style={styles.successDot} />
                    <Text style={{ fontSize: 8.72, fontWeight: '400' }}>
                      {getTool.isAvailable ? 'Available' : 'Unavaiable'}
                    </Text>
                  </View>
                </View>
                <View style={styles.subDetailCon}>
                  <Text style={styles.category}>No of tools available</Text>
                  <View style={styles.errorTagCon}>
                    <Text style={{ fontSize: 8.72, fontWeight: '400' }}>17</Text>
                  </View>
                </View>
              </View>

              <Text style={styles.description}>{getTool.description}</Text>
              {/* <View style={styles.toolsBtns}>
                <Button onPress={handleCollectTool}>Collect Tool</Button>
                <Button type="secondary" onPress={handleReturnTool}>
                  Return Tool
                </Button>
              </View> */}
            </View>
          </View>
        )}
        <View></View>
      </View>
    </ScrollView>
  );
};
export default ToolDetailScreen;

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
  notFoundText: {
    fontSize: 30,
    textAlign: 'center',
    fontFamily: theme.fontFamily.semiBold,
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
  toolsBtns: {
    marginTop: 25,
    gap: 20,
  },
}));
