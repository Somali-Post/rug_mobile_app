import React, { useState, useRef } from 'react';
import { View, TextInput, Text, StyleSheet, Pressable } from 'react-native';
import { COLORS, SPACING, CLAY_STYLES } from '../../theme/theme';

const ClayCodeInput = ({ code, setCode, maxLength = 6 }) => {
  const inputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  const handlePress = () => {
    inputRef.current?.focus();
  };

  // Create an array of length 6 to map over
  const boxArray = new Array(maxLength).fill(0);

  return (
    <View style={styles.container}>
      <Pressable onPress={handlePress} style={styles.boxesContainer}>
        {boxArray.map((_, index) => {
          const digit = code[index] || "";
          const isCurrent = index === code.length && isFocused;

          return (
            <View 
              key={index} 
              style={[
                styles.box, 
                isCurrent && styles.activeBox // Highlight the current box
              ]}
            >
              <Text style={styles.digitText}>{digit}</Text>
            </View>
          );
        })}
      </Pressable>

      {/* The Hidden Input that actually captures typing */}
      <TextInput
        ref={inputRef}
        value={code}
        onChangeText={(text) => setCode(text.replace(/[^0-9]/g, ''))}
        maxLength={maxLength}
        keyboardType="number-pad"
        textContentType="oneTimeCode" // iOS Auto-fill magic
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={styles.hiddenInput}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: SPACING.l,
  },
  boxesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  box: {
    width: 45,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.input, // "Pressed" background
    borderRadius: 12,
    // Inner shadow simulation
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderTopColor: '#000000',
    borderLeftColor: '#000000',
    borderBottomWidth: 0,
    borderRightWidth: 0,
  },
  activeBox: {
    borderColor: COLORS.primary,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    backgroundColor: COLORS.surface, // Pop out slightly when active
  },
  digitText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  hiddenInput: {
    position: 'absolute',
    opacity: 0, // Hide it but keep it functional
    width: 1,
    height: 1,
  },
});

export default ClayCodeInput;
