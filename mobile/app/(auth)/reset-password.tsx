import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Header, PrimaryButton, Input } from '../../components/ui';
import { colors } from '../../theme/colors';

export default function ResetPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendCode = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push('/(auth)/otp');
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Celestial Glow Background */}
      <View style={styles.celestialGlow} />

      <Header showLogo />

      <View style={styles.content}>
        {/* Header */}
        <Animated.View 
          entering={FadeInDown.delay(100).duration(600)}
          style={styles.headerContainer}
        >
          <Text style={styles.title}>איפוס סיסמה</Text>
          <Text style={styles.subtitle}>
            הזן את כתובת האימייל שלך לקבלת קוד איפוס
          </Text>
        </Animated.View>

        {/* Visual Element */}
        <Animated.View 
          entering={FadeInDown.delay(200).duration(600)}
          style={styles.visualContainer}
        >
          <Image
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0aJ4ZkHXCyedz2NfN1zQRVQ_aLc_OXmEoFHVg_UgkIcW4atkKvGX3NuNJASFwUOIBz4ZSCm4IFAXJ7xQxRuyi5KY1HOIKnBLTHRJsxbjpBg4El186zgOZuraSJusBf5NGJomImVsCEAk9BrmpgwMHG6HNzr88G04CY73lmsYU5jbkyuABOKuYwdceFJU2SFr9u1zYQZerKAZt8T4LM2xM_U4-dFFTOMjkbP7tCJkf7C9gyCKF5YqhwdbuxLF7wRn4VPOViWBk08Y' }}
            style={styles.visualImage}
          />
          <View style={styles.visualOverlay} />
          <View style={styles.iconContainer}>
            <MaterialIcons name="lock-reset" size={48} color={colors.primary} />
          </View>
        </Animated.View>

        {/* Form */}
        <Animated.View 
          entering={FadeInDown.delay(300).duration(600)}
          style={styles.formContainer}
        >
          <Input
            label="אימייל"
            placeholder="name@example.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            icon="mail"
            textAlign="left"
          />

          <View style={styles.buttonContainer}>
            <PrimaryButton
              title="שלח קוד איפוס"
              onPress={handleSendCode}
              loading={loading}
              icon={<MaterialIcons name="arrow-back" size={20} color={colors.white} />}
            />
          </View>

          <Text style={styles.backToLoginText}>
            זוכר את הסיסמה?{' '}
            <Text 
              style={styles.backToLoginLink}
              onPress={() => router.push('/(auth)/login')}
            >
              חזור להתחברות
            </Text>
          </Text>
        </Animated.View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Secure Celestial Protocol v2.4</Text>
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
  celestialGlow: {
    position: 'absolute',
    top: '-20%',
    left: '25%',
    width: '50%',
    height: '40%',
    backgroundColor: colors.primaryContainer,
    opacity: 0.15,
    borderRadius: 9999,
    transform: [{ scale: 1.5 }],
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  headerContainer: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: 16,
    textAlign: 'right',
  },
  subtitle: {
    fontSize: 18,
    color: colors.onSurfaceVariant,
    lineHeight: 26,
    maxWidth: 280,
    textAlign: 'right',
  },
  visualContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 32,
    backgroundColor: `${colors.surfaceContainer}99`,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: `${colors.outlineVariant}1A`,
  },
  visualImage: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.4,
  },
  visualOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.primaryContainer,
    opacity: 0.2,
  },
  iconContainer: {
    zIndex: 10,
  },
  formContainer: {
    gap: 16,
  },
  buttonContainer: {
    marginTop: 16,
  },
  backToLoginText: {
    textAlign: 'center',
    color: colors.onSurfaceVariant,
    fontSize: 14,
    fontWeight: '500',
    marginTop: 24,
  },
  backToLoginLink: {
    color: colors.primary,
  },
  footer: {
    marginTop: 'auto',
    paddingBottom: 48,
    alignItems: 'center',
    opacity: 0.3,
  },
  footerText: {
    fontSize: 10,
    color: colors.outline,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
});
