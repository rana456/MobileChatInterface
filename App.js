import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { ThemeProvider } from './src/context/ThemeContext';
import { lightTheme, darkTheme } from './src/styles/theme';

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        {({ theme }) => (
          <PaperProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
            <NavigationContainer theme={theme === 'dark' ? darkTheme : lightTheme}>
              <AppNavigator />
            </NavigationContainer>
          </PaperProvider>
        )}
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
