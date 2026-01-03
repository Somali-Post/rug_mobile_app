import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, Dimensions } from 'react-native';
import { useDispatch } from 'react-redux';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { COLORS, SPACING } from '../../theme/theme';
import ClayButton from '../../components/common/ClayButton';
import ClayPudoCard from '../../components/common/ClayPudoCard';
import { PUDO_LOCATIONS } from '../../data/pudoLocations';
import { setPudoLocation } from '../../redux/authSlice';

const { width } = Dimensions.get('window');

const PudoSelectionScreen = ({ navigation }) => {
  const [selectedId, setSelectedId] = useState(null);
  const dispatch = useDispatch();

  // Default region: Mogadishu Center
  const initialRegion = {
    latitude: 2.0469,
    longitude: 45.3182,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const handleSelect = (id) => {
    setSelectedId(id);
  };

  const handleConfirm = () => {
    if (selectedId) {
      // SAVE SELECTION TO REDUX
      dispatch(setPudoLocation(selectedId));
      
      // Navigate
      navigation.replace('Dashboard');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Map Section */}
      <View style={styles.mapContainer}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={initialRegion}
        >
          {PUDO_LOCATIONS.map((pudo) => (
            <Marker
              key={pudo.id}
              coordinate={{ latitude: pudo.lat, longitude: pudo.lng }}
              title={pudo.name}
              description={`Code: ${pudo.code}`}
              pinColor={selectedId === pudo.id ? COLORS.primary : COLORS.secondary}
              onPress={() => handleSelect(pudo.id)}
            />
          ))}
        </MapView>
      </View>

      {/* List Section */}
      <View style={styles.listContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Select Your PUDO</Text>
          <Text style={styles.subtitle}>
            Choose a pickup point to generate your Digital Address.
          </Text>
        </View>

        <FlatList
          data={PUDO_LOCATIONS}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ClayPudoCard 
              item={item} 
              isSelected={selectedId === item.id}
              onPress={() => handleSelect(item.id)}
            />
          )}
          contentContainerStyle={styles.listContent}
        />

        {/* Floating Confirm Button */}
        {selectedId && (
          <View style={styles.buttonContainer}>
            <ClayButton 
              title="Confirm Location" 
              onPress={handleConfirm}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  mapContainer: {
    height: '40%',
    width: '100%',
    overflow: 'hidden',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    // Shadow for map container
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    zIndex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  listContainer: {
    flex: 1,
    marginTop: SPACING.m,
  },
  header: {
    paddingHorizontal: SPACING.l,
    marginBottom: SPACING.m,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  listContent: {
    paddingHorizontal: SPACING.s,
    paddingBottom: 100, // Space for button
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    paddingHorizontal: SPACING.xl,
  }
});

export default PudoSelectionScreen;
