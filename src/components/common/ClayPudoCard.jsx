import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, SPACING } from '../../theme/theme';

const ClayPudoCard = ({ item, onPress, isSelected, showHours = false }) => {
  return (
    <View style={styles.wrapper}>
      <View style={[styles.container, isSelected && styles.selectedContainer]}>
        <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={styles.touchable}>
          {/* Header */}
          <View style={styles.headerRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.district}>{item.district}</Text>
            </View>

            {/* Toggle: Show Hours OR 6D Code */}
            {showHours ? (
              <View style={styles.hoursBadge}>
                <Text style={styles.hoursLabel}>HOURS</Text>
                <Text style={styles.hoursValue}>{item.hours}</Text>
              </View>
            ) : (
              <View style={styles.codeBadge}>
                <Text style={styles.codeLabel}>6D CODE</Text>
                <Text style={styles.codeValue}>{item.code}</Text>
              </View>
            )}
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <View style={[styles.dot, { backgroundColor: item.isOpen ? COLORS.success : COLORS.error }]} />
            <Text style={styles.status}>{item.isOpen ? 'Open Now' : 'Closed'}</Text>

            <Text style={styles.distance}>{item.distance}</Text>

            {isSelected && <Text style={styles.selectedText}>Selected</Text>}
          </View>
        </TouchableOpacity>
      </View>
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
    borderRadius: 16,
    padding: SPACING.m,
    shadowColor: '#000000',
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  selectedContainer: {
    borderColor: COLORS.primary,
    backgroundColor: '#003870',
    borderWidth: 2,
  },
  touchable: {
    width: '100%',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.m,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  district: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  codeBadge: {
    backgroundColor: COLORS.background,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: 'center',
    marginLeft: SPACING.s,
  },
  codeLabel: {
    color: '#8FA9C2',
    fontSize: 8,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  codeValue: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  hoursBadge: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: 'flex-end',
    marginLeft: SPACING.s,
  },
  hoursLabel: {
    color: '#8FA9C2',
    fontSize: 8,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  hoursValue: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
    paddingTop: SPACING.s,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  status: {
    fontSize: 12,
    color: COLORS.textSecondary,
    flex: 1,
  },
  distance: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.textSecondary,
    marginRight: SPACING.m,
  },
  selectedText: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default ClayPudoCard;
