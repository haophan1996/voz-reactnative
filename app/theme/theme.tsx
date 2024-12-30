export interface Theme {
    background: string;
    text: string;
    primary: string;
    secondary: string;
}

export const lightTheme: Theme = {
    background: '#ffffff',
    text: '#000000',
    primary: '#6200ee',
    secondary: '#03dac6',
};

export const darkTheme: Theme = {
    background: '#121212',
    text: '#ffffff',
    primary: '#bb86fc',
    secondary: '#03dac6',
};
