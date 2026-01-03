import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, SPACING } from '../../theme/theme';

const LanguageToggle = () => {
  const [lang, setLang] = useState('EN'); // 'EN' or 'SO'

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.option, lang === 'EN' && styles.activeOption]}
        onPress={() => setLang('EN')}
      >
        <Text style={[styles.text, lang === 'EN' && styles.activeText]}>EN</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.option, lang === 'SO' && styles.activeOption]}
        onPress={() => setLang('SO')}
      >
        <Text style={[styles.text, lang === 'SO' && styles.activeText]}>SO</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
    padding: 4,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  option: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  activeOption: {
    backgroundColor: COLORS.primary,
  },
  text: {
    color: 'rgba(255,255,255,0.6)',
    fontWeight: 'bold',
    fontSize: 12,
  },
  activeText: {
    color: '#FFF',
    opacity: 1,
  },
});

export default LanguageToggle;
