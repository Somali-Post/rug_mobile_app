import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/authSlice';
import { COLORS, SPACING } from '../../theme/theme';
import ClayParcelCard from '../../components/common/ClayParcelCard';
import { MOCK_PARCELS } from '../../data/mockParcels';

const AgentDashboardScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  // Filter only parcels that are "Ready" (At the shop)
  const inventory = MOCK_PARCELS.filter(p => p.status === 'READY_FOR_PICKUP');

  const handleLogout = () => {
    dispatch(logout());
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  };

  const handleScan = () => {
    // Navigate to the Scanner
    navigation.navigate('Scanner');
  };

  return (
    <SafeAreaView style={styles.container}>
      
      {/* Agent Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.agentName}>Ali Shopkeeper</Text>
          <Text style={styles.shopName}>Kaawo Godey Market</Text>
        </View>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
          <Text style={styles.logoutText}>Exit</Text>
        </TouchableOpacity>
      </View>

      {/* Big Action Button */}
      <TouchableOpacity 
        style={styles.scanButton} 
        activeOpacity={0.8}
        onPress={handleScan}
      >
        <View style={styles.scanIconCircle}>
          <Text style={styles.scanIcon}>📷</Text>
        </View>
        <Text style={styles.scanText}>SCAN CUSTOMER CODE</Text>
        <Text style={styles.scanSubtext}>Hand over parcel</Text>
      </TouchableOpacity>

      {/* Inventory List */}
      <View style={styles.listContainer}>
        <Text style={styles.sectionTitle}>Shop Inventory ({inventory.length})</Text>
        <FlatList
          data={inventory}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ClayParcelCard 
              parcel={item} 
              onPress={() => {}} // Agents just view, don't click details yet
            />
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary, // Navy theme for agents
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.l,
  },
  agentName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  shopName: {
    fontSize: 14,
    color: '#8FA9C2',
  },
  logoutBtn: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  logoutText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  scanButton: {
    backgroundColor: COLORS.primary,
    margin: SPACING.l,
    borderRadius: 20,
    padding: SPACING.l,
    alignItems: 'center',
    // Glow effect
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 10,
  },
  scanIconCircle: {
    width: 60,
    height: 60,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.s,
  },
  scanIcon: {
    fontSize: 30,
  },
  scanText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    letterSpacing: 1,
  },
  scanSubtext: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
  },
  listContainer: {
    flex: 1,
    backgroundColor: COLORS.background, // Light bottom sheet
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: SPACING.l,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: SPACING.m,
  },
});

export default AgentDashboardScreen;
