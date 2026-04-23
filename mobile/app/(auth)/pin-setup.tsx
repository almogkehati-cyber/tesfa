import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, { FadeInDown, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { Header } from '../../components/ui';
import { colors } from '../../theme/colors';

export default function PinSetupScreen() {
  const router = useRouter();
  const [pin, setPin] = useState<string[]>([]);

  const handleNumberPress = (num: string) => {
    if (pin.length < 4) {
      const newPin = [...pin, num];
      setPin(newPin);
      
      if (newPin.length === 4) {
        // PIN complete - navigate to home
        setTimeout(() => {
          router.replace('/(tabs)/home');
        }, 500);
      }
    }
  };

  const handleBackspace = () => {
    if (pin.length > 0) {
      setPin(pin.slice(0, -1));
    }
  };

  const handleBiometric = () => {
    // TODO: Implement biometric
  };

  const NumpadButton = ({ value, onPress, disabled = false, children }: any) => {
    const scale = useSharedValue(1);
    
    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
    }));

    const handlePressIn = () => {
      scale.value = withSpring(0.9, { damping: 15 });
    };

    const handlePressOut = () => {
      scale.value = withSpring(1, { damping: 15 });
    };

    return (
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        activeOpacity={0.8}
      >
        <Animated.View style={[styles.numpadButton, animatedStyle]}>
          {children || <Text style={styles.numpadText}>{value}</Text>}
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Background Decorations */}
      <View style={styles.decorTopRight} />
      <View style={styles.decorBottomLeft} />

      <Header showLogo />

      <View style={styles.content}>
        {/* Header */}
        <Animated.View 
          entering={FadeInDown.delay(100).duration(600)}
          style={styles.headerContainer}
        >
          <Text style={styles.title}>יצירת קוד PIN</Text>
          <Text style={styles.subtitle}>
            אבטח את הארנק שלך באמצעות קוד אישי בן 4 ספרות
          </Text>
        </Animated.View>

        {/* PIN Indicators */}
        <Animated.View 
          entering={FadeInDown.delay(200).duration(600)}
          style={styles.pinContainer}
        >
          {[0, 1, 2, 3].map((index) => (
            <View
              key={index}
              style={[
                styles.pinDot,
                pin.length > index && styles.pinDotFilled,
              ]}
            />
          ))}
        </Animated.View>

        {/* Numpad */}
        <Animated.View 
          entering={FadeInDown.delay(300).duration(600)}
          style={styles.numpadContainer}
        >
          <View style={styles.numpadRow}>
            <NumpadButton value="1" onPress={() => handleNumberPress('1')} />
            <NumpadButton value="2" onPress={() => handleNumberPress('2')} />
            <NumpadButton value="3" onPress={() => handleNumberPress('3')} />
          </View>
          <View style={styles.numpadRow}>
            <NumpadButton value="4" onPress={() => handleNumberPress('4')} />
            <NumpadButton value="5" onPress={() => handleNumberPress('5')} />
            <NumpadButton value="6" onPress={() => handleNumberPress('6')} />
          </View>
          <View style={styles.numpadRow}>
            <NumpadButton value="7" onPress={() => handleNumberPress('7')} />
            <NumpadButton value="8" onPress={() => handleNumberPress('8')} />
            <NumpadButton value="9" onPress={() => handleNumberPress('9')} />
          </View>
          <View style={styles.numpadRow}>
            <NumpadButton onPress={handleBiometric} disabled>
              <MaterialIcons name="fingerprint" size={28} color={`${colors.onSurface}66`} />
            </NumpadButton>
            <NumpadButton value="0" onPress={() => handleNumberPress('0')} />
            <NumpadButton onPress={handleBackspace}>
              <MaterialIcons name="backspace" size={28} color={`${colors.error}CC`} />
            </NumpadButton>
          </View>
        </Animated.View>

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity onPress={() => router.push('/(auth)/forgot-pin')}>
            <Text style={styles.forgotPinText}>שכחתי את הקוד שלי</Text>
          </TouchableOpacity>
          <View style={styles.homeIndicator} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  decorTopRight: {
    position: 'absolute',
    top: '25%',
    right: -80,
    width: 320,
    height: 320,
    backgroundColor: colors.primary,
    opacity: 0.1,
    borderRadius: 9999,
  },
  decorBottomLeft: {
    position: 'absolute',
    bottom: '25%',
    left: -80,
    width: 320,
    height: 320,
    backgroundColor: colors.secondaryContainer,
    opacity: 0.1,
    borderRadius: 9999,
  },
  content: {
    flex: 1,
    paddingHorizontal: 32,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: 26,
    maxWidth: 280,
  },
  pinContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    gap: 24,
    marginBottom: 64,
  },
  pinDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.surfaceContainerHighest,
    borderWidth: 1,
    borderColor: `${colors.outlineVariant}4D`,
  },
  pinDotFilled: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },
  numpadContainer: {
    gap: 24,
    marginTop: 'auto',
  },
  numpadRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  numpadButton: {
    width: 80,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  numpadText: {
    fontSize: 28,
    fontWeight: '600',
    color: colors.onSurface,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 32,
    gap: 16,
  },
  forgotPinText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  homeIndicator: {
    width: 48,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.surfaceContainerHighest,
    marginTop: 8,
  },
});
