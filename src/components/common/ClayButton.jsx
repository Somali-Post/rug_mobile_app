import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, CLAY_STYLES, SPACING } from '../../theme/theme';

const ClayButton = ({ onPress, title, variant = 'primary', disabled = false }) => {
  // Determine colors based on variant
  const baseColor = variant === 'primary' ? COLORS.primary : COLORS.secondary;
  const textColor = COLORS.textLight;

  // Gradient colors: Lighter at top-left, Darker at bottom-right to simulate 3D curve
  const gradientColors = variant === 'primary' 
    ? ['#FF8533', '#FF6B00'] // Orange Gradient
    : ['#1A3F6B', '#002855']; // Navy Gradient

  return (
    <View style={styles.container}>
      {/* Outer Shadows Layer */}
      <View style={[styles.shadowLayer, CLAY_STYLES.boxShadow]}>
        <View style={[styles.shadowLayer, CLAY_STYLES.lightShadow]}>
          
          {/* The Clickable Button */}
          <TouchableOpacity 
            onPress={onPress} 
            activeOpacity={0.8}
            disabled={disabled}
            style={styles.touchable}
          >
            <LinearGradient
              colors={disabled ? ['#bdc3c7', '#95a5a6'] : gradientColors}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={styles.gradient}
            >
              <Text style={[styles.text, { color: textColor }]}>
                {title}
              </Text>
            </LinearGradient>
          </TouchableOpacity>

        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: SPACING.s,
    alignItems: 'center',
  },
  shadowLayer: {
    borderRadius: CLAY_STYLES.borderRadius,
  },
  touchable: {
    borderRadius: CLAY_STYLES.borderRadius,
  },
  gradient: {
    paddingVertical: SPACING.m,
    paddingHorizontal: SPACING.xl,
    borderRadius: CLAY_STYLES.borderRadius,
    minWidth: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});

export default ClayButton;
