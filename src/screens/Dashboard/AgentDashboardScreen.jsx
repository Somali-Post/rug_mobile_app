import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Platform,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/authSlice';
import { COLORS, SPACING } from '../../theme/theme';
import ClayParcelCard from '../../components/common/ClayParcelCard';
import AgentBackgroundWave from '../../components/layout/AgentBackgroundWave';
import ClayResultModal from '../../components/common/ClayResultModal';
import { MOCK_PARCELS } from '../../data/mockParcels';

const AgentDashboardScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [code, setCode] = useState('');

  // Modal State
  const [modalConfig, setModalConfig] = useState({
    visible: false,
    type: 'success',
    title: '',
    message: ''
  });

  // Data
  const inventory = MOCK_PARCELS.filter(p => p.status === 'READY_FOR_PICKUP');
  const collectedToday = 45; // Mock from reference

  const handleLogout = () => {
    dispatch(logout());
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  };

  const handleScan = () => {
    navigation.navigate('Scanner');
  };

  const handleVerify = () => {
    Keyboard.dismiss();
    if (code === '8842') {
      setModalConfig({
        visible: true,
        type: 'success',
        title: 'Verified',
        message: 'Code matched. Release package to customer.'
      });
      setCode('');
    } else {
      setModalConfig({
        visible: true,
        type: 'error',
        title: 'Invalid Code',
        message: 'This code does not match any package.'
      });
    }
  };

  const renderHeader = () => (
    <View style={styles.headerContent}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarText}>AS</Text>
        </View>
        <View style={{flex: 1}}>
          <Text style={styles.roleLabel}>AGENT PORTAL</Text>
          <Text style={styles.shopName}>Juba Hypermarket</Text>
        </View>
        <TouchableOpacity onPress={handleLogout} style={styles.bellBtn}>
          <Text style={styles.bellIcon}>🔔</Text>
        </TouchableOpacity>
      </View>

      {/* Hero Verification Card */}
      <View style={styles.verificationCard}>
        <Text style={styles.cardTitle}>Customer Verification</Text>
        <Text style={styles.cardSubtitle}>Enter pickup code to release package.</Text>

        {/* Input Row */}
        <View style={styles.inputRow}>
          <Text style={styles.inputIcon}>⌨️</Text>
          <TextInput
            style={styles.input}
            placeholder="0 0 0 0"
            placeholderTextColor="rgba(255,255,255,0.3)"
            value={code}
            onChangeText={setCode}
            keyboardType="numeric"
            maxLength={4}
          />
          {code.length > 0 && (
            <TouchableOpacity onPress={() => setCode('')}>
              <Text style={styles.clearIcon}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={styles.verifyBtn}
            activeOpacity={0.8}
            onPress={handleVerify}
          >
            <Text style={styles.verifyText}>✓  Verify Code</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.scanBtn}
            activeOpacity={0.8}
            onPress={handleScan}
          >
            <Text style={styles.scanIcon}>📷</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Stats Row */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <View style={styles.statHeader}>
            <Text style={styles.statLabel}>Ready for Pickup</Text>
            <Text style={styles.statIcon}>📦</Text>
          </View>
          <View style={styles.statValueRow}>
            <Text style={styles.statValue}>{inventory.length}</Text>
            <View style={styles.statBadge}>
              <Text style={styles.statBadgeText}>+3</Text>
            </View>
          </View>
        </View>

        <View style={styles.statCard}>
          <View style={styles.statHeader}>
            <Text style={styles.statLabel}>Collected Today</Text>
            <Text style={styles.statIcon}>✅</Text>
          </View>
          <Text style={styles.statValue}>{collectedToday}</Text>
        </View>
      </View>

      <View style={styles.listHeader}>
        <Text style={styles.sectionTitle}>Awaiting Pickup</Text>
        <TouchableOpacity>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <AgentBackgroundWave />

      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1}}
        >
          <FlatList
            data={inventory}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ClayParcelCard parcel={item} variant="agent" />
            )}
            ListHeaderComponent={renderHeader}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        </KeyboardAvoidingView>

        {/* Bottom Nav (Visual Only) */}
        <View style={styles.bottomNav}>
          <View style={styles.navItemActive}>
            <View style={styles.navIconActive}>
              <Text style={{fontSize: 18}}>🛡️</Text>
            </View>
            <Text style={styles.navTextActive}>Verify</Text>
          </View>
          <View style={styles.navItem}>
            <Text style={styles.navIcon}>🕒</Text>
            <Text style={styles.navText}>History</Text>
          </View>
        </View>
      </SafeAreaView>

      {/* Result Modal */}
      <ClayResultModal
        visible={modalConfig.visible}
        type={modalConfig.type}
        title={modalConfig.title}
        message={modalConfig.message}
        onClose={() => setModalConfig({...modalConfig, visible: false})}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#001122', // Very dark navy (almost black)
  },
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 0,
  },
  listContent: {
    padding: SPACING.l,
    paddingBottom: 100, // Space for Bottom Nav
  },
  headerContent: {
    marginBottom: SPACING.m,
  },
  // Top Bar
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.l,
  },
  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.m,
  },
  avatarText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  roleLabel: {
    color: COLORS.primary,
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  shopName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  bellBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bellIcon: {
    fontSize: 18,
  },
  // Verification Card
  verificationCard: {
    backgroundColor: '#001F40',
    borderRadius: 24,
    padding: SPACING.l,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
    marginBottom: SPACING.l,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    marginBottom: SPACING.l,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#001122', // Darker slot
    borderRadius: 16,
    paddingHorizontal: SPACING.m,
    height: 60,
    marginBottom: SPACING.l,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  inputIcon: {
    fontSize: 20,
    marginRight: SPACING.s,
    opacity: 0.5,
  },
  input: {
    flex: 1,
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 4,
  },
  clearIcon: {
    color: COLORS.error,
    fontSize: 18,
    fontWeight: 'bold',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  verifyBtn: {
    flex: 1,
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.m,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 5,
  },
  verifyText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  scanBtn: {
    width: 55,
    height: 55,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  scanIcon: {
    fontSize: 24,
  },
  // Stats
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.l,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#001F40',
    borderRadius: 20,
    padding: SPACING.m,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.s,
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
  },
  statIcon: {
    fontSize: 14,
  },
  statValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
    marginRight: SPACING.s,
  },
  statBadge: {
    backgroundColor: 'rgba(255, 107, 0, 0.2)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  statBadgeText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: 'bold',
  },
  // List Header
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.s,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
  viewAll: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: 'bold',
  },
  // Bottom Nav
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: '#001122',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.05)',
    paddingBottom: 10,
  },
  navItem: {
    alignItems: 'center',
    opacity: 0.5,
  },
  navItemActive: {
    alignItems: 'center',
  },
  navIconActive: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 107, 0, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  navTextActive: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  navIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  navText: {
    color: '#FFF',
    fontSize: 12,
  },
});

export default AgentDashboardScreen;
