import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING } from '../../theme/theme';

const ClayTimeline = ({ history }) => {
  return (
    <View style={styles.container}>
      {history.map((event, index) => {
        const isLast = index === history.length - 1;
        const isFirst = index === 0;

        return (
          <View key={index} style={styles.row}>
            {/* Left: Time */}
            <View style={styles.timeContainer}>
              <Text style={styles.date}>{event.date.split(' ')[0]}</Text>
              <Text style={styles.time}>{event.date.split(' ')[1]}</Text>
            </View>

            {/* Middle: Line & Dot */}
            <View style={styles.timelineContainer}>
              <View style={[
                styles.dot, 
                isFirst ? styles.activeDot : styles.inactiveDot
              ]} />
              {!isLast && <View style={styles.line} />}
            </View>

            {/* Right: Details */}
            <View style={styles.detailsContainer}>
              <Text style={[
                styles.status, 
                isFirst ? styles.activeStatus : styles.inactiveStatus
              ]}>
                {event.status}
              </Text>
              <Text style={styles.location}>{event.location}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: SPACING.m,
  },
  row: {
    flexDirection: 'row',
    minHeight: 70,
  },
  timeContainer: {
    width: 80,
    alignItems: 'flex-end',
    paddingRight: SPACING.s,
  },
  date: {
    fontSize: 10,
    color: COLORS.textSecondary,
  },
  time: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  timelineContainer: {
    alignItems: 'center',
    width: 20,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    zIndex: 1,
  },
  activeDot: {
    backgroundColor: COLORS.primary,
    borderWidth: 2,
    borderColor: '#FFF',
  },
  inactiveDot: {
    backgroundColor: '#D1D9E6',
  },
  line: {
    width: 2,
    flex: 1,
    backgroundColor: '#D1D9E6',
    position: 'absolute',
    top: 12,
    bottom: -12, // Connect to next dot
  },
  detailsContainer: {
    flex: 1,
    paddingLeft: SPACING.s,
    paddingBottom: SPACING.l,
  },
  status: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  activeStatus: {
    color: COLORS.textPrimary,
  },
  inactiveStatus: {
    color: COLORS.textSecondary,
  },
  location: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontStyle: 'italic',
  },
});

export default ClayTimeline;
