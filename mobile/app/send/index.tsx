import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Header } from '../../components/ui';
import { colors } from '../../theme/colors';

export default function SendAmountScreen() {
  const router = useRouter();
  const [amount, setAmount] = useState('0.00');
  const balance = '2,450.00';

  const handleNumberPress = (num: string) => {
    if (amount === '0.00') {
      setAmount(num === '.' ? '0.' : num);
    } else if (num === '.' && amount.includes('.')) {
      return;
    } else if (amount.includes('.') && amount.split('.')[1].length >= 2) {
      return;
    } else {
      setAmount(amount + num);
    }
  };

  const handleBackspace = () => {
    if (amount.length <= 1 || amount === '0.00') {
      setAmount('0.00');
    } else {
      setAmount(amount.slice(0, -1));
    }
  };

  const handleContinue = () => {
    router.push('/send/confirm');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Background Glow */}
      <View style={styles.backgroundGlow} />

      <Header title="שליחת TSF" showLogo />

      <View style={styles.content}>
        {/* Recipient Card */}
        <Animated.View entering={FadeInDown.delay(100).duration(400)} style={styles.recipientCard}>
          <TouchableOpacity style={styles.changeButton}>
            <Text style={styles.changeText}>שינוי</Text>
          </TouchableOpacity>
          <View style={styles.recipientInfo}>
            <Text style={styles.recipientLabel}>שליחה אל</Text>
            <Text style={styles.recipientName}>איתמר כהן</Text>
          </View>
          <View style={styles.recipientAvatar}>
            <MaterialIcons name="person" size={24} color={colors.primary} />
          </View>
        </Animated.View>

        {/* Amount Display */}
        <Animated.View entering={FadeInDown.delay(200).duration(400)} style={styles.amountContainer}>
          <View style={styles.amountRow}>
            <Text style={styles.currency}>TSF</Text>
            <Text style={styles.amount}>{amount}</Text>
          </View>
          <View style={styles.balanceTag}>
            <Text style={styles.balanceText}>יתרה: {balance} TSF</Text>
          </View>
        </Animated.View>

        {/* Spacer */}
        <View style={styles.spacer} />

        {/* Numpad */}
        <Animated.View entering={FadeInDown.delay(300).duration(400)} style={styles.numpad}>
          {[['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9'], ['.', '0', 'back']].map((row, rowIndex) => (
            <View key={rowIndex} style={styles.numpadRow}>
              {row.map((key) => (
                <TouchableOpacity
                  key={key}
                  style={styles.numpadButton}
                  onPress={() => key === 'back' ? handleBackspace() : handleNumberPress(key)}
                  activeOpacity={0.7}
                >
                  {key === 'back' ? (
                    <MaterialIcons name="backspace" size={28} color={colors.onSurfaceVariant} />
                  ) : (
                    <Text style={styles.numpadText}>{key}</Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </Animated.View>
      </View>

      {/* Continue Button */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={handleContinue} activeOpacity={0.9}>
          <LinearGradient
            colors={colors.gradientPrimary}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 0 }}
            style={styles.continueButton}
          >
            <Text style={styles.continueText}>המשך</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  backgroundGlow: {
    position: 'absolute',
    top: '33%',
    left: '50%',
    width: 256,
    height: 256,
    backgroundColor: colors.primary,
    opacity: 0.05,
    borderRadius: 9999,
    transform: [{ translateX: -128 }, { translateY: -128 }],
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  recipientCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 16,
    padding: 16,
    marginBottom: 32,
  },
  recipientAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: `${colors.primaryContainer}33`,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: `${colors.primary}33`,
  },
  recipientInfo: {
    flex: 1,
    marginRight: 12,
  },
  recipientLabel: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
  },
  recipientName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.onSurface,
  },
  changeButton: {
    marginLeft: 'auto',
  },
  changeText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  amountContainer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  amount: {
    fontSize: 56,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: -2,
  },
  currency: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primaryContainer,
  },
  balanceTag: {
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 9999,
    backgroundColor: `${colors.surfaceContainerHighest}66`,
    borderWidth: 1,
    borderColor: `${colors.outlineVariant}1A`,
  },
  balanceText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.onSurfaceVariant,
  },
  spacer: {
    flex: 1,
  },
  numpad: {
    gap: 16,
    marginBottom: 32,
  },
  numpadRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  numpadButton: {
    width: 72,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  numpadText: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.onSurface,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  continueButton: {
    height: 64,
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primaryContainer,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
  },
  continueText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.white,
  },
});
