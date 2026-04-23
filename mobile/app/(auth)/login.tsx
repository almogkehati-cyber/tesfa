import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Header, PrimaryButton, Input } from '../../components/ui';
import { colors } from '../../theme/colors';
import { useAuth } from '../../context/AuthContext';

export default function LoginScreen() {
  const router = useRouter();
  const { sendOTP, isLoading, error, clearError } = useAuth();
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [loading, setLoading] = useState(false);

  // Detect if input is email or phone
  const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const isPhone = (value: string) => /^[\d\s\-+()]{9,}$/.test(value.replace(/\s/g, ''));

  const handleLogin = async () => {
    if (!emailOrPhone.trim()) {
      Alert.alert('שגיאה', 'אנא הכנס אימייל או מספר טלפון');
      return;
    }

    setLoading(true);
    clearError();

    try {
      const identifier = emailOrPhone.trim();
      const type = isEmail(identifier) ? 'email' : 'sms';
      
      // Format phone number if needed (add Israel country code if not present)
      const formattedIdentifier = type === 'sms' && !identifier.startsWith('+') 
        ? `+972${identifier.replace(/^0/, '')}` 
        : identifier;

      await sendOTP(formattedIdentifier, type);
      
      // Navigate to OTP screen with the identifier
      router.push({
        pathname: '/(auth)/otp',
        params: { identifier: formattedIdentifier, type }
      });
    } catch (err: any) {
      Alert.alert('שגיאה', err.message || 'שליחת קוד האימות נכשלה');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Background Decorations */}
      <View style={styles.decorTopRight} />
      <View style={styles.decorBottomLeft} />

      <Header showLogo showBack />

      <View style={styles.content}>
        {/* Header Text */}
        <Animated.View 
          entering={FadeInDown.delay(100).duration(600)}
          style={styles.headerContainer}
        >
          <Text style={styles.title}>התחברות</Text>
          <Text style={styles.subtitle}>ברוך השוב לכספת התקווה שלך</Text>
        </Animated.View>

        {/* Login Form */}
        <Animated.View 
          entering={FadeInDown.delay(200).duration(600)}
          style={styles.formContainer}
        >
          <Input
            label="אימייל או טלפון"
            placeholder="הכנס אימייל או מספר טלפון"
            value={emailOrPhone}
            onChangeText={setEmailOrPhone}
            icon="alternate-email"
            keyboardType="email-address"
          />
          
          <Text style={styles.otpHint}>
            נשלח אליך קוד אימות בהודעה
          </Text>
        </Animated.View>

        {/* Login Button */}
        <Animated.View 
          entering={FadeInDown.delay(300).duration(600)}
          style={styles.buttonContainer}
        >
          <PrimaryButton
            title="התחבר"
            onPress={handleLogin}
            loading={loading}
          />
        </Animated.View>

        {/* Divider */}
        <Animated.View 
          entering={FadeInDown.delay(400).duration(600)}
          style={styles.dividerContainer}
        >
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>או התחבר באמצעות</Text>
          <View style={styles.dividerLine} />
        </Animated.View>

        {/* Alternative Auth Options */}
        <Animated.View 
          entering={FadeInDown.delay(500).duration(600)}
          style={styles.altAuthContainer}
        >
          <TouchableOpacity style={styles.altAuthButton}>
            <MaterialIcons name="fingerprint" size={24} color={colors.onSurface} />
            <Text style={styles.altAuthText}>ביומטרי</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.altAuthButton}>
            <Image
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkVT41j0_ETZNkHIOkyOhvKbNGpconxfA5BX5m-vGXFSUhFgos5oWizQJMqrYE38SqBHT3zJIJPkfyMSA4bP2dqPTS665pJ0I9rDfRQdlsOJ-pNfGccBy6wJKCZXZnx-Vj9_p8lmo-TrE58PmMX-VN2qoCeJVMkUJEJlF1z4Rx0ZrlvjQlQ1HT6BoFgZrYrOn2ZL-00qLVJ82dVyDqJ_0MaUHX8OSbs6byAdB8_GyZMZyA1XxMa7jL5tLfv9wQHZbAhrBUoCixl6s' }}
              style={styles.googleIcon}
            />
            <Text style={styles.altAuthText}>Google</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          אין לך חשבון?{' '}
          <Text 
            style={styles.footerLink}
            onPress={() => router.push('/(auth)/register')}
          >
            הרשם
          </Text>
        </Text>
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
    top: '-10%',
    right: '-10%',
    width: 256,
    height: 256,
    backgroundColor: colors.primary,
    opacity: 0.1,
    borderRadius: 9999,
  },
  decorBottomLeft: {
    position: 'absolute',
    bottom: '-5%',
    left: '-5%',
    width: 320,
    height: 320,
    backgroundColor: colors.secondaryContainer,
    opacity: 0.1,
    borderRadius: 9999,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  headerContainer: {
    marginBottom: 48,
    textAlign: 'right',
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: colors.onSurface,
    marginBottom: 8,
    textAlign: 'right',
  },
  subtitle: {
    fontSize: 18,
    color: colors.onSurfaceVariant,
    textAlign: 'right',
  },
  formContainer: {
    gap: 8,
  },
  otpHint: {
    color: colors.onSurfaceVariant,
    fontSize: 14,
    textAlign: 'right',
    marginTop: 8,
    paddingHorizontal: 8,
  },
  buttonContainer: {
    marginTop: 32,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: `${colors.outlineVariant}33`,
  },
  dividerText: {
    color: colors.onSurfaceVariant,
    fontSize: 12,
  },
  altAuthContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  altAuthButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: colors.surfaceContainerLow,
  },
  altAuthText: {
    color: colors.onSurface,
    fontSize: 14,
    fontWeight: '500',
  },
  googleIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  footer: {
    paddingVertical: 32,
    alignItems: 'center',
  },
  footerText: {
    color: colors.onSurfaceVariant,
    fontSize: 16,
  },
  footerLink: {
    color: colors.primary,
    fontWeight: '700',
  },
});
