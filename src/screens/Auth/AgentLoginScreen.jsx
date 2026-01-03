import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/authSlice';
import { COLORS, SPACING } from '../../theme/theme';
import ClayButton from '../../components/common/ClayButton';
import ClayInput from '../../components/common/ClayInput';

const AgentLoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [agentId, setAgentId] = useState('');
  const [pin, setPin] = useState('');

  const handleLogin = () => {
    // Mock Agent Credentials
    if (agentId === 'AG-123' && pin === '1234') {
      
      // Save to Redux as Agent
      dispatch(loginSuccess({
        user: { name: 'Ali Shopkeeper', phone: '615000000' },
        isAgent: true
      }));

      // Navigate to Agent Dashboard (We will create this next)
      navigation.replace('AgentDashboard');
      
    } else {
      alert('Invalid Credentials. Try ID: AG-123, PIN: 1234');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        
        <View style={styles.header}>
          <Text style={styles.title}>Partner Access</Text>
          <Text style={styles.subtitle}>PUDO Agent Portal</Text>
        </View>

        <View style={styles.card}>
          <ClayInput 
            placeholder="Agent ID (e.g. AG-123)" 
            value={agentId} 
            onChangeText={setAgentId} 
            autoCapitalize="characters"
          />
          <ClayInput 
            placeholder="PIN Code" 
            value={pin} 
            onChangeText={setPin} 
            secureTextEntry
            keyboardType="numeric"
          />

          <View style={styles.spacer} />

          <ClayButton 
            title="Access Portal" 
            variant="secondary" // Navy for Agents
            onPress={handleLogin}
          />
        </View>

        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={styles.backLink}
        >
          <Text style={styles.backText}>← Back to Customer Login</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary, // Navy Background for Agent Mode
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
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: 16,
    color: '#8FA9C2',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  card: {
    backgroundColor: COLORS.background, // Light card on dark bg
    borderRadius: 20,
    padding: SPACING.l,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  spacer: {
    height: SPACING.l,
  },
  backLink: {
    marginTop: SPACING.xl,
    alignItems: 'center',
  },
  backText: {
    color: '#FFF',
    opacity: 0.8,
    textDecorationLine: 'underline',
  }
});

export default AgentLoginScreen;
