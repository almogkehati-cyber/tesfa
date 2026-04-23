import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { PrimaryButton, SecondaryButton } from '../../components/ui';
import { colors } from '../../theme/colors';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Celestial Glow Background */}
      <View style={styles.celestialGlow} />
      <View style={styles.bottomGlow} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>TESFA</Text>
        <TouchableOpacity style={styles.backButton}>
          <MaterialIcons name="arrow-forward" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Hero Content */}
      <View style={styles.heroContainer}>
        {/* Floating Card Visual */}
        <Animated.View 
          entering={FadeInUp.delay(200).duration(800)}
          style={styles.visualContainer}
        >
          <View style={styles.glowCircle} />
          <View style={styles.glassCard}>
            <LinearGradient
              colors={colors.gradientPrimary}
              style={styles.iconCircle}
            >
              <MaterialIcons name="account-balance-wallet" size={48} color={colors.white} />
            </LinearGradient>
          </View>
          {/* Floating accessory */}
          <View style={styles.accessoryCard}>
            <MaterialIcons name="star-half" size={24} color={colors.primary} />
          </View>
        </Animated.View>

        {/* Title */}
        <Animated.View 
          entering={FadeInDown.delay(400).duration(600)}
          style={styles.titleContainer}
        >
          <Text style={styles.title}>TESFA</Text>
          <Text style={styles.subtitle}>המטבע של הקהילה</Text>
        </Animated.View>
      </View>

      {/* Action Buttons */}
      <Animated.View 
        entering={FadeInUp.delay(600).duration(600)}
        style={styles.actionsContainer}
      >
        <PrimaryButton
          title="הרשמה"
          onPress={() => router.push('/(auth)/register')}
        />
        <SecondaryButton
          title="התחברות"
          onPress={() => router.push('/(auth)/login')}
        />

        {/* Language Selector */}
        <TouchableOpacity style={styles.languageSelector}>
          <MaterialIcons name="expand-more" size={18} color={colors.onSurfaceVariant} />
          <Text style={styles.languageText}>עברית</Text>
          <MaterialIcons name="public" size={20} color={colors.onSurfaceVariant} />
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A1A',
    padding: 24,
  },
  celestialGlow: {
    position: 'absolute',
    top: '-20%',
    left: 0,
    right: 0,
    height: '60%',
    backgroundColor: 'transparent',
    borderRadius: 9999,
    opacity: 0.15,
  },
  bottomGlow: {
    position: 'absolute',
    bottom: '-10%',
    left: '-10%',
    width: '50%',
    height: '50%',
    backgroundColor: colors.secondaryContainer,
    borderRadius: 9999,
    opacity: 0.1,
    transform: [{ scale: 1.5 }],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    color: colors.primary,
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  backButton: {
    opacity: 0, // Hidden on welcome screen
  },
  heroContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  visualContainer: {
    width: 256,
    height: 256,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 48,
  },
  glowCircle: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: colors.primaryContainer,
    borderRadius: 9999,
    opacity: 0.2,
    transform: [{ scale: 1.2 }],
  },
  glassCard: {
    width: 192,
    height: 192,
    borderRadius: 24,
    backgroundColor: `${colors.surfaceContainerHigh}99`,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: `${colors.outlineVariant}1A`,
  },
  iconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primaryContainer,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 40,
  },
  accessoryCard: {
    position: 'absolute',
    bottom: -16,
    right: -16,
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: `${colors.surfaceContainerHighest}CC`,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: `${colors.outlineVariant}33`,
  },
  titleContainer: {
    alignItems: 'center',
    gap: 16,
  },
  title: {
    fontSize: 40,
    fontWeight: '800',
    color: colors.onSurface,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 20,
    color: colors.onSurfaceVariant,
    fontWeight: '500',
  },
  actionsContainer: {
    gap: 16,
    paddingBottom: 32,
  },
  languageSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: `${colors.surfaceContainerLow}80`,
    borderRadius: 9999,
    alignSelf: 'center',
    marginTop: 8,
  },
  languageText: {
    color: colors.onSurfaceVariant,
    fontSize: 14,
    fontWeight: '600',
  },
});
