import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/authSlice';
import { COLORS, SPACING } from '../../theme/theme';
import ClayButton from '../../components/common/ClayButton';
import ClayCodeInput from '../../components/common/ClayCodeInput';
import BackgroundWave from '../../components/layout/BackgroundWave';

const OTPScreen = ({ navigation, route }) => {
  const { phone, fullName } = route.params || { phone: '', fullName: 'Valued Customer' };
  const dispatch = useDispatch();

  const [code, setCode] = useState('');
  const [timer, setTimer] = useState(30);
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleVerify = () => {
    if (code.length === 6) {
      setIsVerifying(true);
      Keyboard.dismiss();

      // Simulate API delay for effect
      setTimeout(() => {
        dispatch(
          loginSuccess({
            user: {
              phone: phone,
              name: fullName || 'Valued Customer',
            },
            isAgent: false,
          })
        );
        navigation.replace('PudoSelection');
      }, 500);
    } else {
      // Optional: Shake animation here
    }
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      <BackgroundWave />

      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
            {/* Navy Circle for Lock */}
            <View style={styles.iconContainer}>
              <Text style={styles.lockIcon}>🔒</Text>
            </View>

            <Text style={styles.title}>Verification Code</Text>

            {/* High Contrast Text */}
            <Text style={styles.subtitle}>
              We have sent a secure code to
              {'\n'}
              <Text style={styles.phoneText}>+252 {phone}</Text>
            </Text>

            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.editLink}>Wrong number?</Text>
            </TouchableOpacity>

            <View style={styles.spacer} />

            {/* Auto-submits when full */}
            <ClayCodeInput code={code} setCode={setCode} onFull={handleVerify} />

            <View style={styles.securityNote}>
              <Text style={styles.securityText}>⚠️ Do not share this code with anyone.</Text>
            </View>

            <View style={styles.spacer} />

            {/* Always Orange Button */}
            <View style={{ opacity: code.length < 6 ? 0.6 : 1 }}>
              <ClayButton
                title={isVerifying ? 'Verifying...' : 'Verify Identity'}
                onPress={handleVerify}
                disabled={isVerifying || code.length < 6}
                variant="primary" // Forces Orange
              />
            </View>

            <View style={styles.resendContainer}>
              <Text style={styles.resendText}>Didn't receive it? </Text>
              <TouchableOpacity disabled={timer > 0} onPress={() => setTimer(30)}>
                <Text style={[styles.resendLink, timer > 0 && styles.disabledLink]}>
                  {timer > 0 ? `Resend in ${timer}s` : 'Resend Now'}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 0,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: SPACING.l,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.background, // Deep Navy to pop against Orange
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.l,
    // Add a glow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  lockIcon: {
    fontSize: 36,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: SPACING.s,
  },
  subtitle: {
    fontSize: 16,
    color: '#E0E0E0', // Much lighter for readability
    textAlign: 'center',
    lineHeight: 24,
  },
  phoneText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 18,
  },
  editLink: {
    color: COLORS.primary,
    marginTop: SPACING.s,
    fontWeight: '600',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  spacer: {
    height: SPACING.l,
  },
  securityNote: {
    marginTop: SPACING.m,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.s,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  securityText: {
    color: '#FFD700', // Gold/Yellow
    fontSize: 12,
    fontWeight: '500',
  },
  resendContainer: {
    flexDirection: 'row',
    marginTop: SPACING.xl,
  },
  resendText: {
    color: '#B0B0B0',
    fontSize: 14,
  },
  resendLink: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: 14,
  },
  disabledLink: {
    color: '#B0B0B0',
    opacity: 0.7,
  },
});

export default OTPScreen;
