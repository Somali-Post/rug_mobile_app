import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, CLAY_STYLES } from '../../theme/theme';
import { STATUS_CONFIG } from '../../data/mockParcels';

const ClayParcelCard = ({ parcel, onPress }) => {
  const statusInfo = STATUS_CONFIG[parcel.status];
  const isReady = parcel.status === 'READY_FOR_PICKUP';

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity 
        onPress={onPress} 
        activeOpacity={0.8}
        style={styles.container}
      >
        {/* Header: Tracking Number & Status Badge */}
        <View style={styles.header}>
          <View>
            <Text style={styles.label}>TRACKING NO.</Text>
            <Text style={styles.trackingNumber}>{parcel.trackingNumber}</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: statusInfo.color }]}>
            <Text style={styles.badgeText}>{statusInfo.label}</Text>
          </View>
        </View>

        {/* Content: Sender & Desc */}
        <View style={styles.content}>
          <Text style={styles.sender}>From: {parcel.sender}</Text>
          <Text style={styles.description}>{parcel.description}</Text>
        </View>

        {/* Action Area: Pickup Code or Transit Info */}
        {isReady ? (
          <View style={styles.actionArea}>
            <View style={styles.pickupBox}>
              <Text style={styles.pickupLabel}>PICKUP CODE</Text>
              <Text style={styles.pickupCode}>{parcel.pickupCode}</Text>
            </View>
            <Text style={styles.instruction}>Show this code to agent</Text>
          </View>
        ) : (
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              {parcel.status === 'IN_TRANSIT' 
                ? `Est. Arrival: ${parcel.estimatedArrival}`
                : `Collected on: ${parcel.collectedDate}`
              }
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: SPACING.m,
    paddingHorizontal: SPACING.s,
  },
  container: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding: SPACING.m,
    // Clay Shadow
    shadowColor: "#000000",
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.s,
  },
  label: {
    fontSize: 10,
    color: COLORS.textSecondary,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  trackingNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
    letterSpacing: 0.5,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  content: {
    marginBottom: SPACING.m,
  },
  sender: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  description: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  actionArea: {
    backgroundColor: '#E8EDF5',
    borderRadius: 12,
    padding: SPACING.m,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pickupBox: {
    alignItems: 'center',
  },
  pickupLabel: {
    fontSize: 8,
    fontWeight: 'bold',
    color: COLORS.textSecondary,
  },
  pickupCode: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.secondary,
    letterSpacing: 2,
  },
  instruction: {
    fontSize: 12,
    color: COLORS.textSecondary,
    width: '40%',
    textAlign: 'right',
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#D1D9E6',
    paddingTop: SPACING.s,
  },
  footerText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontStyle: 'italic',
  },
});

export default ClayParcelCard;
