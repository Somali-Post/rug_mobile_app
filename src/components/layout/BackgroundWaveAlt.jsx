import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import { COLORS } from '../../theme/theme';

const { width, height } = Dimensions.get('window');

const BackgroundWaveAlt = () => {
  return (
    <View style={StyleSheet.absoluteFill}>
      <View style={[StyleSheet.absoluteFill, { backgroundColor: COLORS.background }]} />

      <Svg height={height * 0.5} width={width} style={styles.svg}>
        <Defs>
          <LinearGradient id="gradAlt" x1="1" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#FF8533" stopOpacity="1" />
            <Stop offset="1" stopColor={COLORS.primary} stopOpacity="1" />
          </LinearGradient>
        </Defs>

        {/* A different curve pattern: Top Right heavy */}
        <Path
          d={`
            M0 0
            H${width}
            V${height * 0.3}
            C${width * 0.5} ${height * 0.4}, ${width * 0.2} ${height * 0.1}, 0 ${height * 0.25}
            Z
          `}
          fill="url(#gradAlt)"
        />

        <Path
          d={`
            M0 0
            H${width}
            V${height * 0.25}
            C${width * 0.6} ${height * 0.35}, ${width * 0.3} ${height * 0.05}, 0 ${height * 0.2}
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

export default BackgroundWaveAlt;
