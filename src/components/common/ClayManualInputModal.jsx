import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, Dimensions, TouchableOpacity } from 'react-native';
import { COLORS, SPACING } from '../../theme/theme';
import ClayButton from './ClayButton';
import ClayInput from './ClayInput';

const { width } = Dimensions.get('window');

const ClayManualInputModal = ({ visible, onClose, onSubmit }) => {
  const [code, setCode] = useState('');

  const handleSubmit = () => {
    if (code.length > 0) {
      onSubmit(code);
      setCode(''); // Clear for next time
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Manual Entry</Text>
          <Text style={styles.subtitle}>Enter the 4-digit pickup code</Text>

          <ClayInput
            placeholder="Code (e.g. 8842)"
            value={code}
            onChangeText={setCode}
            keyboardType="numeric"
            autoFocus={true}
          />

          <View style={styles.spacer} />

          <ClayButton title="Verify Code" onPress={handleSubmit} />

          <TouchableOpacity onPress={onClose} style={styles.cancelBtn}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: width * 0.9,
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    padding: SPACING.l,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 4,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: SPACING.l,
    textAlign: 'center',
  },
  spacer: {
    height: SPACING.m,
  },
  cancelBtn: {
    marginTop: SPACING.m,
    alignItems: 'center',
    padding: SPACING.s,
  },
  cancelText: {
    color: COLORS.textSecondary,
    textDecorationLine: 'underline',
  },
});

export default ClayManualInputModal;
