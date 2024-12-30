import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{ headerTitleAlign: 'center' }}
    >
      <Stack.Screen name="index" options={{ title: 'VOZ' }} />
      <Stack.Screen name="sub_item" options={{ title: 'Sub Items', headerTitleAlign: "left" }} />
    </Stack>
  );
}