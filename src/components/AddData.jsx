import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const AddDataModal = ({
  visible,
  onClose,
  navigation,
  colors,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      presentationStyle="overFullScreen"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      {/* Dark Background */}
      <TouchableOpacity
        activeOpacity={1}
        onPress={onClose}
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor: 'rgba(0,0,0,0.75)' },
        ]}
      />

      {/* Modal Card */}
      <View style={styles.modalOverlay}>
        <View style={[styles.modalCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.modalTitle, { color: colors.text }]}>
            Add Data
          </Text>

          <TouchableOpacity
            style={styles.modalOption}
            onPress={() => {
              onClose();
              navigation.navigate('AddPatient');
            }}
          >
            <Icon name="account-plus" size={22} color={colors.primary} />
            <Text style={[styles.modalText, { color: colors.text }]}>
              Add Patient
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.modalOption}
            onPress={() => {
              onClose();
              navigation.navigate('AddDonor');
            }}
          >
            <Icon name="heart-plus" size={22} color={colors.success} />
            <Text style={[styles.modalText, { color: colors.text }]}>
              Add Donor
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onClose}
            style={[styles.closeBtn, { borderColor: colors.border }]}
          >
            <Text style={{ color: colors.textSecondary }}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default AddDataModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    width: '85%',
    borderRadius: 20,
    padding: 20,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 12,
  },
  modalText: {
    fontSize: 16,
    fontWeight: '500',
  },
  closeBtn: {
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    alignItems: 'center',
  },
});