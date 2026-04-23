import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Header, PrimaryButton } from '../../components/ui';
import { colors } from '../../theme/colors';
import { useAuth } from '../../context/AuthContext';

export default function OTPScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ identifier?: string; type?: 'email' | 'sms'; fullName?: string }>();
  const { verifyOTP, sendOTP, isWalletReady, walletAddress, error, clearError } = useAuth();
  
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const inputRefs = useRef<TextInput[]>([]);

  // Countdown timer for resend
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  // Watch for wallet creation and navigate when ready
  useEffect(() => {
    if (isWalletReady && walletAddress) {
      // Wallet created successfully - navigate to main app
      router.replace('/(tabs)/home');
    }
  }, [isWalletReady, walletAddress]);

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const code = otp.join('');
    
    if (code.length !== 6) {
      Alert.alert('שגיאה', 'אנא הכנס קוד בן 6 ספרות');
      return;
    }

    setLoading(true);
    clearError();

    try {
      const success = await verifyOTP(code);
      
      if (success) {
        // OTP verified - embedded wallet will be created automatically
        // The useEffect above will handle navigation once wallet is ready
        // Show loading state while wallet is being created
      } else {
        Alert.alert('שגיאה', error || 'קוד האימות שגוי');
        // Clear the OTP inputs
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      }
    } catch (err: any) {
      Alert.alert('שגיאה', err.message || 'אימות הקוד נכשל');
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendTimer > 0 || !params.identifier || !params.type) return;

    try {
      await sendOTP(params.identifier, params.type);
      setResendTimer(60);
      Alert.alert('הצלחה', 'קוד אימות חדש נשלח');
    } catch (err: any) {
      Alert.alert('שגיאה', err.message || 'שליחת הקוד נכשלה');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header showLogo />

      <View style={styles.content}>
        {/* Header */}
        <Animated.View 
          entering={FadeInDown.delay(100).duration(600)}
          style={styles.headerContainer}
        >
          <Text style={styles.title}>אימות קוד</Text>
          <Text style={styles.subtitle}>הזן את הקוד בן 6 הספרות שנשלח אליך</Text>
        </Animated.View>

        {/* OTP Inputs */}
        <Animated.View 
          entering={FadeInDown.delay(200).duration(600)}
          style={styles.otpContainer}
        >
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => {
                if (ref) inputRefs.current[index] = ref;
              }}
              style={[
                styles.otpInput,
                digit && styles.otpInputFilled,
              ]}
              value={digit}
              onChangeText={(value) => handleOtpChange(value.slice(-1), index)}
              onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
              keyboardType="number-pad"
              maxLength={1}
              placeholder="•"
              placeholderTextColor={colors.outline}
            />
          ))}
        </Animated.View>

        {/* Verify Button */}
        <Animated.View 
          entering={FadeInDown.delay(300).duration(600)}
          style={styles.buttonContainer}
        >
          <PrimaryButton
            title="אמת קוד"
            onPress={handleVerify}
            loading={loading}
            icon={<MaterialIcons name="verified-user" size={20} color={colors.white} />}
          />
        </Animated.View>

        {/* Resend Link */}
        <Animated.View 
          entering={FadeInDown.delay(400).duration(600)}
          style={styles.resendContainer}
        >
          <Text style={styles.resendText}>
            לא קיבלת קוד?{' '}
            {resendTimer > 0 ? (
              <Text style={styles.resendTimer}>שלח שוב ({resendTimer})</Text>
            ) : (
              <Text style={styles.resendLink} onPress={handleResend}>
                שלח שוב
              </Text>
            )}
          </Text>
        </Animated.View>
      </View>

      {/* SMS Notification Toast */}
      <View style={styles.toastContainer}>
        <View style={styles.toast}>
          <View style={styles.toastIcon}>
            <MaterialIcons name={params.type === 'email' ? 'email' : 'sms'} size={20} color={colors.primary} />
          </View>
          <View style={styles.toastContent}>
            <Text style={styles.toastLabel}>{params.type === 'email' ? 'אימייל נשלח' : 'SMS נשלח'}</Text>
            <Text style={styles.toastMessage}>{params.identifier || 'בודק הודעות נכנסות...'}</Text>
          </View>
        </View>
      </View>

      {/* Background Decorations */}
      <View style={styles.decorTop} />
      <View style={styles.decorBottom} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 40,
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
    lineHeight: 26,
    textAlign: 'center',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 40,
  },
  otpInput: {
    width: 48,
    height: 56,
    backgroundColor: colors.surfaceContainer,
    borderRadius: 16,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
  },
  otpInputFilled: {
    backgroundColor: colors.surfaceContainerHigh,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  buttonContainer: {
    paddingHorizontal: 24,
  },
  resendContainer: {
    marginTop: 48,
    alignItems: 'center',
  },
  resendText: {
    color: colors.onSurfaceVariant,
    fontSize: 16,
    fontWeight: '500',
  },
  resendLink: {
    color: colors.primary,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  resendTimer: {
    color: colors.outline,
    fontWeight: '500',
  },
  toastContainer: {
    position: 'absolute',
    bottom: 40,
    left: 24,
    right: 24,
  },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${colors.surfaceContainer}F0`,
    borderRadius: 16,
    padding: 16,
    borderRightWidth: 4,
    borderRightColor: colors.primary,
    gap: 12,
  },
  toastIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: `${colors.primaryContainer}33`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toastContent: {
    flex: 1,
  },
  toastLabel: {
    fontSize: 10,
    color: colors.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  toastMessage: {
    fontSize: 14,
    color: colors.onSurface,
    fontWeight: '700',
  },
  decorTop: {
    position: 'absolute',
    top: 0,
    left: '-50%',
    width: 192,
    height: 192,
    backgroundColor: colors.secondary,
    opacity: 0.1,
    borderRadius: 9999,
    zIndex: -1,
  },
  decorBottom: {
    position: 'absolute',
    bottom: 0,
    right: '-25%',
    width: 192,
    height: 192,
    backgroundColor: colors.primaryContainer,
    opacity: 0.1,
    borderRadius: 9999,
    zIndex: -1,
  },
});
