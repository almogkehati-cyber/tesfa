import { Stack } from 'expo-router';
import { colors } from '../../theme/colors';

export default function BusinessLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
        animation: 'slide_from_left',
      }}
    >
      <Stack.Screen name="[id]" />
      <Stack.Screen name="admin" />
      <Stack.Screen name="register" />
      <Stack.Screen name="receive-qr" />
      <Stack.Screen name="transactions" />
      <Stack.Screen name="reviews" />
      <Stack.Screen name="settings" />
      <Stack.Screen name="pay-employee" />
      <Stack.Screen name="pay-confirm" />
      <Stack.Screen name="pay-success" />
      <Stack.Screen name="payment-received" />
    </Stack>
  );
}
