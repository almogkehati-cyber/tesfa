import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { colors } from '../../theme/colors';

const seedWords = [
  'ocean', 'valley', 'spirit', 'gravity', 'anchor', 'bridge',
  'timber', 'flame', 'galaxy', 'canyon', 'frost', 'echo'
];

export default function SeedPhraseScreen() {
  const router = useRouter();

  const handleComplete = () => {
    router.back();
  };

  const handleCopy = () => {
    // TODO: Copy to clipboard
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.spacer} />
        <Text style={styles.headerTitle}>גיבוי ארנק</Text>
        <TouchableOpacity style={styles.headerButton} onPress={() => router.back()}>
          <MaterialIcons name="arrow-forward" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Intro */}
        <Animated.View entering={FadeInDown.delay(100).duration(400)} style={styles.intro}>
          <Text style={styles.introTitle}>הביטוי הסודי שלך</Text>
          <Text style={styles.introText}>
            רשום את 12 המילים האלו במקום בטוח. הן הדרך היחידה לשחזר את הגישה לכספים שלך.
          </Text>
        </Animated.View>

        {/* Warning Card */}
        <Animated.View entering={FadeInDown.delay(200).duration(400)} style={styles.warningCard}>
          <View style={styles.warningIcon}>
            <MaterialIcons name="warning" size={24} color={colors.error} />
          </View>
          <View style={styles.warningContent}>
            <Text style={styles.warningTitle}>זהירות</Text>
            <Text style={styles.warningText}>
              לעולם אל תשתף את המילים האלו עם אף אחד! מי שמחזיק במילים אלו מחזיק בכסף שלך.
            </Text>
          </View>
        </Animated.View>

        {/* Seed Phrase Grid */}
        <Animated.View entering={FadeInDown.delay(300).duration(400)} style={styles.seedGrid}>
          {seedWords.map((word, index) => (
            <View key={index} style={styles.seedWord}>
              <Text style={styles.seedWordText}>{word}</Text>
              <Text style={styles.seedWordIndex}>{String(index + 1).padStart(2, '0')}</Text>
            </View>
          ))}
        </Animated.View>

        {/* Decorative Image */}
        <Animated.View entering={FadeInDown.delay(400).duration(400)} style={styles.imageContainer}>
          <Image
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBsF_sOtlmblIJpZk2WTPKnCCV-nLrphuZ4xlYyAYjG_8kIi3GOfO-0YFk4SNNVWSUaHWC1hmw6hy17jAuThhxrSBm-liFMK9sMjL4Yi0zp0jWmV4T51phDtN664s065aq8gVrQXw2tpsMX4XhidQXvGkibFmo8Oq4rxoyMkMdDB7H_Ni6_oHubWXL57POPymmRGkxKDgSwr43ge6RvuJvVw3cfw-EHh5L1PiKu5q4JOpO1vwJo4AD_Q1vlhBPhkFkSIDG9G9l4HKI' }}
            style={styles.decorImage}
          />
          <LinearGradient
            colors={['transparent', colors.surface]}
            style={styles.imageGradient}
          />
        </Animated.View>

        {/* Actions */}
        <Animated.View entering={FadeInDown.delay(500).duration(400)} style={styles.actions}>
          <TouchableOpacity onPress={handleComplete} activeOpacity={0.9}>
            <LinearGradient
              colors={colors.gradientPrimary}
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 0 }}
              style={styles.primaryButton}
            >
              <Text style={styles.primaryButtonText}>סיימתי, המילים שמורות</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton} onPress={handleCopy}>
            <Text style={styles.secondaryButtonText}>העתק ביטוי ללוח</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surfaceContainerLowest,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    height: 64,
  },
  headerButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.onSurface,
  },
  spacer: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  intro: {
    marginBottom: 32,
    gap: 8,
  },
  introTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.onSurface,
  },
  introText: {
    fontSize: 16,
    color: colors.onSurfaceVariant,
    lineHeight: 24,
  },
  warningCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
    backgroundColor: `${colors.errorContainer}33`,
    borderRadius: 16,
    padding: 20,
    marginBottom: 40,
    borderWidth: 1,
    borderColor: `${colors.error}1A`,
  },
  warningIcon: {
    backgroundColor: `${colors.error}1A`,
    padding: 8,
    borderRadius: 9999,
  },
  warningContent: {
    flex: 1,
  },
  warningTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.error,
    marginBottom: 4,
  },
  warningText: {
    fontSize: 14,
    color: colors.onErrorContainer,
    fontWeight: '500',
    lineHeight: 22,
  },
  seedGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 48,
  },
  seedWord: {
    width: '47%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainer,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: `${colors.outlineVariant}1A`,
  },
  seedWordText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.onSurface,
  },
  seedWordIndex: {
    fontSize: 12,
    color: `${colors.primary}66`,
  },
  imageContainer: {
    height: 160,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 48,
  },
  decorImage: {
    width: '100%',
    height: '100%',
    opacity: 0.4,
  },
  imageGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
  },
  actions: {
    gap: 16,
  },
  primaryButton: {
    height: 64,
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primaryContainer,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 30,
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.white,
  },
  secondaryButton: {
    height: 56,
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: `${colors.primary}66`,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
});
