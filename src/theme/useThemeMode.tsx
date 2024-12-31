import { useState, useEffect } from 'react';
import { Appearance } from 'react-native';
import Theme from './themeTypes'; // Import the interface
import { lightTheme, darkTheme } from './theme'; // Import the theme

const useThemeMode = () => {
  const [theme, setTheme] = useState<Theme>(
    Appearance.getColorScheme() === 'dark' ? darkTheme : lightTheme
  );

  useEffect(() => {
    const listener = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme === 'dark' ? darkTheme : lightTheme);
    });
    return () => listener.remove();
  }, []); 
 
  return theme;
};

export default useThemeMode;