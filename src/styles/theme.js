import { DefaultTheme, DarkTheme } from 'react-native-paper';

// Light theme configuration
export const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1a73e8', // Google blue
    accent: '#4285F4',
    background: '#f5f5f5',
    surface: '#ffffff',
    text: '#202124',
    placeholder: '#5f6368',
    backdrop: '#eeeeee',
    notification: '#ea4335',
  },
  roundness: 8,
};

// Dark theme configuration
export const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#8ab4f8', // Lighter blue for dark mode
    accent: '#4285F4',
    background: '#202124',
    surface: '#303134',
    text: '#e8eaed',
    placeholder: '#9aa0a6',
    backdrop: '#3c4043',
    notification: '#f28b82',
  },
  roundness: 8,
  dark: true,
};
