import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  StatusBar,
} from 'react-native';
import { COLORS, SPACING } from '../../theme/theme';
import ClayButton from '../../components/common/ClayButton';
import ClayInput from '../../components/common/ClayInput';
import ClayDropdown from '../../components/common/ClayDropdown';
import BackgroundWave from '../../components/layout/BackgroundWave';
import LanguageToggle from '../../components/common/LanguageToggle';
import { somaliAdministrativeHierarchy } from '../../data/somaliAdministrativeHierarchy';

const LoginScreen = ({ navigation }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [phone, setPhone] = useState('');
  const [fullName, setFullName] = useState('');

  // Dropdown States
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  // Derived Data for Dropdowns
  const regions = useMemo(() => Object.keys(somaliAdministrativeHierarchy).sort(), []);

  const cities = useMemo(() => {
    if (!selectedRegion) return [];
    return Object.keys(somaliAdministrativeHierarchy[selectedRegion].cities).sort();
  }, [selectedRegion]);

  const districts = useMemo(() => {
    if (!selectedRegion || !selectedCity) return [];
    return Object.keys(somaliAdministrativeHierarchy[selectedRegion].cities[selectedCity].districts).sort();
  }, [selectedRegion, selectedCity]);

  // Reset logic when parent selection changes
  const handleRegionSelect = (region) => {
    setSelectedRegion(region);
    setSelectedCity(null);
    setSelectedDistrict(null);
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setSelectedDistrict(null);
  };

  const handleAction = () => {
    if (phone.length < 7) {
      alert('Please enter a valid phone number');
      return;
    }
    // Navigate to OTP, passing the phone number
    navigation.navigate('OTP', { phone: phone });
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      {/* 1. The Abstract Wave Background */}
      <BackgroundWave />

      <SafeAreaView style={styles.safeArea}>
        {/* Top Bar: Language Toggle (Fixed Padding) */}
        <View style={styles.topBar}>
          <LanguageToggle />
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            {/* 2. Header Section */}
            <View style={styles.header}>
              <View style={styles.logoContainer}>
                <Image
                  source={require('../../assets/images/logo.png')}
                  style={styles.logo}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.appSubtitle}>
                Brought to you by the <Text style={styles.boldText}>Somali Postal Service</Text>
              </Text>
            </View>

            {/* 3. The Form Card */}
            <View style={styles.formCard}>
              <Text style={styles.formTitle}>
                {isRegistering ? 'Create Account' : 'Welcome Back'}
              </Text>

              {isRegistering && (
                <>
                  <ClayInput
                    placeholder="e.g. Yusef Cali Hassan"
                    value={fullName}
                    onChangeText={setFullName}
                    label="Full Name"
                  />

                  {/* Cascading Dropdowns */}
                  <ClayDropdown
                    label="Region"
                    placeholder="Select Region"
                    value={selectedRegion}
                    options={regions}
                    onSelect={handleRegionSelect}
                  />

                  <ClayDropdown
                    label="City"
                    placeholder="Select City"
                    value={selectedCity}
                    options={cities}
                    onSelect={handleCitySelect}
                    disabled={!selectedRegion}
                  />

                  <ClayDropdown
                    label="District"
                    placeholder="Select District"
                    value={selectedDistrict}
                    options={districts}
                    onSelect={setSelectedDistrict}
                    disabled={!selectedCity}
                  />
                </>
              )}

              <ClayInput
                prefix="+252"
                placeholder="61 XXX XXXX"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                label="Mobile Number"
              />

              <View style={styles.spacer} />

              <ClayButton
                title={isRegistering ? 'Register' : 'Login'}
                onPress={handleAction}
              />
            </View>

            {/* 4. Footer Switcher */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>
                {isRegistering ? 'Already have an account?' : "Don't have an account?"}
              </Text>
              <TouchableOpacity onPress={() => setIsRegistering(!isRegistering)}>
                <Text style={styles.switchLink}>
                  {isRegistering ? ' Login' : ' Register'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Agent Access Link */}
            <TouchableOpacity
              style={styles.partnerLink}
              onPress={() => navigation.navigate('AgentLogin')}
            >
              <Text style={styles.partnerText}>Partner Access (PUDO Agents)</Text>
            </TouchableOpacity>
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
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 0, // Fix overlap
  },
  topBar: {
    alignItems: 'flex-end',
    paddingHorizontal: SPACING.l,
    marginBottom: SPACING.s,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: SPACING.l,
    paddingBottom: 50,
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING.l,
  },
  logoContainer: {
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  logo: {
    width: 280, // Increased size
    height: 120,
    marginBottom: SPACING.s,
  },
  appSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    marginTop: SPACING.xs,
  },
  boldText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  formCard: {
    backgroundColor: 'rgba(0, 40, 85, 0.8)',
    borderRadius: 24,
    padding: SPACING.l,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 15,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: SPACING.m,
    textAlign: 'center',
  },
  spacer: {
    height: SPACING.m,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: SPACING.xl,
    alignItems: 'center',
  },
  footerText: {
    color: COLORS.textSecondary,
    fontSize: 14,
  },
  switchLink: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 4,
  },
  partnerLink: {
    marginTop: SPACING.xl,
    alignItems: 'center',
  },
  partnerText: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 12,
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
