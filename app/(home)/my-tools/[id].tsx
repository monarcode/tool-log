import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, ScrollView, TouchableOpacity, Alert, Modal } from 'react-native';
import { createStyleSheet, UnistylesRuntime, useStyles } from 'react-native-unistyles';

import GoBack from '~/components/go-back';
import { Button, Text, View } from '~/components/shared';
import Toast from '~/components/shared/toast';
import { useInventoryStore } from '~/store/inventory.store';
import categories, { CATEGORY } from '~/utils/categories';

const topInset = UnistylesRuntime.insets.top;
const bottomInset = UnistylesRuntime.insets.bottom;

const ToolDetailScreen = () => {
  const { styles } = useStyles(_styles);
  const [showOption, setShowOption] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [toastType, setToastType] = useState<'info' | 'success' | 'error' | 'warning'>('info');
  const { updateTool } = useInventoryStore((store) => store);
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

  const handleDelete = () => {
    const $confirm = Alert.alert("Are you sure you want to delete?");
  }

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

  const handleEditTool = () => {
    setShowOption((option) => !option);
    router.navigate(`/edit-tool/${getTool.id}`)
  }

  // Fot the modal
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'pink' }}>
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
              <TouchableOpacity onPress={handleEditTool}>
                <Text style={styles.selectText}>Edit Tool</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleDelete}>
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
                source={categories(getTool.category as CATEGORY)}
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
                    <View style={[getTool.isAvailable ? styles.successTagCon : styles.errorTagCon]}>
                      <View style={[getTool.isAvailable ? styles.successDot : styles.errorDot]} />
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
              </View>
            </View>
          )}
          <View />
          <View />
        </View>

        <TouchableOpacity onPress={() => toggleModal()}>
          <Text>Return tool</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent onRequestClose={toggleModal}>
        <View style={{ flex: 1, width: '100%', height: '100%', justifyContent: 'center', padding: 4, backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
          <View style={{ alignItems: 'center', paddingHorizontal: 16, paddingVertical: 24, borderRadius: 16, backgroundColor: 'white' }}>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ textAlign: 'center' }}>Confirm Deletion</Text>
            </View>

            <View>
              <TouchableOpacity>
                <Text>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity style={{}}>
                <Text style={{ color: 'white' }}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal >
    </View >
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
  errorDot: {
    width: 4.98,
    height: 4.98,
    backgroundColor: "red",
    borderRadius: 3,
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
    width: 64,
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
    width: 'auto',
    height: 400,
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

  // Modal
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
}));



