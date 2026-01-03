import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { COLORS, SPACING } from '../../theme/theme';
import ClayButton from '../../components/common/ClayButton';
import ClayCodeInput from '../../components/common/ClayCodeInput';
import { loginSuccess } from '../../redux/authSlice';

const OTPScreen = ({ navigation, route }) => {
  // Get phone number passed from Login Screen
  const { phone } = route.params || { phone: 'your number' };
  const dispatch = useDispatch();
  
  const [code, setCode] = useState('');
  const [timer, setTimer] = useState(30);

  // Simple countdown timer effect
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleVerify = () => {
    if (code.length === 6) {
      // SAVE USER TO REDUX
      dispatch(loginSuccess({ phone: phone }));
      
      // Navigate
      navigation.replace('PudoSelection');
    } else {
      alert("Please enter the full 6-digit code");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        
        <Text style={styles.title}>Verification</Text>
        <Text style={styles.subtitle}>
          We sent a code to <Text style={styles.highlight}>+252 {phone}</Text>
        </Text>

        <View style={styles.card}>
          <ClayCodeInput code={code} setCode={setCode} />
          
          <View style={styles.resendContainer}>
            <Text style={styles.resendText}>Didn't receive code? </Text>
            <TouchableOpacity disabled={timer > 0} onPress={() => setTimer(30)}>
              <Text style={[styles.resendLink, timer > 0 && styles.disabledLink]}>
                {timer > 0 ? `Resend in ${timer}s` : "Resend Now"}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.spacer} />

          <ClayButton 
            title="Verify & Login" 
            onPress={handleVerify}
            disabled={code.length < 6}
          />
        </View>

        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backLink}>
          <Text style={styles.backText}>Change Phone Number</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    padding: SPACING.l,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SPACING.s,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.xl,
  },
  highlight: {
    color: COLORS.textPrimary,
    fontWeight: 'bold',
  },
  card: {
    width: '100%',
    backgroundColor: COLORS.background,
    padding: SPACING.l,
    borderRadius: 20,
    // Clay Shadow
    shadowColor: "#A3B1C6",
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: SPACING.m,
  },
  resendText: {
    color: COLORS.textSecondary,
  },
  resendLink: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  disabledLink: {
    color: COLORS.textSecondary,
    opacity: 0.5,
  },
  spacer: {
    height: SPACING.l,
  },
  backLink: {
    marginTop: SPACING.xl,
  },
  backText: {
    color: COLORS.secondary,
    textDecorationLine: 'underline',
  }
});

export default OTPScreen;
