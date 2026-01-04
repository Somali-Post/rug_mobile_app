import React from 'react';
import { View, TextInput, Text, StyleSheet, Pressable } from 'react-native';
import { COLORS, SPACING } from '../../theme/theme';

const ClayCodeInput = ({ code, setCode, maxLength = 6, onFull }) => {
  const handleChange = (text) => {
    const clean = text.replace(/[^0-9]/g, '');
    setCode(clean);
    // Auto-trigger if full
    if (clean.length === maxLength && onFull) {
      onFull(clean);
    }
  };

  const boxArray = new Array(maxLength).fill(0);

  return (
    <View style={styles.container}>
      {/* 1. The Visual Layer (Boxes) */}
      <View style={styles.visualContainer}>
        {boxArray.map((_, index) => {
          const digit = code[index] || "";
          const isFilled = index < code.length;
          // Highlight the *next* empty box, or the last one if full
          const isActive = index === code.length || (index === maxLength - 1 && code.length === maxLength);

          return (
            <View
              key={index}
              style={[styles.box, isActive && styles.activeBox, isFilled && styles.filledBox]}
            >
              <Text style={styles.digitText}>{digit}</Text>
            </View>
          );
        })}
      </View>

      {/* 2. The Touch Layer (Invisible Input on top) */}
      {/* This ensures ANY tap on the area brings up the keyboard */}
      <TextInput
        value={code}
        onChangeText={handleChange}
        maxLength={maxLength}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        style={styles.invisibleInput}
        autoFocus={true}
        caretHidden={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 70, // Fixed height for the touch area
    justifyContent: 'center',
    marginVertical: SPACING.l,
  },
  visualContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: SPACING.s,
  },
  invisibleInput: {
    ...StyleSheet.absoluteFillObject, // Covers the whole container
    opacity: 0, // Invisible but clickable
  },
  box: {
    width: 48,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 40, 85, 0.6)', // Darker Navy transparent
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  activeBox: {
    borderColor: COLORS.primary,
    backgroundColor: 'rgba(255, 107, 0, 0.15)',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 5,
  },
  filledBox: {
    borderColor: '#FFFFFF',
    backgroundColor: COLORS.surface,
  },
  digitText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default ClayCodeInput;
