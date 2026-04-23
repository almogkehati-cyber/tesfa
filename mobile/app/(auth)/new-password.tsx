import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Header, PrimaryButton, SecondaryButton, Input } from '../../components/ui';
import { colors } from '../../theme/colors';

export default function NewPasswordScreen() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpdatePassword = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push('/(auth)/security-setup');
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Background Decorations */}
      <View style={styles.celestialGlow} />
      <View style={styles.celestialGlowBottom} />

      <Header showLogo />

      <View style={styles.content}>
        {/* Header */}
        <Animated.View 
          entering={FadeInDown.delay(100).duration(600)}
          style={styles.headerContainer}
        >
          <Text style={styles.title}>סיסמה חדשה</Text>
          <Text style={styles.subtitle}>
            צור סיסמה חזקה ומאובטחת כדי לשמור על הכספת שלך מוגנת.
          </Text>
        </Animated.View>

        {/* Form */}
        <Animated.View 
          entering={FadeInDown.delay(200).duration(600)}
          style={styles.formCard}
        >
          <Input
            label="סיסמה חדשה"
            placeholder="הזן סיסמה חדשה"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            icon="lock"
          />

          <Input
            label="אישור סיסמה"
            placeholder="אמת את הסיסמה שלך"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            icon="shield"
          />
        </Animated.View>

        {/* Security Indicators */}
        <Animated.View 
          entering={FadeInDown.delay(300).duration(600)}
          style={styles.indicatorsContainer}
        >
          <View style={styles.indicator}>
            <MaterialIcons name="check-circle" size={16} color={colors.primary} />
            <Text style={styles.indicatorText}>8+ תווים</Text>
          </View>
          <View style={styles.indicator}>
            <MaterialIcons name="check-circle" size={16} color={colors.primary} />
            <Text style={styles.indicatorText}>אותיות ומספרים</Text>
          </View>
        </Animated.View>

        {/* Visual Element */}
        <Animated.View 
          entering={FadeInDown.delay(400).duration(600)}
          style={styles.visualContainer}
        >
          <Image
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCiNcIF2pCYi7dS5cSTq39rUCb-q8_HaPMkczWj0gOajARV4D8RtV5bC-r45CKUbcVpEj25bFrlwT9TFMH_E0obBIfhl0jz9PKUOYNczM032T2ijPNZVUMqBYALT9-8SQ-NwFSUWNYIQbbp3BsDqXqaeipG5U0XADca1iNOTvshkLuuo5blh7pO1xBUe_2Ung3P9I8QKFMXT14Mhv_EDzNg7AfWij_laUVwkIPDbW26nE1Se2G0GYQL9yP23gYLVP3a52UvkGVpFaw' }}
            style={styles.visualImage}
          />
          <View style={styles.visualOverlay} />
          <Text style={styles.visualText}>Security Protocol v4.0</Text>
        </Animated.View>

        {/* Action Buttons */}
        <Animated.View 
          entering={FadeInDown.delay(500).duration(600)}
          style={styles.actionsContainer}
        >
          <PrimaryButton
            title="עדכן סיסמה"
            onPress={handleUpdatePassword}
            loading={loading}
            icon={<MaterialIcons name="vpn-key" size={20} color={colors.white} />}
          />
          <SecondaryButton
            title="ביטול"
            onPress={() => router.back()}
          />
        </Animated.View>
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
    top: -200,
    right: -200,
    width: 600,
    height: 600,
    backgroundColor: colors.primaryContainer,
    opacity: 0.15,
    borderRadius: 9999,
  },
  celestialGlowBottom: {
    position: 'absolute',
    bottom: -200,
    left: -200,
    width: 600,
    height: 600,
    backgroundColor: colors.primaryContainer,
    opacity: 0.15,
    borderRadius: 9999,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  headerContainer: {
    marginBottom: 32,
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
    lineHeight: 26,
    textAlign: 'right',
  },
  formCard: {
    backgroundColor: colors.surfaceContainerLow,
    padding: 24,
    borderRadius: 16,
    gap: 16,
    marginBottom: 16,
  },
  indicatorsContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  indicator: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: `${colors.surfaceContainerLow}80`,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: `${colors.outlineVariant}1A`,
  },
  indicatorText: {
    color: colors.onSurface,
    fontSize: 12,
    fontWeight: '700',
  },
  visualContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 32,
    backgroundColor: `${colors.surfaceContainerHighest}4D`,
    justifyContent: 'flex-end',
    borderWidth: 1,
    borderColor: `${colors.outlineVariant}1A`,
  },
  visualImage: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.4,
  },
  visualOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.surfaceDim,
    opacity: 0.6,
  },
  visualText: {
    fontSize: 10,
    color: colors.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: 2,
    textAlign: 'center',
    paddingVertical: 16,
    opacity: 0.7,
  },
  actionsContainer: {
    gap: 16,
    marginTop: 'auto',
    paddingBottom: 24,
  },
});
