import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { COLORS, SPACING } from '../../theme/theme';

const DigitalIDCard = ({ user, pudo }) => {
  return (
    <View style={styles.container}>
      {/* Holographic/Chip Effect (Simulated) */}
      <View style={styles.chip} />

      <View style={styles.header}>
        <Text style={styles.title}>DIGITAL POSTAL ID</Text>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.content}>
        <View>
          <Text style={styles.label}>NAME</Text>
          <Text style={styles.value}>{user?.name || 'Unknown'}</Text>
        </View>
        <View>
          <Text style={styles.label}>MOBILE</Text>
          <Text style={styles.value}>+252 {user?.phone}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <View>
          <Text style={styles.label}>PUDO POINT</Text>
          <Text style={styles.pudoName}>{pudo?.name}</Text>
          <Text style={styles.pudoDistrict}>
            {pudo?.district}, {pudo?.region}
          </Text>
        </View>
        <View style={styles.codeBox}>
          <Text style={styles.codeLabel}>6D ADDRESS</Text>
          <Text style={styles.codeValue}>{pudo?.code}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Glassmorphism
    borderRadius: 20,
    padding: SPACING.l,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    overflow: 'hidden',
    marginTop: SPACING.m,
  },
  chip: {
    width: 40,
    height: 30,
    backgroundColor: '#FFD700', // Gold Chip
    borderRadius: 6,
    marginBottom: SPACING.s,
    opacity: 0.8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    position: 'absolute',
    top: SPACING.l,
    right: SPACING.l,
    left: SPACING.l,
  },
  title: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'rgba(255,255,255,0.6)',
    letterSpacing: 1,
  },
  logo: {
    width: 60,
    height: 30,
  },
  content: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.l,
  },
  label: {
    fontSize: 8,
    color: 'rgba(255,255,255,0.5)',
    fontWeight: 'bold',
    marginBottom: 2,
  },
  value: {
    fontSize: 14,
    color: '#FFF',
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
    paddingTop: SPACING.m,
  },
  pudoName: {
    fontSize: 12,
    color: '#FFF',
    fontWeight: 'bold',
  },
  pudoDistrict: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.7)',
  },
  codeBox: {
    backgroundColor: '#FFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignItems: 'center',
  },
  codeLabel: {
    fontSize: 6,
    color: COLORS.secondary,
    fontWeight: 'bold',
  },
  codeValue: {
    fontSize: 14,
    color: COLORS.secondary,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});

export default DigitalIDCard;
