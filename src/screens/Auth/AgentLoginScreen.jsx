import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, StatusBar } from 'react-native';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/authSlice';
import { COLORS, SPACING } from '../../theme/theme';
import ClayButton from '../../components/common/ClayButton';
import ClayInput from '../../components/common/ClayInput';
import AgentBackgroundWave from '../../components/layout/AgentBackgroundWave';

const AgentLoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [agentId, setAgentId] = useState('');
  const [pin, setPin] = useState('');

  const handleLogin = () => {
    if (agentId === 'AG-123' && pin === '1234') {
      dispatch(loginSuccess({
        user: { name: 'Ali Shopkeeper', phone: '615000000' },
        isAgent: true
      }));
      navigation.replace('AgentDashboard');
    } else {
      alert('Invalid Credentials. Try ID: AG-123, PIN: 1234');
    }
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <AgentBackgroundWave />

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.iconBox}>
              <Text style={styles.icon}>🛡️</Text>
            </View>
            <Text style={styles.title}>Partner Access</Text>
            <Text style={styles.subtitle}>SECURE AGENT PORTAL</Text>
          </View>

          {/* Login Card */}
          <View style={styles.card}>
            <ClayInput
              placeholder="Agent ID (e.g. AG-123)"
              value={agentId}
              onChangeText={setAgentId}
              autoCapitalize="characters"
              label="Agent ID"
            />
            <ClayInput
              placeholder="PIN Code"
              value={pin}
              onChangeText={setPin}
              secureTextEntry
              keyboardType="numeric"
              label="Security PIN"
            />

            <View style={styles.spacer} />

            <ClayButton
              title="Access Portal"
              variant="primary" // Orange button pops on dark background
              onPress={handleLogin}
            />
          </View>

          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backLink}
          >
            <Text style={styles.backText}>← Return to Customer Login</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#001F40', // Deep Navy
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: SPACING.l,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  iconBox: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.m,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  icon: {
    fontSize: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.primary,
    letterSpacing: 2,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    padding: SPACING.l,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  spacer: {
    height: SPACING.l,
  },
  backLink: {
    marginTop: SPACING.xl,
    alignItems: 'center',
  },
  backText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 14,
  }
});

export default AgentLoginScreen;
