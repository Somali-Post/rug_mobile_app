import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, SPACING } from '../../theme/theme';
import { STATUS_CONFIG } from '../../data/mockParcels';

const ClayParcelCard = ({ parcel, onPress, variant = 'customer' }) => {
  const statusInfo = STATUS_CONFIG[parcel.status];
  const isReady = parcel.status === 'READY_FOR_PICKUP';
  const isAgent = variant === 'agent';

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        style={styles.container}
        disabled={isAgent}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.label}>TRACKING NO.</Text>
            <Text style={styles.trackingNumber}>{parcel.trackingNumber}</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: statusInfo.color }]}>
            <Text style={styles.badgeText}>{statusInfo.label}</Text>
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.sender}>From: {parcel.sender}</Text>
          <Text style={styles.description}>{parcel.description}</Text>
        </View>

        {/* Action Area */}
        {isReady ? (
          <View style={[styles.actionArea, isAgent && styles.agentActionArea]}>
            {isAgent ? (
              // --- AGENT VIEW (SECURE) ---
              <View style={styles.agentSecureBox}>
                <Text style={styles.secureIcon}>🔒</Text>
                <Text style={styles.secureText}>Waiting for Customer Scan</Text>
              </View>
            ) : (
              // --- CUSTOMER VIEW (SHOW CODE) ---
              <>
                <View style={styles.pickupBox}>
                  <Text style={styles.pickupLabel}>PICKUP CODE</Text>
                  <Text style={styles.pickupCode}>{parcel.pickupCode}</Text>
                </View>
                <Text style={styles.instruction}>Show this code to agent</Text>
              </>
            )}
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
    shadowColor: "#000",
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
    color: '#FFF',
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
    color: '#FFF',
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
  agentActionArea: {
    backgroundColor: 'rgba(255, 107, 0, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 0, 0.3)',
    justifyContent: 'center',
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
  agentSecureBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  secureIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  secureText: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: 14,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
    paddingTop: SPACING.s,
  },
  footerText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontStyle: 'italic',
  },
});

export default ClayParcelCard;
