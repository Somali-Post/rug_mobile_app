import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { COLORS, SPACING } from '../../theme/theme';
import ClayTimeline from '../../components/common/ClayTimeline';
import ClayButton from '../../components/common/ClayButton';

const ParcelDetailsScreen = ({ route, navigation }) => {
  const { parcel } = route.params;
  const isReady = parcel.status === 'READY_FOR_PICKUP';

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
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
                color={COLORS.background} // Navy QR code
                backgroundColor="white"
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

          {/* NEW ROW: Deliver To */}
          <View style={styles.row}>
            <Text style={styles.label}>Deliver To:</Text>
            <Text style={styles.value}>{parcel.recipientName || 'Unknown'}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>From:</Text>
            <Text style={styles.value}>{parcel.sender}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Content:</Text>
            <Text style={styles.value}>{parcel.description}</Text>
          </View>
        </View>

        {/* Timeline */}
        <View style={styles.timelineSection}>
          <Text style={styles.sectionTitle}>Tracking History</Text>
          <ClayTimeline history={parcel.history} />
        </View>

        <View style={styles.spacer} />

        <ClayButton title="Back to Dashboard" variant="secondary" onPress={() => navigation.goBack()} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background, // Navy
  },
  scrollContent: {
    padding: SPACING.l,
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING.l,
    marginTop: SPACING.m,
  },
  trackingLabel: {
    fontSize: 10,
    color: COLORS.primary,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 4,
  },
  trackingNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    letterSpacing: 1,
  },
  qrCard: {
    backgroundColor: COLORS.surface, // Lighter Navy
    borderRadius: 20,
    padding: SPACING.l,
    alignItems: 'center',
    marginBottom: SPACING.xl,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  qrTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SPACING.m,
  },
  qrContainer: {
    padding: SPACING.m,
    backgroundColor: '#FFF', // White background for QR readability
    borderRadius: 12,
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
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: SPACING.m,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: COLORS.textSecondary,
    width: 80,
  },
  value: {
    fontSize: 14,
    color: '#FFF',
    fontWeight: '600',
    flex: 1,
  },
  timelineSection: {
    marginBottom: SPACING.xl,
  },
  spacer: {
    height: SPACING.l,
  },
});

export default ParcelDetailsScreen;
