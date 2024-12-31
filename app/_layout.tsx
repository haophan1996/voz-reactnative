import { Stack, SplashScreen } from "expo-router";
import useThemeMode from './theme/useThemeMode';

export default function RootLayout() {
  const theme = useThemeMode(); 
 
  return (
    <Stack 
      initialRouteName="sub_item"
      screenOptions={{
        headerStyle: {
          backgroundColor: useThemeMode().background,
        },
        headerTintColor: useThemeMode().text,
        headerTitleStyle: {
          fontWeight: 'bold',
        }, 
        headerTitleAlign: 'center',
        statusBarBackgroundColor: useThemeMode().background,
        statusBarStyle: theme.mode == "dark" ? "light" : "dark"
      }}

    >
      <Stack.Screen name="index" options={{
        title: 'VOZ', 
        contentStyle: {
          backgroundColor: useThemeMode().background, 
        },
      }} />
      <Stack.Screen name="sub_item" options={{
        title: 'Sub Items',
        contentStyle: {
          backgroundColor: useThemeMode().background
        },
        headerTitleAlign: "left",  
      }} />
    </Stack>
  );
}
