import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const PatientNameModal = ({
  visible,
  onClose,
  colors,
  onSubmit, // optional callback for later DB fetch
}) => {
  const [patientName, setPatientName] = useState('');

  const handleSubmit = () => {
    if (!patientName.trim()) return;

    // For now just pass value upward
    if (onSubmit) onSubmit(patientName);

    setPatientName('');
    onClose();
  };

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
          
          {/* Title */}
          <Text style={[styles.modalTitle, { color: colors.text }]}>
            Enter Patient Name
          </Text>

          {/* Input */}
          <View
            style={[
              styles.inputContainer,
              { borderColor: colors.border, backgroundColor: colors.background },
            ]}
          >
            <Icon
              name="account"
              size={20}
              color={colors.textSecondary}
              style={{ marginRight: 8 }}
            />
            <TextInput
              placeholder="Type patient name..."
              placeholderTextColor={colors.textSecondary}
              value={patientName}
              onChangeText={setPatientName}
              style={[styles.input, { color: colors.text }]}
            />
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={[
              styles.submitBtn,
              { backgroundColor: colors.primary },
            ]}
            activeOpacity={0.8}
            onPress={handleSubmit}
          >
            <Text style={{ color: '#fff', fontWeight: '600' }}>
              Search Patient
            </Text>
          </TouchableOpacity>

          {/* Cancel */}
          <TouchableOpacity
            onPress={onClose}
            style={[styles.closeBtn, { borderColor: colors.border }]}
          >
            <Text style={{ color: colors.textSecondary }}>
              Cancel
            </Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
};

export default PatientNameModal;

/* ================= STYLES ================= */

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
    marginBottom: 18,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    fontSize: 15,
  },
  submitBtn: {
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  closeBtn: {
    paddingTop: 12,
    borderTopWidth: 1,
    alignItems: 'center',
  },
});