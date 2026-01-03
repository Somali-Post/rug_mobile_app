import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Alert, Vibration } from 'react-native';
import { CameraScreen } from 'react-native-camera-kit';
import { COLORS, SPACING } from '../../theme/theme';
import ClayButton from '../../components/common/ClayButton';

const ScannerScreen = ({ navigation }) => {
  const [isProcessed, setIsProcessed] = useState(false);

  const onReadCode = (event) => {
    if (isProcessed) return; // Prevent double scans

    const code = event.nativeEvent.codeStringValue;
    
    // 1. Feedback (Vibrate phone to confirm scan)
    Vibration.vibrate();
    setIsProcessed(true);

    // 2. Simulate Backend Validation
    // In a real app, we would API call here: POST /handover { code }
    console.log("Scanned Code:", code);

    // Mock Logic: Check if code is '8842' (from our mock data)
    if (code === '8842') {
      Alert.alert(
        "✅ Success!",
        "Parcel Verified. Hand over package to customer.",
        [
          { 
            text: "Done", 
            onPress: () => navigation.goBack() 
          }
        ]
      );
    } else {
      Alert.alert(
        "❌ Error",
        "Invalid Code. This code does not match any parcel in your inventory.",
        [
          { 
            text: "Try Again", 
            onPress: () => setIsProcessed(false) // Reset to scan again
          }
        ]
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      
      {/* Header Overlay */}
      <View style={styles.header}>
        <Text style={styles.title}>Scan Customer Code</Text>
        <Text style={styles.subtitle}>Align QR code within the frame</Text>
      </View>

      {/* The Camera View */}
      <View style={styles.cameraContainer}>
        <CameraScreen
          scanBarcode={true}
          onReadCode={onReadCode}
          showFrame={true} // Shows the green box
          laserColor={COLORS.primary}
          frameColor={COLORS.primary}
          colorForScannerFrame={'black'}
        />
      </View>

      {/* Footer Overlay */}
      <View style={styles.footer}>
        <ClayButton 
          title="Cancel" 
          variant="secondary" 
          onPress={() => navigation.goBack()} 
        />
      </View>

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
    flex: 1,
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    left: SPACING.l,
    right: SPACING.l,
    zIndex: 10,
  },
});

export default ScannerScreen;
