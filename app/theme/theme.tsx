import Theme from './themeTypes';

export const lightTheme: Theme = {
    mode: 'light',
    background: '#ffffff',
    text: '#000000',
    primary: '#6200ee',
    secondary: '#007BFF',
    sectionSeperator: 'rgba(0, 0, 0, 0.3)',
};

export const darkTheme: Theme = {
    mode: 'dark',
    background: '#000000',
    text: '#ffffff',
    primary: '#bb86fc',
    secondary: '#007BFF',
    sectionSeperator: 'rgba(90, 90, 90, 0.71)',
};

// Exporting both themes separately and the interface for types 
export default { lightTheme, darkTheme };