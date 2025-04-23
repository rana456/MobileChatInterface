import AsyncStorage from '@react-native-async-storage/async-storage';

const MESSAGES_STORAGE_KEY = '@ai_chat_messages';

/**
 * Save messages to AsyncStorage
 * @param {Array} messages - Array of message objects
 */
export const saveMessages = async (messages) => {
  try {
    const jsonValue = JSON.stringify(messages);
    await AsyncStorage.setItem(MESSAGES_STORAGE_KEY, jsonValue);
    return true;
  } catch (error) {
    console.error('Error saving messages:', error);
    return false;
  }
};

/**
 * Load messages from AsyncStorage
 * @returns {Array} Array of message objects
 */
export const loadMessages = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(MESSAGES_STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    console.error('Error loading messages:', error);
    return [];
  }
};

/**
 * Clear all messages from AsyncStorage
 */
export const clearMessages = async () => {
  try {
    await AsyncStorage.removeItem(MESSAGES_STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing messages:', error);
    return false;
  }
};
