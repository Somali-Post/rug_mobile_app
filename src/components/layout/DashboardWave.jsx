import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import { COLORS } from '../../theme/theme';

const { width, height } = Dimensions.get('window');

const DashboardWave = () => {
  return (
    <View style={StyleSheet.absoluteFill}>
      <View style={[StyleSheet.absoluteFill, { backgroundColor: COLORS.background }]} />
      <Svg height={height * 0.4} width={width} style={styles.svg}>
        <Defs>
          <LinearGradient id="dashGrad" x1="0" y1="0" x2="1" y2="0">
            <Stop offset="0" stopColor={COLORS.primary} stopOpacity="1" />
            <Stop offset="1" stopColor="#FF8533" stopOpacity="1" />
          </LinearGradient>
        </Defs>
        <Path
          d={`
            M0 0
            H${width}
            V${height * 0.25}
            C${width * 0.7} ${height * 0.2}, ${width * 0.3} ${height * 0.35}, 0 ${height * 0.28}
            Z
          `}
          fill="url(#dashGrad)"
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  svg: { position: 'absolute', top: 0 },
});

export default DashboardWave;
