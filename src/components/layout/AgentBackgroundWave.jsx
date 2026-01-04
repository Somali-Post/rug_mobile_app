import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import { COLORS } from '../../theme/theme';

const { width, height } = Dimensions.get('window');

const AgentBackgroundWave = () => {
  return (
    <View style={StyleSheet.absoluteFill}>
      {/* Deep Navy Background */}
      <View style={[StyleSheet.absoluteFill, { backgroundColor: '#001F40' }]} />

      <Svg height={height * 0.55} width={width} style={styles.svg}>
        <Defs>
          <LinearGradient id="agentGrad" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor="#003060" stopOpacity="1" />
            <Stop offset="1" stopColor={COLORS.primary} stopOpacity="0.8" />
          </LinearGradient>
        </Defs>

        {/* Sharp, Technical Curve */}
        <Path
          d={`
            M0 0
            H${width}
            V${height * 0.35}
            L${width} ${height * 0.25}
            C${width * 0.7} ${height * 0.4}, ${width * 0.3} ${height * 0.15}, 0 ${height * 0.3}
            Z
          `}
          fill="url(#agentGrad)"
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  svg: { position: 'absolute', top: 0 },
});

export default AgentBackgroundWave;
