import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { TextInput, useTheme } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';

const ChatInput = ({ onSend }) => {
  const [message, setMessage] = useState('');
  const theme = useTheme();

  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      setMessage('');
    }
  };

  return (
    <View 
      style={[
        styles.container, 
        { 
          backgroundColor: theme.dark ? theme.colors.surface : '#fff',
          borderTopColor: theme.dark ? theme.colors.backdrop : '#e0e0e0',
        }
      ]}
    >
      <TextInput
        style={styles.input}
        placeholder="Type a message..."
        value={message}
        onChangeText={setMessage}
        mode="outlined"
        multiline
        maxHeight={100}
        onSubmitEditing={handleSend}
        returnKeyType="send"
        blurOnSubmit={Platform.OS === 'ios'}
        theme={theme}
      />
      <TouchableOpacity 
        style={[styles.sendButton, { backgroundColor: theme.colors.primary }]} 
        onPress={handleSend}
        disabled={!message.trim()}
        activeOpacity={0.7}
      >
        <Feather name="send" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderTopWidth: 1,
  },
  input: {
    flex: 1,
    marginRight: 8,
    borderRadius: 20,
    maxHeight: 100,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ChatInput;
