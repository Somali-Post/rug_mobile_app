import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { COLORS, SPACING } from '../../theme/theme';
import ClayParcelCard from '../../components/common/ClayParcelCard';
import { MOCK_PARCELS } from '../../data/mockParcels';
import { PUDO_LOCATIONS } from '../../data/pudoLocations';

const DashboardScreen = ({ navigation }) => {
  // READ FROM MEMORY
  const { user, pudoId } = useSelector(state => state.auth);
  
  // Find the real PUDO object based on the saved ID
  const myPudo = PUDO_LOCATIONS.find(p => p.id === pudoId);

  // Use the saved phone number (or fallback)
  const displayPhone = user?.phone || "Unknown";

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      
      {/* Top Bar: Title + Settings */}
      <View style={styles.topBar}>
        <Text style={styles.screenTitle}>Dashboard</Text>
        <TouchableOpacity 
          onPress={() => navigation.navigate('Profile')}
          style={styles.settingsButton}
        >
          <Text style={styles.settingsText}>⚙️ Profile</Text>
        </TouchableOpacity>
      </View>

      {/* User Info Card */}
      <View style={styles.addressCard}>
        <Text style={styles.cardTitle}>MY DIGITAL ADDRESS</Text>
        
        <View style={styles.row}>
          <View>
            <Text style={styles.label}>MOBILE</Text>
            <Text style={styles.value}>{displayPhone}</Text>
          </View>
          <View style={styles.divider} />
          <View>
            <Text style={styles.label}>PUDO CODE</Text>
            <Text style={styles.valueHighlight}>{myPudo?.code || '---'}</Text>
          </View>
        </View>

        <Text style={styles.pudoName}>
          📍 {myPudo?.name}, {myPudo?.district}
        </Text>
      </View>

      <Text style={styles.sectionTitle}>My Parcels</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={MOCK_PARCELS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ClayParcelCard 
            parcel={item} 
            onPress={() => navigation.navigate('ParcelDetails', { parcel: item })} 
          />
        )}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  listContent: {
    padding: SPACING.l,
  },
  headerContainer: {
    marginBottom: SPACING.m,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.m,
    marginTop: SPACING.s,
  },
  screenTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  settingsButton: {
    padding: SPACING.s,
    backgroundColor: '#D1D9E6',
    borderRadius: 12,
  },
  settingsText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.secondary,
  },
  addressCard: {
    backgroundColor: COLORS.secondary, // Navy Blue Card
    borderRadius: 20,
    padding: SPACING.l,
    marginBottom: SPACING.xl,
    // Shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  cardTitle: {
    color: '#8FA9C2',
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: SPACING.m,
    letterSpacing: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.m,
  },
  divider: {
    width: 1,
    height: 30,
    backgroundColor: '#FFFFFF',
    opacity: 0.2,
    marginHorizontal: SPACING.l,
  },
  label: {
    color: '#8FA9C2',
    fontSize: 10,
    marginBottom: 4,
  },
  value: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  valueHighlight: {
    color: COLORS.primary, // Orange pop
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  pudoName: {
    color: '#FFFFFF',
    fontSize: 12,
    opacity: 0.8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: SPACING.s,
  },
});

export default DashboardScreen;
