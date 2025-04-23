import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const THEME_STORAGE_KEY = '@ai_chat_theme';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);

  useEffect(() => {
    // Load saved theme preference
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (savedTheme !== null) {
          setTheme(savedTheme);
        }
        setIsThemeLoaded(true);
      } catch (error) {
        console.error('Error loading theme:', error);
        setIsThemeLoaded(true);
      }
    };

    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    
    // Save theme preference
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  if (!isThemeLoaded) {
    return null; // Or a loading indicator
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {typeof children === 'function' ? children({ theme, toggleTheme }) : children}
    </ThemeContext.Provider>
  );
};
