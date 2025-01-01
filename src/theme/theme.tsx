import Theme from './themeTypes';

export const lightTheme: Theme = {
    mode: 'light',
    background: 'rgba(255, 255, 255, 1.0)',
    text: '#000000',
    primary: '#6200ee',
    secondary: '#007BFF',
    sectionSeperator: 'rgba(0, 0, 0, 0.3)',
    title_ticky: '#ff6600',
};

export const darkTheme: Theme = {
    mode: 'dark',
    background: 'rgba(0, 0, 0, 1.0)',
    text: '#ffffff',
    primary: '#bb86fc',
    secondary: '#007BFF',
    sectionSeperator: 'rgba(90, 90, 90, 0.71)',
    title_ticky: '#ff6600',
};

// Exporting both themes separately and the interface for types 
export default { lightTheme, darkTheme };