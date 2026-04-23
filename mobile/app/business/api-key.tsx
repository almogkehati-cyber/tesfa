import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Share, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { colors } from '../../theme/colors';

export default function APIKeyScreen() {
  const router = useRouter();
  const [showKey, setShowKey] = useState(false);
  const apiKey = 'tesfa_live_sk_1234567890abcdef';
  const maskedKey = 'tesfa_live_••••••••••••';

  const handleCopy = async () => {
    await Share.share({ message: apiKey });
  };

  const handleRegenerate = () => {
    Alert.alert(
      'ייצור מפתח מחדש',
      'פעולה זו תבטל את המפתח הנוכחי. האם להמשיך?',
      [
        { text: 'ביטול', style: 'cancel' },
        { text: 'אישור', style: 'destructive', onPress: () => {} },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton}>
          <MaterialIcons name="account-balance-wallet" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>מפתח API</Text>
        <TouchableOpacity style={styles.headerButton} onPress={() => router.back()}>
          <MaterialIcons name="arrow-forward" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Title Section */}
        <Animated.View entering={FadeInDown.delay(100).duration(400)} style={styles.titleSection}>
          <Text style={styles.title}>מפתח API</Text>
          <Text style={styles.subtitle}>
            השתמש במפתח זה כדי לחבר את החנות שלך או את המערכות החיצוניות ישירות לארנק TESFA.
          </Text>
        </Animated.View>

        {/* API Key Card */}
        <Animated.View entering={FadeInDown.delay(200).duration(400)}>
          <View style={styles.keyCardOuter}>
            <LinearGradient
              colors={[colors.primaryContainer, colors.secondaryContainer]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.keyCardGlow}
            />
            <View style={styles.keyCard}>
              {/* Status */}
              <View style={styles.keyHeader}>
                <Text style={styles.keyLabel}>Live Production Key</Text>
                <View style={styles.statusBadge}>
                  <View style={styles.statusDot} />
                  <Text style={styles.statusText}>ACTIVE</Text>
                </View>
              </View>

              {/* Key Display */}
              <View style={styles.keyDisplay}>
                <Text style={styles.keyValue}>{showKey ? apiKey : maskedKey}</Text>
                <TouchableOpacity onPress={() => setShowKey(!showKey)}>
                  <MaterialIcons 
                    name={showKey ? 'visibility-off' : 'visibility'} 
                    size={24} 
                    color={`${colors.primaryFixedDim}99`} 
                  />
                </TouchableOpacity>
              </View>

              {/* Copy Button */}
              <TouchableOpacity onPress={handleCopy} activeOpacity={0.9}>
                <LinearGradient
                  colors={['#7B2FBE', '#9B59F5']}
                  start={{ x: 1, y: 0 }}
                  end={{ x: 0, y: 0 }}
                  style={styles.copyButton}
                >
                  <MaterialIcons name="content-copy" size={20} color={colors.white} />
                  <Text style={styles.copyButtonText}>העתק מפתח</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>

        {/* Danger Zone */}
        <Animated.View entering={FadeInDown.delay(300).duration(400)} style={styles.dangerSection}>
          <View style={styles.dangerCard}>
            <View style={styles.dangerHeader}>
              <View style={styles.dangerIconContainer}>
                <MaterialIcons name="warning" size={24} color={colors.error} />
              </View>
              <View style={styles.dangerContent}>
                <Text style={styles.dangerTitle}>אזור סכנה</Text>
                <Text style={styles.dangerText}>
                  ייצור מפתח מחדש יבטל באופן מיידי את המפתח הנוכחי. פעולה זו עלולה להשבית חיבורים קיימים במערכת שלך.
                </Text>
                <TouchableOpacity style={styles.dangerButton} onPress={handleRegenerate}>
                  <Text style={styles.dangerButtonText}>ייצור מפתח מחדש</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Documentation Link */}
        <Animated.View entering={FadeInDown.delay(400).duration(400)}>
          <TouchableOpacity style={styles.docCard} activeOpacity={0.8}>
            <View style={styles.docContent}>
              <View style={styles.docIcon}>
                <MaterialIcons name="menu-book" size={28} color={colors.primary} />
              </View>
              <View style={styles.docText}>
                <Text style={styles.docTitle}>תיעוד API</Text>
                <Text style={styles.docSubtitle}>למד איך להטמיע את TESFA באתר שלך</Text>
              </View>
            </View>
            <MaterialIcons name="chevron-left" size={24} color={colors.onSurfaceVariant} />
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  headerButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 120,
  },
  titleSection: {
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.primary,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    color: colors.onSurfaceVariant,
    lineHeight: 28,
  },
  keyCardOuter: {
    position: 'relative',
    marginBottom: 48,
  },
  keyCardGlow: {
    position: 'absolute',
    top: -4,
    left: -4,
    right: -4,
    bottom: -4,
    borderRadius: 20,
    opacity: 0.2,
  },
  keyCard: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 16,
    padding: 32,
    borderWidth: 1,
    borderColor: `${colors.outlineVariant}1A`,
  },
  keyHeader: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  keyLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  statusBadge: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#4CAF50',
  },
  keyDisplay: {
    backgroundColor: `${colors.surfaceContainerHighest}80`,
    borderRadius: 16,
    padding: 24,
    marginBottom: 32,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: `${colors.primary}0D`,
  },
  keyValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
    fontFamily: 'monospace',
    letterSpacing: 1,
  },
  copyButton: {
    height: 56,
    borderRadius: 9999,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    shadowColor: colors.primaryContainer,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
  },
  copyButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.white,
  },
  dangerSection: {
    marginBottom: 32,
  },
  dangerCard: {
    backgroundColor: `${colors.errorContainer}1A`,
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: `${colors.error}1A`,
  },
  dangerHeader: {
    flexDirection: 'row-reverse',
    gap: 16,
  },
  dangerIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: `${colors.error}33`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dangerContent: {
    flex: 1,
  },
  dangerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.error,
    marginBottom: 4,
    textAlign: 'right',
  },
  dangerText: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
    lineHeight: 22,
    marginBottom: 24,
    textAlign: 'right',
  },
  dangerButton: {
    paddingVertical: 12,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: `${colors.error}66`,
    alignItems: 'center',
  },
  dangerButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.error,
  },
  docCard: {
    backgroundColor: colors.surfaceContainerHigh,
    borderRadius: 16,
    padding: 24,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  docContent: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 16,
  },
  docIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: `${colors.primaryContainer}4D`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  docText: {},
  docTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: 2,
  },
  docSubtitle: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
  },
});
