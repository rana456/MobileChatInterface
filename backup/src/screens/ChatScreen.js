import React, { useState, useEffect, useRef, useContext } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import MessageBubble from '../components/MessageBubble';
import ChatInput from '../components/ChatInput';
import TypingIndicator from '../components/TypingIndicator';
import Header from '../components/Header';
import { generateResponse } from '../utils/mockAI';
import { saveMessages, loadMessages } from '../utils/storage';
import { ThemeContext } from '../context/ThemeContext';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef(null);
  const theme = useTheme();
  const { toggleTheme, theme: themeType } = useContext(ThemeContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const savedMessages = await loadMessages();
        if (savedMessages.length > 0) {
          setMessages(savedMessages);
        } else {
          // Add a welcome message if there are no saved messages
          const initialMessage = {
            id: Date.now().toString(),
            text: "Hello! I'm your AI assistant. How can I help you today?",
            sender: 'ai',
            timestamp: new Date().toISOString(),
          };
          setMessages([initialMessage]);
          await saveMessages([initialMessage]);
        }
      } catch (error) {
        console.error('Error loading messages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      saveMessages(messages);
    }
  }, [messages]);

  useEffect(() => {
    if (flatListRef.current && messages.length > 0) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const handleSend = async (text) => {
    if (!text.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);

    // Show typing indicator
    setIsTyping(true);

    try {
      // Simulate AI response time (1-3 seconds)
      const responseDelay = Math.floor(Math.random() * 2000) + 1000;
      setTimeout(async () => {
        const responseText = await generateResponse(text);
        const aiMessage = {
          id: (Date.now() + 1).toString(),
          text: responseText,
          sender: 'ai',
          timestamp: new Date().toISOString(),
        };

        setMessages((prevMessages) => [...prevMessages, aiMessage]);
        setIsTyping(false);
      }, responseDelay);
    } catch (error) {
      console.error('Error generating response:', error);
      setIsTyping(false);
    }
  };

  const renderItem = ({ item, index }) => (
    <MessageBubble
      message={item}
      isLastMessage={index === messages.length - 1}
    />
  );

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <Header toggleTheme={toggleTheme} currentTheme={themeType} />
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messageList}
        onContentSizeChange={() => 
          flatListRef.current.scrollToEnd({ animated: true })
        }
        onLayout={() => 
          flatListRef.current.scrollToEnd({ animated: true })
        }
      />
      {isTyping && <TypingIndicator />}
      <ChatInput onSend={handleSend} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageList: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
});

export default ChatScreen;
