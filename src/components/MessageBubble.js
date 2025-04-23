import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useMemo, useRef, useEffect } from 'react';

const MessageBubble = ({ message, isLastMessage }) => {
  const theme = useTheme();
  const isUser = message.sender === 'user';
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;
  
  // Format timestamp
  const formattedTime = useMemo(() => {
    const date = new Date(message.timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }, [message.timestamp]);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const bubbleStyle = {
    backgroundColor: isUser 
      ? theme.colors.primary 
      : theme.dark 
        ? theme.colors.surface 
        : '#f0f0f0',
    alignSelf: isUser ? 'flex-end' : 'flex-start',
    borderTopRightRadius: isUser ? 0 : 16,
    borderTopLeftRadius: isUser ? 16 : 0,
  };

  const textStyle = {
    color: isUser ? 'white' : theme.colors.text,
  };

  const timeStyle = {
    color: isUser ? 'rgba(255, 255, 255, 0.7)' : theme.colors.placeholder,
  };

  return (
    <Animated.View 
      style={[
        styles.container, 
        { opacity, transform: [{ translateY }] }
      ]}
    >
      <View style={[styles.bubble, bubbleStyle]}>
        <Text style={[styles.messageText, textStyle]}>{message.text}</Text>
        <Text style={[styles.timestamp, timeStyle]}>{formattedTime}</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  bubble: {
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
    maxWidth: '75%',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  timestamp: {
    fontSize: 11,
    marginTop: 4,
    alignSelf: 'flex-end',
    opacity: 0.7,
  },
});

export default MessageBubble;
