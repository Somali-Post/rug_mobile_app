import React from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, CLAY_STYLES } from '../../theme/theme';

const ClayInput = ({ 
  value, 
  onChangeText, 
  placeholder, 
  icon, 
  prefix, // For the "+252"
  secureTextEntry 
}) => {
  return (
    <View style={styles.container}>
      {/* The "Pressed" Effect: Darker background with specific borders */}
      <View style={styles.inputContainer}>
        {prefix && (
          <View style={styles.prefixContainer}>
            <Text style={styles.prefixText}>{prefix}</Text>
            <View style={styles.divider} />
          </View>
        )}
        
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={COLORS.textSecondary}
          secureTextEntry={secureTextEntry}
          selectionColor={COLORS.primary}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: SPACING.s,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.input, // Slightly darker than main BG to look "pressed"
    borderRadius: CLAY_STYLES.borderRadius,
    // Inner shadow simulation via borders
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderBottomWidth: 0,
    borderRightWidth: 0,
    borderTopColor: '#000000', // Darker shadow top/left
    borderLeftColor: '#000000',
    height: 55,
    paddingHorizontal: SPACING.m,
  },
  prefixContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: SPACING.s,
  },
  prefixText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  divider: {
    width: 1,
    height: 20,
    backgroundColor: COLORS.textSecondary,
    marginLeft: SPACING.s,
    opacity: 0.5,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: COLORS.textPrimary,
    height: '100%',
  },
});

export default ClayInput;
