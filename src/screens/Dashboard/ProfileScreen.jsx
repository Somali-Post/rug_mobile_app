import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, StatusBar, Platform, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/authSlice';
import { COLORS, SPACING } from '../../theme/theme';
import ProfileBackgroundWave from '../../components/layout/ProfileBackgroundWave';
import SettingsRow from '../../components/common/SettingsRow';
import { PUDO_LOCATIONS } from '../../data/pudoLocations';

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user, pudoId } = useSelector(state => state.auth);

  const myPudo = PUDO_LOCATIONS.find(p => p.id === pudoId);

  // Helper to get initials
  const getInitials = (name) => {
    if (!name) return 'RU';
    const parts = name.split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.substring(0, 2).toUpperCase();
  };

  const handleLogout = () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to sign out?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Log Out",
          style: "destructive",
          onPress: () => {
            dispatch(logout());
            navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
          },
        },
      ]
    );
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <ProfileBackgroundWave />

      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* 1. Profile Header */}
          <View style={styles.header}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarText}>{getInitials(user?.name)}</Text>
            </View>
            <Text style={styles.userName}>{user?.name || 'Valued Customer'}</Text>
            <Text style={styles.userPhone}>+252 {user?.phone}</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>VERIFIED MEMBER</Text>
            </View>
          </View>

          {/* 2. Settings Container */}
          <View style={styles.settingsCard}>
            <Text style={styles.sectionHeader}>Account</Text>
            <SettingsRow
              icon="📍"
              title="My PUDO Point"
              subtitle={myPudo ? `${myPudo.name}, ${myPudo.district}` : 'Select a location'}
              onPress={() => navigation.navigate('PudoSelection')}
            />
            <SettingsRow
              icon="👤"
              title="Personal Details"
              subtitle="Name, Phone, ID"
              onPress={() => Alert.alert("Coming Soon", "Edit Profile will be available in the next update.")}
            />

            <Text style={styles.sectionHeader}>App Settings</Text>
            <SettingsRow icon="🔔" title="Notifications" subtitle="SMS & Push Alerts" onPress={() => {}} />
            <SettingsRow icon="🌍" title="Language" subtitle="English (US)" onPress={() => {}} />

            <Text style={styles.sectionHeader}>Support</Text>
            <SettingsRow icon="❓" title="Help Center" onPress={() => {}} />
            <SettingsRow icon="🛡️" title="Privacy Policy" onPress={() => {}} />

            <View style={styles.spacer} />

            <SettingsRow icon="🚪" title="Log Out" isDestructive onPress={handleLogout} />

            <Text style={styles.versionText}>Version 1.0.0 • Rug App</Text>
          </View>
        </ScrollView>
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
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginTop: SPACING.xl,
    marginBottom: SPACING.xl * 1.5,
  },
  avatarCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.2)',
    marginBottom: SPACING.m,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 10,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 4,
  },
  userPhone: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: SPACING.m,
  },
  badge: {
    backgroundColor: 'rgba(46, 204, 113, 0.2)', // Green tint
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.success,
  },
  badgeText: {
    color: COLORS.success,
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  settingsCard: {
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: SPACING.l,
    minHeight: 500,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 20,
  },
  sectionHeader: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.primary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: SPACING.l,
    marginBottom: SPACING.s,
  },
  spacer: {
    height: SPACING.l,
  },
  versionText: {
    textAlign: 'center',
    color: COLORS.textSecondary,
    fontSize: 12,
    marginTop: SPACING.xl,
    opacity: 0.5,
  },
});

export default ProfileScreen;
