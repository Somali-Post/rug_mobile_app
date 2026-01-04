import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Modal,
  StatusBar,
  TextInput,
  Platform,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useDispatch } from 'react-redux';
import { setPudoLocation } from '../../redux/authSlice';
import { COLORS, SPACING } from '../../theme/theme';
import ClayButton from '../../components/common/ClayButton';
import ClayPudoCard from '../../components/common/ClayPudoCard';
import BackgroundWaveAlt from '../../components/layout/BackgroundWaveAlt';
import { PUDO_LOCATIONS } from '../../data/pudoLocations';

const FILTERS = ['All', 'Open Now', 'Nearest', '24/7'];

const PudoSelectionScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  // State
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMapVisible, setIsMapVisible] = useState(false);
  const [selectedPudo, setSelectedPudo] = useState(null); // For Bottom Sheet

  // Mock User Location (Mogadishu Center)
  const userLocation = {
    latitude: 2.0469,
    longitude: 45.3182,
  };

  // Filter Logic
  const filteredData = useMemo(() => {
    let data = PUDO_LOCATIONS;

    // 1. Search
    if (searchQuery) {
      data = data.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.district.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // 2. Filters
    if (activeFilter === 'Open Now') {
      data = data.filter((p) => p.isOpen);
    } else if (activeFilter === '24/7') {
      data = data.filter((p) => p.hours.includes('24') || p.hours.includes('00:00'));
    }
    // 'Nearest' logic would require parsing "1.8 km" to float,
    // but our mock data is already roughly sorted or we assume it is.

    return data;
  }, [activeFilter, searchQuery]);

  const handleSelect = (pudo) => {
    setSelectedPudo(pudo);
  };

  const handleConfirm = () => {
    if (selectedPudo) {
      dispatch(setPudoLocation(selectedPudo.id));
      navigation.replace('Dashboard');
    }
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <BackgroundWaveAlt />

      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Select Collection Point</Text>
          <Text style={styles.subtitle}>Where should we deliver your mail & parcels?</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search district or shop name..."
            placeholderTextColor={COLORS.textSecondary}
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <Text style={styles.searchIcon}>🔍</Text>
        </View>

        {/* Filter Pills */}
        <View style={styles.filterContainer}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={FILTERS}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.filterPill, activeFilter === item && styles.activeFilterPill]}
                onPress={() => setActiveFilter(item)}
              >
                <Text style={[styles.filterText, activeFilter === item && styles.activeFilterText]}>
                  {item}
                </Text>
              </TouchableOpacity>
            )}
            contentContainerStyle={{ paddingHorizontal: SPACING.l }}
          />
        </View>

        {/* Main List */}
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ClayPudoCard
              item={item}
              showHours={true}
              isSelected={selectedPudo?.id === item.id}
              onPress={() => handleSelect(item)}
            />
          )}
          contentContainerStyle={styles.listContent}
        />

        {/* Floating Map Button */}
        <TouchableOpacity style={styles.mapFab} activeOpacity={0.8} onPress={() => setIsMapVisible(true)}>
          <Text style={styles.mapFabText}>🗺️ View Map</Text>
        </TouchableOpacity>
      </SafeAreaView>

      {/* --- MODALS --- */}

      {/* 1. Full Screen Map Modal */}
      <Modal visible={isMapVisible} animationType="slide" onRequestClose={() => setIsMapVisible(false)}>
        <View style={styles.mapContainer}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={{
              ...userLocation,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            showsUserLocation={true}
          >
            {filteredData.map((pudo) => (
              <Marker
                key={pudo.id}
                coordinate={{ latitude: pudo.lat, longitude: pudo.lng }}
                title={pudo.name}
                onPress={() => handleSelect(pudo)}
              >
                {/* Custom Marker View */}
                <View
                  style={[styles.markerCircle, selectedPudo?.id === pudo.id && styles.selectedMarker]}
                >
                  <Text style={styles.markerText}>📦</Text>
                </View>
              </Marker>
            ))}
          </MapView>

          {/* Close Map Button */}
          <TouchableOpacity style={styles.closeMapButton} onPress={() => setIsMapVisible(false)}>
            <Text style={styles.closeMapText}>Close Map</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* 2. Bottom Sheet Detail Panel (Shows when a PUDO is selected) */}
      {selectedPudo && (
        <View style={styles.bottomSheet}>
          <View style={styles.sheetHandle} />

          <Text style={styles.sheetTitle}>{selectedPudo.name}</Text>
          <Text style={styles.sheetSubtitle}>
            {selectedPudo.district} • {selectedPudo.distance} away
          </Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Opening Hours:</Text>
            <Text style={styles.infoValue}>{selectedPudo.hours}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>6D Address:</Text>
            <Text style={styles.infoValueHighlight}>{selectedPudo.code}</Text>
          </View>

          <View style={styles.spacer} />

          <ClayButton title="Confirm Selection" onPress={handleConfirm} />

          {/* Cancel Selection */}
          <TouchableOpacity style={styles.cancelButton} onPress={() => setSelectedPudo(null)}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}
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
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 0,
  },
  header: {
    paddingHorizontal: SPACING.l,
    marginBottom: SPACING.m,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 4,
  },
  searchContainer: {
    marginHorizontal: SPACING.l,
    marginBottom: SPACING.m,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.input,
    borderRadius: 12,
    paddingHorizontal: SPACING.m,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  searchInput: {
    flex: 1,
    height: 50,
    color: '#FFF',
    fontSize: 16,
  },
  searchIcon: {
    fontSize: 18,
  },
  filterContainer: {
    height: 50,
    marginBottom: SPACING.s,
  },
  filterPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginRight: SPACING.s,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  activeFilterPill: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterText: {
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  activeFilterText: {
    color: '#FFF',
  },
  listContent: {
    paddingBottom: 100, // Space for FAB
  },
  mapFab: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 30,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  mapFabText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  // Map Modal Styles
  mapContainer: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  closeMapButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 10,
    borderRadius: 8,
  },
  closeMapText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  markerCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  selectedMarker: {
    backgroundColor: COLORS.primary,
    transform: [{ scale: 1.2 }],
  },
  markerText: {
    fontSize: 18,
  },
  // Bottom Sheet Styles
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: SPACING.l,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 20,
  },
  sheetHandle: {
    width: 40,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: SPACING.l,
  },
  sheetTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 4,
  },
  sheetSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: SPACING.l,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.s,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
    paddingBottom: SPACING.s,
  },
  infoLabel: {
    color: COLORS.textSecondary,
    fontSize: 14,
  },
  infoValue: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 14,
  },
  infoValueHighlight: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1,
  },
  spacer: {
    height: SPACING.m,
  },
  cancelButton: {
    alignItems: 'center',
    padding: SPACING.m,
  },
  cancelText: {
    color: COLORS.textSecondary,
    textDecorationLine: 'underline',
  },
});

export default PudoSelectionScreen;
