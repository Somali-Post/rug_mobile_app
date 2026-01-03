import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, Alert, Vibration } from 'react-native';
import { CameraScreen } from 'react-native-camera-kit';
import { COLORS, SPACING } from '../../theme/theme';
import ClayButton from '../../components/common/ClayButton';
import { MOCK_PARCELS } from '../../data/mockParcels';

const AgentScanScreen = ({ navigation }) => {
  const [scannedCode, setScannedCode] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Ref for the "Plug and Play" scanner input
  const scannerInputRef = useRef(null);

  // Keep focus on the hidden input so physical scanners work immediately
  useEffect(() => {
    const interval = setInterval(() => {
      if (scannerInputRef.current) {
        scannerInputRef.current.focus();
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const processCode = (code) => {
    if (isProcessing) return;
    setIsProcessing(true);
    Vibration.vibrate();

    // 1. Check if code exists in our "Database"
    // We check both Tracking Number (Parcel Label) AND Pickup Code (User QR)
    const parcel = MOCK_PARCELS.find(p => 
      p.trackingNumber === code || p.pickupCode === code
    );

    if (parcel) {
      if (parcel.status === 'READY_FOR_PICKUP') {
        Alert.alert(
          "✅ Success",
          `Parcel Found!\n\nOwner: ${parcel.sender}\nContent: ${parcel.description}\n\nCONFIRM HANDOVER?`,
          [
            { text: "Cancel", onPress: () => setIsProcessing(false), style: "cancel" },
            { text: "Confirm Handover", onPress: () => completeHandover(parcel) }
          ]
        );
      } else {
        Alert.alert("⚠️ Notice", `Parcel status is: ${parcel.status}. It cannot be collected yet.`);
        setIsProcessing(false);
      }
    } else {
      Alert.alert("❌ Error", "Invalid Code. Parcel not found in this PUDO.");
      setIsProcessing(false);
    }
  };

  const completeHandover = (parcel) => {
    // In a real app, you would API call here to update status to 'COLLECTED'
    Alert.alert("🎉 Done", "Parcel marked as COLLECTED.");
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Scan Parcel / QR</Text>
        <Text style={styles.subtitle}>Use Camera OR Gun Scanner</Text>
      </View>

      {/* Camera View */}
      <View style={styles.cameraContainer}>
        <CameraScreen
          scanBarcode={true}
          onReadCode={(event) => processCode(event.nativeEvent.codeStringValue)}
          showFrame={true}
          laserColor={COLORS.primary}
          frameColor="white"
          style={styles.camera}
        />
      </View>

      {/* Manual / Gun Scanner Input Area */}
      <View style={styles.manualContainer}>
        <Text style={styles.manualLabel}>Manual Entry / Gun Scanner:</Text>
        <TextInput
          ref={scannerInputRef}
          style={styles.input}
          placeholder="Click here & scan..."
          value={scannedCode}
          onChangeText={setScannedCode}
          onSubmitEditing={() => processCode(scannedCode)} // Physical scanners hit "Enter"
          autoCapitalize="characters"
        />
        <ClayButton 
          title="Check Code" 
          onPress={() => processCode(scannedCode)}
        />
      </View>

      <ClayButton 
        title="Cancel" 
        variant="secondary"
        onPress={() => navigation.goBack()}
      />

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },
  header: {
    padding: SPACING.l,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  subtitle: {
    color: '#8FA9C2',
    fontSize: 14,
  },
  cameraContainer: {
    height: 300,
    width: '100%',
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  camera: {
    height: 300,
  },
  manualContainer: {
    padding: SPACING.l,
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 1,
  },
  manualLabel: {
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: SPACING.s,
  },
  input: {
    backgroundColor: '#FFF',
    height: 50,
    borderRadius: 10,
    paddingHorizontal: SPACING.m,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#D1D9E6',
    marginBottom: SPACING.m,
  },
});

export default AgentScanScreen;
