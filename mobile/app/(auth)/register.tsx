import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Header, PrimaryButton, Input } from '../../components/ui';
import { colors } from '../../theme/colors';
import { useAuth } from '../../context/AuthContext';

export default function RegisterScreen() {
  const router = useRouter();
  const { sendOTP, clearError } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  // Detect if input is email or phone
  const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const isValidPhone = (value: string) => /^[\d\s\-+()]{9,}$/.test(value.replace(/\s/g, ''));

  const handleRegister = async () => {
    // Validate inputs
    if (!fullName.trim()) {
      Alert.alert('שגיאה', 'אנא הכנס שם מלא');
      return;
    }
    
    if (!email.trim() && !phone.trim()) {
      Alert.alert('שגיאה', 'אנא הכנס אימייל או מספר טלפון');
      return;
    }

    if (!agreedToTerms) {
      Alert.alert('שגיאה', 'יש לאשר את תנאי השימוש');
      return;
    }

    setLoading(true);
    clearError();

    try {
      // Prefer phone if provided, otherwise use email
      let identifier: string;
      let type: 'email' | 'sms';

      if (phone.trim() && isValidPhone(phone)) {
        // Format phone number (add Israel country code if not present)
        identifier = phone.startsWith('+') ? phone : `+972${phone.replace(/^0/, '')}`;
        type = 'sms';
      } else if (email.trim() && isValidEmail(email)) {
        identifier = email.trim();
        type = 'email';
      } else {
        Alert.alert('שגיאה', 'אנא הכנס אימייל או מספר טלפון תקין');
        setLoading(false);
        return;
      }

      await sendOTP(identifier, type);
      
      // Navigate to OTP screen with the identifier and name
      router.push({
        pathname: '/(auth)/otp',
        params: { identifier, type, fullName: fullName.trim() }
      });
    } catch (err: any) {
      Alert.alert('שגיאה', err.message || 'שליחת קוד האימות נכשלה');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="הרשמה" />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Image */}
        <Animated.View 
          entering={FadeInDown.delay(100).duration(600)}
          style={styles.heroContainer}
        >
          <Image
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDVNfYUIL9x7Vk-g3iDcK-kX3TS7Ehe2IWrtwVZH-Bv2bMxlYPmkxDJ8TRZreu6kdTZ65h_MR0fzQCp0GuXYFqzFGY-3jn8LCKtW4N3goy4ztEtONQqBskbAndRaS3vtMLjAizvNuzb_N8aZuSYPP2zxL0BkJutKrFEXQtapOvRPdrZmWkDz-pUW7WUYrs3Jack9ruhIeIzKDHmaBvG3LRbPU1dexXD5XxqXSMKkyJBd5WA5sAPdl9jN8Fp87sfE9GGMXU-ahWzhcU' }}
            style={styles.heroImage}
          />
          <View style={styles.heroOverlay} />
          <View style={styles.heroTextContainer}>
            <Text style={styles.heroTitle}>הצטרפו</Text>
            <Text style={styles.heroSubtitle}>לקהילת הפיננסים החדשה</Text>
          </View>
        </Animated.View>

        {/* Registration Form */}
        <Animated.View 
          entering={FadeInDown.delay(200).duration(600)}
          style={styles.formContainer}
        >
          <Input
            label="שם מלא"
            placeholder="ישראל ישראלי"
            value={fullName}
            onChangeText={setFullName}
            icon="person"
          />

          <Input
            label="אימייל"
            placeholder="name@example.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            icon="mail"
            textAlign="left"
          />

          <Input
            label="מספר טלפון"
            placeholder="050-0000000"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            icon="call"
            textAlign="left"
          />
          
          <Text style={styles.otpHint}>
            נשלח אליך קוד אימות לטלפון או לאימייל
          </Text>
        </Animated.View>

        {/* Terms & Conditions */}
        <Animated.View 
          entering={FadeInDown.delay(300).duration(600)}
          style={styles.termsContainer}
        >
          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => setAgreedToTerms(!agreedToTerms)}
          >
            {agreedToTerms && (
              <MaterialIcons name="check" size={14} color={colors.primary} />
            )}
          </TouchableOpacity>
          <Text style={styles.termsText}>
            באמצעות הרשמה, אני מאשר את{' '}
            <Text style={styles.termsLink}>תנאי השימוש</Text>
            {' '}ו
            <Text style={styles.termsLink}>מדיניות הפרטיות</Text>
            {' '}של TESFA.
          </Text>
        </Animated.View>

        {/* Register Button */}
        <Animated.View 
          entering={FadeInDown.delay(400).duration(600)}
          style={styles.buttonContainer}
        >
          <PrimaryButton
            title="צור חשבון"
            onPress={handleRegister}
            loading={loading}
            disabled={!agreedToTerms}
          />
        </Animated.View>

        {/* Login Link */}
        <Animated.View 
          entering={FadeInDown.delay(500).duration(600)}
          style={styles.loginLinkContainer}
        >
          <Text style={styles.loginText}>
            כבר יש לך חשבון?{' '}
            <Text 
              style={styles.loginLink}
              onPress={() => router.push('/(auth)/login')}
            >
              התחבר
            </Text>
          </Text>
        </Animated.View>
      </ScrollView>

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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  heroContainer: {
    height: 192,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 32,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
    backgroundImage: 'linear-gradient(to top, #121222, transparent)',
  },
  heroTextContainer: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
  heroTitle: {
    color: colors.primary,
    fontSize: 28,
    fontWeight: '800',
  },
  heroSubtitle: {
    color: colors.onSurfaceVariant,
    fontSize: 18,
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
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginTop: 24,
    paddingHorizontal: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.outlineVariant,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  termsText: {
    flex: 1,
    color: colors.onSurfaceVariant,
    fontSize: 12,
    lineHeight: 20,
    textAlign: 'right',
  },
  termsLink: {
    color: colors.primary,
  },
  buttonContainer: {
    marginTop: 40,
  },
  loginLinkContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  loginText: {
    color: colors.onSurfaceVariant,
    fontSize: 16,
  },
  loginLink: {
    color: colors.primary,
    fontWeight: '700',
  },
  decorTop: {
    position: 'absolute',
    top: '-10%',
    left: '-10%',
    width: '50%',
    height: '50%',
    backgroundColor: colors.primary,
    opacity: 0.05,
    borderRadius: 9999,
    zIndex: -1,
  },
  decorBottom: {
    position: 'absolute',
    bottom: '-10%',
    right: '-10%',
    width: '40%',
    height: '40%',
    backgroundColor: colors.secondaryContainer,
    opacity: 0.1,
    borderRadius: 9999,
    zIndex: -1,
  },
});
