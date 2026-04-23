import { Stack } from 'expo-router';
import { colors } from '../../theme/colors';

export default function SettingsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
        animation: 'slide_from_left',
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="edit-profile" />
      <Stack.Screen name="security" />
      <Stack.Screen name="language" />
      <Stack.Screen name="notifications" />
      <Stack.Screen name="seed-phrase" />
    </Stack>
  );
}
