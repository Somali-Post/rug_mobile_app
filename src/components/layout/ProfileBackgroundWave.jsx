import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import { COLORS } from '../../theme/theme';

const { width, height } = Dimensions.get('window');

const ProfileBackgroundWave = () => {
  return (
    <View style={StyleSheet.absoluteFill}>
      <View style={[StyleSheet.absoluteFill, { backgroundColor: COLORS.background }]} />

      <Svg height={height * 0.45} width={width} style={styles.svg}>
        <Defs>
          <LinearGradient id="profGrad" x1="0.5" y1="0" x2="0.5" y2="1">
            <Stop offset="0" stopColor={COLORS.primary} stopOpacity="1" />
            <Stop offset="1" stopColor="#FF4500" stopOpacity="1" />
          </LinearGradient>
        </Defs>

        <Path
          d={`
            M0 0
            H${width}
            V${height * 0.25}
            C${width * 0.8} ${height * 0.35}, ${width * 0.2} ${height * 0.35}, 0 ${height * 0.25}
            Z
          `}
          fill="url(#profGrad)"
        />

        <Path
          d={`
            M0 0
            H${width}
            V${height * 0.22}
            C${width * 0.8} ${height * 0.32}, ${width * 0.2} ${height * 0.32}, 0 ${height * 0.22}
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
  svg: { position: 'absolute', top: 0 },
});

export default ProfileBackgroundWave;
