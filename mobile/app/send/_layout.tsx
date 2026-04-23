import { Stack } from 'expo-router';
import { colors } from '../../theme/colors';

export default function SendLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
        animation: 'slide_from_bottom',
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen 
        name="confirm" 
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen 
        name="success" 
        options={{ 
          animation: 'fade',
          gestureEnabled: false,
        }}
      />
    </Stack>
  );
}
