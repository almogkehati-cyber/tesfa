import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Header } from '../../components/ui';
import { colors } from '../../theme/colors';

export default function SecuritySetupScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Background Decorations */}
      <View style={styles.decorTop} />
      <View style={styles.decorBottom} />
      <View style={styles.ambientGlow} />

      <Header showLogo />

      <View style={styles.content}>
        {/* Header */}
        <Animated.View 
          entering={FadeInDown.delay(100).duration(600)}
          style={styles.headerContainer}
        >
          <Text style={styles.title}>הגדרות אבטחה</Text>
          <Text style={styles.subtitle}>בחר כיצד תרצה לאבטח את הארנק שלך</Text>
        </Animated.View>

        {/* Security Options */}
        <Animated.View 
          entering={FadeInDown.delay(200).duration(600)}
          style={styles.optionsContainer}
        >
          {/* Biometric Option */}
          <TouchableOpacity 
            style={styles.optionCard}
            onPress={() => router.replace('/(tabs)/home')}
            activeOpacity={0.8}
          >
            <View style={styles.optionContent}>
              <Text style={styles.optionTitle}>זיהוי ביומטרי</Text>
              <Text style={styles.optionDescription}>שימוש בטביעת אצבע או זיהוי פנים</Text>
            </View>
            <View style={styles.optionIconContainer}>
              <MaterialIcons name="fingerprint" size={32} color={colors.primary} />
            </View>
          </TouchableOpacity>

          {/* PIN Option */}
          <TouchableOpacity 
            style={styles.optionCard}
            onPress={() => router.push('/(auth)/pin-setup')}
            activeOpacity={0.8}
          >
            <View style={styles.optionContent}>
              <Text style={styles.optionTitle}>קוד PIN</Text>
              <Text style={styles.optionDescription}>הגדרת קוד גישה אישי מאובטח</Text>
            </View>
            <View style={[styles.optionIconContainer, styles.optionIconSecondary]}>
              <MaterialIcons name="keyboard" size={32} color={colors.onSurfaceVariant} />
            </View>
          </TouchableOpacity>
        </Animated.View>

        {/* Visual Element */}
        <Animated.View 
          entering={FadeInDown.delay(300).duration(600)}
          style={styles.visualContainer}
        >
          <Image
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMOGyxASv-UNe9Amt_VXenYIF6jaRzONvtz56tVL0-oE9ed2yOww06qry_75SQBvzYrIWHFbuzhfueqLYHJcGANqWTfasbtP2jPwQ0_p6N_axq7-OtD1X1ehbVG7lzPYzJGONvatVMazdx3BB4jfF4lL0Si4I4cQZMwCfNkJO6BkLp5ecRH52oFF9SrM9locpoDGtE7iudKRLVCaIhtlQMDr4WtnTYPtuHlV_O0qzKq4kuEnUjSvQ4Lr9qoJ_fkjmQtMTYSFVDr9s' }}
            style={styles.visualImage}
          />
          <View style={styles.visualOverlay} />
        </Animated.View>

        {/* Footer */}
        <Animated.View 
          entering={FadeInDown.delay(400).duration(600)}
          style={styles.footer}
        >
          <TouchableOpacity onPress={() => router.replace('/(tabs)/home')}>
            <Text style={styles.skipText}>דלג לעת עתה</Text>
          </TouchableOpacity>

          {/* Progress Dots */}
          <View style={styles.progressContainer}>
            <View style={[styles.progressDot, styles.progressDotActive]} />
            <View style={styles.progressDot} />
            <View style={styles.progressDot} />
          </View>
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
  decorTop: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 384,
    height: 384,
    backgroundColor: colors.primary,
    opacity: 0.05,
    borderRadius: 9999,
  },
  decorBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 320,
    height: 320,
    backgroundColor: colors.secondary,
    opacity: 0.05,
    borderRadius: 9999,
  },
  ambientGlow: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 288,
    height: 288,
    backgroundColor: colors.primaryContainer,
    opacity: 0.2,
    borderRadius: 9999,
    transform: [{ translateX: -144 }, { translateY: -144 }],
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  headerContainer: {
    marginBottom: 48,
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: 16,
    textAlign: 'right',
  },
  subtitle: {
    fontSize: 18,
    color: colors.onSurfaceVariant,
    textAlign: 'right',
  },
  optionsContainer: {
    gap: 24,
    marginBottom: 48,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: `${colors.surfaceContainer}99`,
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: `${colors.outlineVariant}1A`,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: 4,
    textAlign: 'right',
  },
  optionDescription: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
    textAlign: 'right',
  },
  optionIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: `${colors.primaryContainer}4D`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionIconSecondary: {
    backgroundColor: colors.surfaceContainerHighest,
  },
  visualContainer: {
    width: '100%',
    height: 192,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 48,
  },
  visualImage: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.6,
  },
  visualOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.surface,
    opacity: 0.4,
  },
  footer: {
    marginTop: 'auto',
    alignItems: 'center',
    gap: 24,
    paddingBottom: 24,
  },
  skipText: {
    color: `${colors.primary}CC`,
    fontSize: 16,
    fontWeight: '600',
  },
  progressContainer: {
    flexDirection: 'row',
    gap: 6,
  },
  progressDot: {
    width: 8,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.surfaceContainerHighest,
  },
  progressDotActive: {
    width: 48,
    backgroundColor: colors.primary,
  },
});
