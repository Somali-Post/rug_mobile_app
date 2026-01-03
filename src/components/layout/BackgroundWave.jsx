import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import { COLORS } from '../../theme/theme';

const { width, height } = Dimensions.get('window');

const BackgroundWave = () => {
  return (
    <View style={StyleSheet.absoluteFill}>
      {/* Base Navy Background */}
      <View style={[StyleSheet.absoluteFill, { backgroundColor: COLORS.background }]} />

      <Svg height={height * 0.6} width={width} style={styles.svg}>
        <Defs>
          <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor="#FF8533" stopOpacity="1" />
            <Stop offset="1" stopColor={COLORS.primary} stopOpacity="1" />
          </LinearGradient>
        </Defs>

        {/* The Abstract Wave Shape */}
        <Path
          d={`
            M0 0
            H${width}
            V${height * 0.35}
            C${width * 0.8} ${height * 0.45}, ${width * 0.5} ${height * 0.25}, 0 ${height * 0.4}
            Z
          `}
          fill="url(#grad)"
        />

        {/* A second, subtle semi-transparent wave for depth */}
        <Path
          d={`
            M0 0
            H${width}
            V${height * 0.3}
            C${width * 0.7} ${height * 0.35}, ${width * 0.4} ${height * 0.15}, 0 ${height * 0.35}
            Z
          `}
          fill="#FFFFFF"
          fillOpacity="0.1"
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  svg: {
    position: 'absolute',
    top: 0,
  },
});

export default BackgroundWave;
