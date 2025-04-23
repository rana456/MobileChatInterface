import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Header = ({ toggleTheme, currentTheme }) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View 
      style={[
        styles.container, 
        { 
          paddingTop: insets.top + 10,
          backgroundColor: theme.colors.surface,
          borderBottomColor: theme.dark ? theme.colors.backdrop : '#e0e0e0',
        }
      ]}
    >
      <Text style={[styles.title, { color: theme.colors.primary }]}>
        AI Assistant
      </Text>
      <TouchableOpacity
        onPress={toggleTheme}
        style={styles.themeToggle}
      >
        <Feather 
          name={currentTheme === 'dark' ? 'sun' : 'moon'} 
          size={24} 
          color={theme.colors.primary} 
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 10,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  themeToggle: {
    padding: 8,
  },
});

export default Header;
