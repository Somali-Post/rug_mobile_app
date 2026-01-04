import React from 'react';
import { View, Text, StyleSheet, Modal, Dimensions } from 'react-native';
import { COLORS, SPACING } from '../../theme/theme';
import ClayButton from './ClayButton';

const { width } = Dimensions.get('window');

const ClayResultModal = ({ visible, type = 'success', title, message, onClose }) => {
  const isSuccess = type === 'success';
  const icon = isSuccess ? '✓' : '✕';
  const iconColor = isSuccess ? COLORS.success : COLORS.error;
  const btnVariant = isSuccess ? 'primary' : 'secondary';

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={[styles.iconCircle, { borderColor: iconColor }]}>
            <Text style={[styles.iconText, { color: iconColor }]}>{icon}</Text>
          </View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.spacer} />
          <ClayButton
            title={isSuccess ? "Done" : "Try Again"}
            variant={btnVariant}
            onPress={onClose}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: width * 0.85,
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    padding: SPACING.xl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 20,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    marginBottom: SPACING.l,
    marginTop: -SPACING.xl,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  iconText: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: SPACING.s,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  spacer: {
    height: SPACING.xl,
  },
});

export default ClayResultModal;
