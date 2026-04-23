import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Header, PrimaryButton, Input } from '../../components/ui';
import { colors } from '../../theme/colors';

export default function ForgotPinScreen() {
  const router = useRouter();
  const [phone, setPhone] = useState('');
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
      <Header showLogo />

      <View style={styles.content}>
        {/* Visual Element */}
        <Animated.View 
          entering={FadeInDown.delay(100).duration(600)}
          style={styles.visualContainer}
        >
          <View style={styles.glowBackground} />
          <View style={styles.glowSecondary} />
          <View style={styles.iconContainer}>
            <MaterialIcons name="lock-reset" size={56} color={colors.primary} />
          </View>
        </Animated.View>

        {/* Header */}
        <Animated.View 
          entering={FadeInDown.delay(200).duration(600)}
          style={styles.headerContainer}
        >
          <Text style={styles.title}>שכחתי PIN</Text>
          <Text style={styles.subtitle}>
            אמת את מספר הטלפון שלך כדי לאפס את ה-PIN
          </Text>
        </Animated.View>

        {/* Form */}
        <Animated.View 
          entering={FadeInDown.delay(300).duration(600)}
          style={styles.formContainer}
        >
          <Input
            label="מספר טלפון"
            placeholder="05X-XXXXXXX"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            icon="smartphone"
            textAlign="left"
          />

          <View style={styles.buttonContainer}>
            <PrimaryButton
              title="שלח קוד אימות"
              onPress={handleSendCode}
              loading={loading}
            />
          </View>
        </Animated.View>

        {/* Support Section */}
        <Animated.View 
          entering={FadeInDown.delay(400).duration(600)}
          style={styles.supportContainer}
        >
          <View style={styles.divider} />
          <Text style={styles.supportText}>
            זקוק לעזרה נוספת?{' '}
            <Text style={styles.supportLink}>צור קשר עם התמיכה</Text>
          </Text>
        </Animated.View>
      </View>

      {/* Bottom Gradient Line */}
      <View style={styles.bottomLine} />
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
  },
  visualContainer: {
    width: '100%',
    height: 192,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
    borderRadius: 16,
    overflow: 'hidden',
  },
  glowBackground: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 300,
    height: 300,
    backgroundColor: colors.primaryContainer,
    opacity: 0.4,
    borderRadius: 9999,
    transform: [{ translateX: -150 }, { translateY: -150 }],
  },
  glowSecondary: {
    position: 'absolute',
    top: '25%',
    right: '25%',
    width: 150,
    height: 150,
    backgroundColor: colors.secondaryContainer,
    opacity: 0.3,
    borderRadius: 9999,
  },
  iconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: `${colors.surfaceContainer}99`,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: `${colors.outlineVariant}33`,
  },
  headerContainer: {
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
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
    gap: 16,
  },
  buttonContainer: {
    marginTop: 16,
  },
  supportContainer: {
    marginTop: 'auto',
    paddingBottom: 48,
    alignItems: 'center',
    gap: 16,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: `${colors.outlineVariant}33`,
  },
  supportText: {
    color: colors.onSurfaceVariant,
    fontSize: 14,
    textAlign: 'center',
  },
  supportLink: {
    color: colors.primary,
    fontWeight: '700',
  },
  bottomLine: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: `${colors.primary}4D`,
  },
});
