import { Stack } from 'expo-router';
import { colors } from '../../theme/colors';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="welcome" />
      <Stack.Screen name="register" />
      <Stack.Screen name="login" />
      <Stack.Screen name="reset-password" />
      <Stack.Screen name="otp" />
      <Stack.Screen name="new-password" />
      <Stack.Screen name="security-setup" />
      <Stack.Screen name="pin-setup" />
      <Stack.Screen name="forgot-pin" />
    </Stack>
  );
}
