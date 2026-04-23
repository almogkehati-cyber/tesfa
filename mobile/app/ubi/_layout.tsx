import { Stack } from 'expo-router';
import { colors } from '../../theme/colors';

export default function UBILayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
        animation: 'slide_from_bottom',
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}
