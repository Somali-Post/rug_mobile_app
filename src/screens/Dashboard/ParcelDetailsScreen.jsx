import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { COLORS, SPACING } from '../../theme/theme';
import ClayTimeline from '../../components/common/ClayTimeline';
import ClayButton from '../../components/common/ClayButton';

const ParcelDetailsScreen = ({ route, navigation }) => {
  const { parcel } = route.params;
  const isReady = parcel.status === 'READY_FOR_PICKUP';

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.trackingLabel}>TRACKING NUMBER</Text>
          <Text style={styles.trackingNumber}>{parcel.trackingNumber}</Text>
        </View>

        {/* QR Code Section (Only if Ready) */}
        {isReady && (
          <View style={styles.qrCard}>
            <Text style={styles.qrTitle}>PICKUP CODE: {parcel.pickupCode}</Text>
            <View style={styles.qrContainer}>
              <QRCode 
                value={parcel.pickupCode} 
                size={180} 
                color={COLORS.secondary} 
                backgroundColor="transparent"
              />
            </View>
            <Text style={styles.qrInstruction}>
              Show this code to the agent at the PUDO point.
            </Text>
          </View>
        )}

        {/* Info Section */}
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Shipment Details</Text>
          <Text style={styles.detailText}>From: {parcel.sender}</Text>
          <Text style={styles.detailText}>Content: {parcel.description}</Text>
        </View>

        {/* Timeline */}
        <View style={styles.timelineSection}>
          <Text style={styles.sectionTitle}>Tracking History</Text>
          <ClayTimeline history={parcel.history} />
        </View>

        <View style={styles.spacer} />
        
        <ClayButton 
          title="Back to Dashboard" 
          variant="secondary"
          onPress={() => navigation.goBack()} 
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
  scrollContent: {
    padding: SPACING.l,
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING.l,
  },
  trackingLabel: {
    fontSize: 10,
    color: COLORS.textSecondary,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  trackingNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
    letterSpacing: 1,
  },
  qrCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: SPACING.l,
    alignItems: 'center',
    marginBottom: SPACING.xl,
    // Clay Shadow
    shadowColor: "#A3B1C6",
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 5,
  },
  qrTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.secondary,
    marginBottom: SPACING.m,
  },
  qrContainer: {
    padding: SPACING.s,
    backgroundColor: '#FFF',
  },
  qrInstruction: {
    marginTop: SPACING.m,
    fontSize: 12,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  infoSection: {
    marginBottom: SPACING.l,
    padding: SPACING.m,
    backgroundColor: '#E8EDF5',
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: SPACING.s,
  },
  detailText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  timelineSection: {
    marginBottom: SPACING.xl,
  },
  spacer: {
    height: SPACING.l,
  },
});

export default ParcelDetailsScreen;
