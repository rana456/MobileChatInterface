import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { useTheme } from 'react-native-paper';

const TypingDot = ({ delay, theme }) => {
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: -5,
          duration: 350,
          delay,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 350,
          useNativeDriver: true,
        }),
      ])
    );

    animation.start();

    return () => animation.stop();
  }, [translateY, delay]);

  return (
    <Animated.View
      style={[
        styles.dot,
        { 
          backgroundColor: theme.dark ? theme.colors.primary : '#888',
          transform: [{ translateY }] 
        },
      ]}
    />
  );
};

const TypingIndicator = () => {
  const theme = useTheme();
  
  return (
    <View 
      style={[
        styles.container,
        { backgroundColor: theme.dark ? theme.colors.surface : '#f0f0f0' }
      ]}
    >
      <TypingDot delay={0} theme={theme} />
      <TypingDot delay={150} theme={theme} />
      <TypingDot delay={300} theme={theme} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginVertical: 8,
    marginLeft: 16,
    padding: 12,
    borderRadius: 16,
    borderTopLeftRadius: 0,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 2,
  },
});

export default TypingIndicator;
