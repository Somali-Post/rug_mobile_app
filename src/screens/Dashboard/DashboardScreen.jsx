import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Platform,
  Alert,
} from 'react-native';
import { useSelector } from 'react-redux';
import { COLORS, SPACING } from '../../theme/theme';
import ClayParcelCard from '../../components/common/ClayParcelCard';
import DashboardWave from '../../components/layout/DashboardWave';
import DigitalIDCard from '../../components/common/DigitalIDCard';
import { MOCK_PARCELS } from '../../data/mockParcels';
import { PUDO_LOCATIONS } from '../../data/pudoLocations';

const DashboardScreen = ({ navigation }) => {
  const { user, pudoId } = useSelector(state => state.auth);
  const myPudo = PUDO_LOCATIONS.find(p => p.id === pudoId);
  const [trackId, setTrackId] = useState('');
  const [headerHeight, setHeaderHeight] = useState(0);
  const listRef = useRef(null);

  // --- TRACKING LOGIC ---
  const handleTrack = () => {
    if (!trackId) return;

    // Find parcel in mock data (case-insensitive)
    const found = MOCK_PARCELS.find(p => p.trackingNumber === trackId.toUpperCase());

    if (found) {
      navigation.navigate('ParcelDetails', { parcel: found });
      setTrackId(''); // Clear input
    } else {
      Alert.alert('Not Found', 'Tracking number not found in system.');
    }
  };

  const handleScrollToParcels = () => {
    if (!listRef.current) return;
    const offset = headerHeight > 0 ? headerHeight : 0;
    listRef.current.scrollToOffset({ offset, animated: true });
  };

  const renderHeader = () => (
    <View
      style={styles.headerContent}
      onLayout={(event) => setHeaderHeight(event.nativeEvent.layout.height)}
    >
      {/* Top Bar */}
      <View style={styles.topBar}>
        <View>
          <Text style={styles.greeting}>Good Morning,</Text>
          <Text style={styles.username}>{user?.name?.split(' ')[0] || 'Customer'}</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.profileBtn}>
          <Text style={styles.profileIcon}>👤</Text>
        </TouchableOpacity>
      </View>

      {/* Digital ID Card */}
      <DigitalIDCard user={user} pudo={myPudo} />

      {/* Tracking Search Bar */}
      <View style={styles.trackContainer}>
        <TextInput
          placeholder="Track a package (e.g. EE849...)"
          placeholderTextColor={COLORS.textSecondary}
          style={styles.trackInput}
          value={trackId}
          onChangeText={setTrackId}
          autoCapitalize="characters"
        />
        <TouchableOpacity style={styles.trackBtn} onPress={handleTrack}>
          <Text style={styles.trackBtnText}>TRACK</Text>
        </TouchableOpacity>
      </View>

      {/* Quick Actions Grid */}
      <View style={styles.actionsGrid}>
        <ActionButton icon="📦" label="My Parcels" active onPress={handleScrollToParcels} />
        <ActionButton icon="📍" label="Find PUDO" onPress={() => navigation.navigate('PudoSelection')} />
        <ActionButton icon="🎧" label="Support" onPress={() => Alert.alert('Support', 'Call Center: 611')} />
        <ActionButton icon="⚙️" label="Settings" onPress={() => navigation.navigate('Profile')} />
      </View>

      <Text style={styles.sectionTitle}>Recent Activity</Text>
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <DashboardWave />

      <SafeAreaView style={styles.safeArea}>
        <FlatList
          ref={listRef}
          data={MOCK_PARCELS}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ClayParcelCard parcel={item} onPress={() => navigation.navigate('ParcelDetails', { parcel: item })} />
          )}
          ListHeaderComponent={renderHeader}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </View>
  );
};

// Helper Component for Grid Buttons
const ActionButton = ({ icon, label, onPress, active }) => (
  <TouchableOpacity style={[styles.actionBtn, active && styles.actionBtnActive]} onPress={onPress}>
    <Text style={styles.actionIcon}>{icon}</Text>
    <Text style={[styles.actionLabel, active && styles.actionLabelActive]}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 0,
  },
  listContent: {
    padding: SPACING.l,
    paddingBottom: 50,
  },
  headerContent: {
    marginBottom: SPACING.m,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.s,
  },
  greeting: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  profileBtn: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 8,
    borderRadius: 12,
  },
  profileIcon: {
    fontSize: 20,
  },
  trackContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 6,
    marginTop: SPACING.l,
    marginBottom: SPACING.l,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  trackInput: {
    flex: 1,
    paddingHorizontal: SPACING.m,
    color: '#FFF',
    fontSize: 14,
  },
  trackBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingHorizontal: SPACING.l,
    justifyContent: 'center',
  },
  trackBtnText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  actionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.xl,
  },
  actionBtn: {
    alignItems: 'center',
    width: '22%',
    paddingVertical: SPACING.m,
    borderRadius: 16,
    backgroundColor: COLORS.input,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  actionBtnActive: {
    backgroundColor: 'rgba(255, 107, 0, 0.1)',
    borderColor: COLORS.primary,
  },
  actionIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  actionLabel: {
    fontSize: 10,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  actionLabelActive: {
    color: COLORS.primary,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: SPACING.s,
  },
});

export default DashboardScreen;
