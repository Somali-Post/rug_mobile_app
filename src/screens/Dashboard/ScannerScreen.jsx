import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Vibration,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import { Camera } from 'react-native-camera-kit';
import { COLORS, SPACING } from '../../theme/theme';
import ClayButton from '../../components/common/ClayButton';
import ClayResultModal from '../../components/common/ClayResultModal';
import ClayManualInputModal from '../../components/common/ClayManualInputModal';

const ScannerScreen = ({ navigation }) => {
  const [isProcessed, setIsProcessed] = useState(false);
  const [manualVisible, setManualVisible] = useState(false);
  const [hasPermission, setHasPermission] = useState(Platform.OS === 'ios');

  const [modalConfig, setModalConfig] = useState({
    visible: false,
    type: 'success',
    title: '',
    message: ''
  });

  const requestCameraPermission = async () => {
    if (Platform.OS !== 'android') {
      setHasPermission(true);
      return;
    }
    const result = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
    setHasPermission(result === PermissionsAndroid.RESULTS.GRANTED);
  };

  useEffect(() => {
    requestCameraPermission();
  }, []);

  // Shared validation logic for both Camera and Manual Entry
  const validateCode = (code) => {
    if (isProcessed) return;

    Vibration.vibrate();
    setIsProcessed(true);
    setManualVisible(false); // Close manual input if open

    // Mock Validation Logic
    if (code === '8842') {
      setModalConfig({
        visible: true,
        type: 'success',
        title: 'Parcel Verified',
        message: 'Code matched. You may now hand over the package to the customer.'
      });
    } else {
      setModalConfig({
        visible: true,
        type: 'error',
        title: 'Invalid Code',
        message: `Code "${code}" does not match any item in your inventory.`
      });
    }
  };

  const onReadCode = (event) => {
    validateCode(event.nativeEvent.codeStringValue);
  };

  const handleCloseResult = () => {
    setModalConfig({ ...modalConfig, visible: false });
    if (modalConfig.type === 'success') {
      navigation.goBack();
    } else {
      setTimeout(() => setIsProcessed(false), 1000);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {!hasPermission ? (
        <View style={styles.permissionCard}>
          <Text style={styles.permissionTitle}>Camera Access Needed</Text>
          <Text style={styles.permissionText}>Allow camera access to scan QR codes.</Text>
          <ClayButton title="Enable Camera" onPress={requestCameraPermission} />
        </View>
      ) : (
        <>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Scan Customer Code</Text>
            <Text style={styles.subtitle}>Align QR code within the frame</Text>
          </View>

          {/* Camera */}
          <View style={styles.cameraContainer}>
            <Camera
              style={StyleSheet.absoluteFillObject}
              cameraType="back"
              scanBarcode={true}
              onReadCode={onReadCode}
              showFrame={true}
              resizeMode="cover"
              laserColor={COLORS.primary}
              frameColor={COLORS.primary}
              colorForScannerFrame={'black'}
            />
          </View>

          {/* Footer Actions */}
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.manualBtn}
              onPress={() => setManualVisible(true)}
            >
              <Text style={styles.manualText}>Enter Code Manually</Text>
            </TouchableOpacity>

            <ClayButton
              title="Cancel"
              variant="secondary"
              onPress={() => navigation.goBack()}
            />
          </View>

          {/* Modals */}
          <ClayManualInputModal
            visible={manualVisible}
            onClose={() => setManualVisible(false)}
            onSubmit={validateCode}
          />

          <ClayResultModal
            visible={modalConfig.visible}
            type={modalConfig.type}
            title={modalConfig.title}
            message={modalConfig.message}
            onClose={handleCloseResult}
          />
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    zIndex: 10,
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    color: '#ccc',
    fontSize: 14,
  },
  cameraContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    left: SPACING.l,
    right: SPACING.l,
    zIndex: 10,
  },
  manualBtn: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: SPACING.m,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: SPACING.m,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  manualText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  permissionCard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.l,
  },
  permissionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: SPACING.s,
    textAlign: 'center',
  },
  permissionText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: SPACING.l,
    textAlign: 'center',
  },
});

export default ScannerScreen;
