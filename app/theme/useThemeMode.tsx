import { useState, useEffect } from 'react';
import { Appearance } from 'react-native';
import { Theme, lightTheme, darkTheme } from './theme';

export const useThemeMode = (): Theme => {
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
