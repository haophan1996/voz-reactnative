import React from 'react';
import { NavigationContainer, DefaultTheme, RouteProp } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ScreenHome from './src/ScreenHome';
import ScreenThreads from './src/ScreenThreads';
import useThemeMode from './src/theme/useThemeMode';
import { enableScreens } from 'react-native-screens';
import { RootStackParamList } from './src/type';
import { Platform } from 'react-native';


const Stack = Platform.OS === 'android' ?
  createStackNavigator<RootStackParamList>() :
  createNativeStackNavigator<RootStackParamList>();

enableScreens();

export default function App() {
  const themeMode = useThemeMode();

  const theme = {
    ...DefaultTheme,
    dark: themeMode.mode === 'dark',
    colors: {
      ...DefaultTheme.colors,
      background: themeMode.background,
      text: themeMode.text,
      primary: themeMode.primary,
      border: themeMode.sectionSeperator,
      card: themeMode.background,
    },
  };


  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        initialRouteName="ScreenHome"
        screenOptions={{
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
          ...Platform.select({
            android: {
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            },
            ios: {
              fullScreenGestureEnabled: true,
            },
          }),
        }}
      >
        <Stack.Screen name="ScreenHome" component={ScreenHome}
          options={{
            title: 'VOZ',
          }}
        />
        <Stack.Screen name="ScreenThreads" component={ScreenThreads}
          initialParams={{
            appbartitle: 'Sub Items',
          }}
          options={({ route }: { route: RouteProp<RootStackParamList, 'ScreenThreads'> }) => ({
            headerTitleAlign: 'left',
            title: route.params.appbartitle, // Use route params for title
          })}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
