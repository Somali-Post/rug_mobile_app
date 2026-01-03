import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/authSlice';
import { COLORS, SPACING } from '../../theme/theme';
import ClayButton from '../../components/common/ClayButton';
import { PUDO_LOCATIONS } from '../../data/pudoLocations';

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user, pudoId } = useSelector(state => state.auth);
  
  const myPudo = PUDO_LOCATIONS.find(p => p.id === pudoId);

  const handleLogout = () => {
    // 1. Clear Redux State
    dispatch(logout());
    // 2. Reset Navigation to Login
    // (The AppNavigator will see isAuthenticated=false and switch automatically, 
    // but we force it here to be sure)
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  const handleChangePudo = () => {
    navigation.navigate('PudoSelection');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        
        <Text style={styles.headerTitle}>My Profile</Text>

        {/* User Info Card */}
        <View style={styles.card}>
          <Text style={styles.label}>FULL NAME</Text>
          <Text style={styles.value}>{user?.name || 'Somali Citizen'}</Text>
          
          <View style={styles.divider} />
          
          <Text style={styles.label}>PHONE NUMBER</Text>
          <Text style={styles.value}>{user?.phone}</Text>
        </View>

        {/* Current PUDO Card */}
        <Text style={styles.sectionTitle}>Current Pickup Point</Text>
        <View style={styles.card}>
          <View style={styles.row}>
            <View style={{flex: 1}}>
              <Text style={styles.pudoName}>{myPudo?.name}</Text>
              <Text style={styles.pudoDistrict}>{myPudo?.district}, {myPudo?.region}</Text>
            </View>
            <View style={styles.codeBadge}>
              <Text style={styles.codeValue}>{myPudo?.code}</Text>
            </View>
          </View>
          
          <Text style={styles.pudoAddress}>{myPudo?.address}</Text>

          <View style={styles.spacer} />
          
          <ClayButton 
            title="Change Location" 
            variant="secondary" // Navy button
            onPress={handleChangePudo}
          />
        </View>

        <View style={styles.spacerLarge} />

        {/* Logout Button */}
        <ClayButton 
          title="Log Out" 
          variant="primary" // Orange button
          onPress={handleLogout}
        />

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: SPACING.l,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: SPACING.s,
    marginTop: SPACING.m,
  },
  card: {
    backgroundColor: '#E0E5EC',
    borderRadius: 20,
    padding: SPACING.l,
    marginBottom: SPACING.m,
    // Clay Neumorphic "Pressed" look (optional) or just standard card
    // Let's do a standard raised card
    shadowColor: "#A3B1C6",
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  label: {
    fontSize: 10,
    color: COLORS.textSecondary,
    fontWeight: 'bold',
    marginBottom: 4,
    letterSpacing: 1,
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  divider: {
    height: 1,
    backgroundColor: '#D1D9E6',
    marginVertical: SPACING.m,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.s,
  },
  pudoName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  pudoDistrict: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '600',
  },
  pudoAddress: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  codeBadge: {
    backgroundColor: COLORS.secondary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  codeValue: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: 14,
  },
  spacer: {
    height: SPACING.m,
  },
  spacerLarge: {
    height: SPACING.xl,
  }
});

export default ProfileScreen;
