import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { colors } from '../../theme/colors';

export default function RefundSuccessScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const amount = params.amount?.toString() || '1240';
  const customerName = params.name?.toString() || 'אלכסנדר לוי';
  const txId = params.txId?.toString() || 'TRX-99281';

  const formattedAmount = parseFloat(amount).toLocaleString('he-IL', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.closeButton} onPress={() => router.replace('/business/admin')}>
            <MaterialIcons name="close" size={24} color={colors.onSurfaceVariant} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>זיכוי הושלם</Text>
        </View>
        <Text style={styles.logo}>TESFA</Text>
      </View>

      <View style={styles.content}>
        {/* Success Icon */}
        <Animated.View entering={FadeIn.delay(100).duration(600)} style={styles.successSection}>
          <View style={styles.successGlow} />
          <View style={styles.successIconOuter}>
            <MaterialIcons name="check-circle" size={72} color="#4CAF50" />
          </View>
        </Animated.View>

        {/* Success Message */}
        <Animated.View entering={FadeInDown.delay(300).duration(400)} style={styles.messageSection}>
          <Text style={styles.successTitle}>הלקוח זוכה בהצלחה!</Text>
          <Text style={styles.successSubtitle}>הסכום הועבר בהצלחה לחשבון הלקוח.</Text>
        </Animated.View>

        {/* Details Card */}
        <Animated.View entering={FadeInDown.delay(500).duration(400)} style={styles.detailsCard}>
          <View style={styles.decorativeGlow} />
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>סכום הזיכוי</Text>
            <Text style={styles.detailAmount}>₪{formattedAmount}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>שם הלקוח</Text>
            <Text style={styles.detailValue}>{customerName}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>מספר פעולה</Text>
            <Text style={styles.detailMono}>#{txId}</Text>
          </View>
        </Animated.View>

        {/* Security Badge */}
        <Animated.View entering={FadeInDown.delay(700).duration(400)} style={styles.securitySection}>
          <Image
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmCmTS-Ozk8C4mzNpcxIc9-Pw9aPR7WIIK0AsiOyonJZqz_eoQ1KDOSjjyPBTAdpHgkRQG02boFjQWZm5yuqAhQEGNubj8MwvKEf4yrTIdzNS08VUqWDOQtXj6KoVrioXiy_DUzIo7T3jL4LUaK-bzzVLTXTNbv-g8J5FIVrHvLNVWk4Yklhb0UyRs3Lm_XD34ouLKpBo5jJWuInpVoo4Pnx3eIySYXO9w76GE0AV4YM-WoP27InX5ySpRFFbHXNHAHvtaDxqWv7E' }}
            style={styles.backgroundImage}
          />
          <View style={styles.backgroundOverlay} />
          <View style={styles.securityBadge}>
            <MaterialIcons name="verified-user" size={16} color="#A855F7" />
            <Text style={styles.securityText}>העסקה מאובטחת ומבוקרת</Text>
          </View>
        </Animated.View>

        {/* Action Button */}
        <Animated.View entering={FadeInDown.delay(900).duration(400)} style={styles.actionSection}>
          <TouchableOpacity onPress={() => router.replace('/business/admin')} activeOpacity={0.9}>
            <LinearGradient
              colors={['#9333EA', '#A855F7']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.actionButton}
            >
              <Text style={styles.actionButtonText}>חזרה לדף הבית</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A1A',
  },
  header: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  headerLeft: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 12,
  },
  closeButton: {
    padding: 8,
    borderRadius: 9999,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.onSurface,
  },
  logo: {
    fontSize: 20,
    fontWeight: '900',
    color: '#A855F7',
    letterSpacing: -1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successSection: {
    position: 'relative',
    marginBottom: 32,
  },
  successGlow: {
    position: 'absolute',
    width: 192,
    height: 192,
    borderRadius: 96,
    backgroundColor: 'rgba(76, 175, 80, 0.15)',
    top: -48,
    left: -48,
  },
  successIconOuter: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    borderWidth: 4,
    borderColor: 'rgba(76, 175, 80, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 12,
  },
  successSubtitle: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    maxWidth: 280,
  },
  detailsCard: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    overflow: 'hidden',
  },
  decorativeGlow: {
    position: 'absolute',
    top: -48,
    right: -48,
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: 'rgba(168, 85, 247, 0.05)',
  },
  detailRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  detailLabel: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
  },
  detailAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.white,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.white,
  },
  detailMono: {
    fontSize: 12,
    fontFamily: 'monospace',
    color: 'rgba(255,255,255,0.8)',
  },
  securitySection: {
    width: '100%',
    maxWidth: 360,
    height: 128,
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 24,
    position: 'relative',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    opacity: 0.4,
  },
  backgroundOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'linear-gradient(to top, #0A0A1A, transparent)',
  },
  securityBadge: {
    position: 'absolute',
    bottom: 12,
    left: 16,
    right: 16,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 8,
  },
  securityText: {
    fontSize: 10,
    fontWeight: '500',
    color: colors.onSurfaceVariant,
  },
  actionSection: {
    width: '100%',
    maxWidth: 360,
    marginTop: 40,
  },
  actionButton: {
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(168, 85, 247, 0.2)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 20,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.white,
  },
});
