import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { colors } from '../../theme/colors';

export default function SecurityScreen() {
  const router = useRouter();
  const [biometricEnabled, setBiometricEnabled] = useState(true);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton}>
          <MaterialIcons name="settings" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>אבטחה</Text>
        <TouchableOpacity style={styles.headerButton} onPress={() => router.back()}>
          <MaterialIcons name="arrow-forward" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <Animated.View entering={FadeInDown.delay(100).duration(400)} style={styles.heroCard}>
          <LinearGradient
            colors={[colors.primaryContainer, colors.background]}
            style={styles.heroGradient}
          />
          <View style={styles.heroContent}>
            <View style={styles.heroIcon}>
              <MaterialIcons name="verified-user" size={40} color={colors.primary} />
            </View>
            <Text style={styles.heroTitle}>החשבון שלך מוגן</Text>
            <Text style={styles.heroSubtitle}>הגדרות אבטחה מתקדמות לשמירה על הנכסים שלך</Text>
          </View>
        </Animated.View>

        {/* Credentials Section */}
        <Animated.View entering={FadeInDown.delay(200).duration(400)} style={styles.section}>
          <Text style={styles.sectionLabel}>אימות וסיסמאות</Text>
          
          <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
            <MaterialIcons name="chevron-left" size={24} color={colors.onSurfaceVariant} />
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>שינוי סיסמה</Text>
              <Text style={styles.menuSubtitle}>עדכון סיסמת הכניסה הראשית</Text>
            </View>
            <View style={styles.menuIcon}>
              <MaterialIcons name="lock" size={24} color={colors.primary} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
            <MaterialIcons name="chevron-left" size={24} color={colors.onSurfaceVariant} />
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>שינוי PIN</Text>
              <Text style={styles.menuSubtitle}>קוד גישה מהיר לביצוע פעולות</Text>
            </View>
            <View style={styles.menuIcon}>
              <MaterialIcons name="dialpad" size={24} color={colors.primary} />
            </View>
          </TouchableOpacity>
        </Animated.View>

        {/* Biometrics Section */}
        <Animated.View entering={FadeInDown.delay(300).duration(400)} style={styles.section}>
          <Text style={styles.sectionLabel}>גישה מהירה</Text>
          
          <View style={styles.biometricCard}>
            <View style={styles.biometricContent}>
              <Switch
                value={biometricEnabled}
                onValueChange={setBiometricEnabled}
                trackColor={{ false: colors.surfaceVariant, true: colors.primaryContainer }}
                thumbColor={colors.white}
              />
              <View style={styles.menuContent}>
                <Text style={styles.menuTitle}>זיהוי ביומטרי</Text>
                <Text style={styles.menuSubtitle}>שימוש בטביעת אצבע או זיהוי פנים</Text>
              </View>
              <View style={[styles.menuIcon, styles.biometricIcon]}>
                <MaterialIcons name="fingerprint" size={24} color={colors.primary} />
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Backup Section */}
        <Animated.View entering={FadeInDown.delay(400).duration(400)} style={styles.backupCard}>
          <View style={styles.backupHeader}>
            <View style={styles.criticalBadge}>
              <Text style={styles.criticalText}>קריטי</Text>
            </View>
            <View style={styles.backupIcon}>
              <MaterialIcons name="vpn-key" size={24} color={colors.tertiary} />
            </View>
          </View>
          <Text style={styles.backupTitle}>גיבוי ארנק (Seed Phrase)</Text>
          <Text style={styles.backupDescription}>
            ביטוי השחזור שלך הוא המפתח היחיד לארנק שלך במקרה של אובדן גישה למכשיר. לעולם אל תשתף אותו עם איש.
          </Text>
          <TouchableOpacity activeOpacity={0.9}>
            <LinearGradient
              colors={colors.gradientPrimary}
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 0 }}
              style={styles.backupButton}
            >
              <MaterialIcons name="visibility" size={20} color={colors.white} />
              <Text style={styles.backupButtonText}>הצג ביטוי שחזור</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A1A',
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 120,
  },
  heroCard: {
    borderRadius: 16,
    backgroundColor: colors.surfaceContainerLow,
    padding: 32,
    marginBottom: 32,
    overflow: 'hidden',
    alignItems: 'center',
  },
  heroGradient: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.2,
  },
  heroContent: {
    alignItems: 'center',
  },
  heroIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: `${colors.primaryContainer}4D`,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.onSurface,
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
  },
  section: {
    marginBottom: 32,
    gap: 12,
  },
  sectionLabel: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: 2,
    paddingHorizontal: 8,
    marginBottom: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainer,
    borderRadius: 16,
    padding: 20,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surfaceVariant,
    justifyContent: 'center',
    alignItems: 'center',
  },
  biometricIcon: {
    backgroundColor: `${colors.primaryContainer}33`,
  },
  menuContent: {
    flex: 1,
    marginRight: 16,
    alignItems: 'flex-end',
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.onSurface,
  },
  menuSubtitle: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
  },
  biometricCard: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 16,
    overflow: 'hidden',
  },
  biometricContent: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainer,
    padding: 20,
  },
  backupCard: {
    backgroundColor: colors.surfaceContainerHigh,
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: `${colors.outlineVariant}1A`,
  },
  backupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  backupIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: `${colors.tertiaryContainer}33`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  criticalBadge: {
    backgroundColor: `${colors.errorContainer}33`,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 9999,
  },
  criticalText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.error,
    textTransform: 'uppercase',
  },
  backupTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: 8,
  },
  backupDescription: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
    lineHeight: 22,
    marginBottom: 24,
  },
  backupButton: {
    height: 56,
    borderRadius: 9999,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: colors.primaryContainer,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
  },
  backupButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.white,
  },
});
