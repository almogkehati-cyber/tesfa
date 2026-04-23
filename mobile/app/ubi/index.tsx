import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Header } from '../../components/ui';
import { colors } from '../../theme/colors';
import { useWeb3 } from '../../context/Web3Context';
import { isBiometricAvailable, verifyForUBI, isEnrolled } from '../../services/biometric';

export default function UBIMainScreen() {
  const router = useRouter();
  const { ubiInfo, claimUBITx, refreshUBIInfo, isLoading, isReady } = useWeb3();
  const [showConfirm, setShowConfirm] = useState(false);
  const [claiming, setClaiming] = useState(false);

  // Refresh UBI info on mount
  useEffect(() => {
    if (isReady) {
      refreshUBIInfo();
    }
  }, [isReady]);

  // Check if UBI pool is empty
  const isPoolEmpty = !ubiInfo || parseFloat(ubiInfo.poolBalance) === 0;

  const handleClaim = () => {
    if (isPoolEmpty) {
      Alert.alert('אין מענק זמין', 'אין UBI זמין כרגע. בצע רכישות כדי להגדיל את המאגר.');
      return;
    }
    setShowConfirm(true);
  };

  const handleConfirmClaim = async () => {
    setClaiming(true);
    try {
      // Check if biometric is available and verify
      const biometricAvailable = await isBiometricAvailable();
      if (biometricAvailable) {
        const verified = await verifyForUBI();
        if (!verified) {
          setShowConfirm(false);
          Alert.alert('אימות נכשל', 'נדרש אימות ביומטרי לקבלת UBI');
          setClaiming(false);
          return;
        }
      }

      const result = await claimUBITx();
      setShowConfirm(false);
      
      if (result.success) {
        Alert.alert(
          'הצלחה!',
          'המענק הועבר לארנק שלך בהצלחה',
          [{ text: 'אישור', onPress: () => router.push('/(tabs)/home') }]
        );
      } else {
        Alert.alert('שגיאה', result.error || 'משיכת המענק נכשלה');
      }
    } catch (error: any) {
      setShowConfirm(false);
      Alert.alert('שגיאה', error.message || 'משיכת המענק נכשלה');
    } finally {
      setClaiming(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header showLogo />

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Page Header */}
        <Animated.View entering={FadeInDown.delay(100).duration(400)} style={styles.pageHeader}>
          <Text style={styles.pageLabel}>UBI</Text>
          <Text style={styles.pageTitle}>מענק קהילתי</Text>
        </Animated.View>

        {/* Main Pool Card */}
        <Animated.View entering={FadeInDown.delay(200).duration(400)} style={styles.poolCard}>
          <View style={styles.poolGlow} />
          <View style={styles.poolContent}>
            <Text style={styles.poolLabel}>מאגר UBI קהילתי</Text>
            <View style={styles.poolAmountRow}>
              <Text style={styles.poolCurrency}>TSF</Text>
              <Text style={styles.poolAmount}>
                {ubiInfo ? parseFloat(ubiInfo.poolBalance).toLocaleString('he-IL', { maximumFractionDigits: 2 }) : '0.00'}
              </Text>
            </View>
            <View style={styles.trendRow}>
              <Text style={styles.trendText}>+12% מהשבוע שעבר</Text>
              <MaterialIcons name="trending-up" size={16} color="#4CAF50" />
            </View>
          </View>
          <View style={styles.poolIconBg}>
            <MaterialIcons name="account-balance-wallet" size={80} color={colors.onSurface} />
          </View>
        </Animated.View>

        {/* Share Card */}
        <Animated.View entering={FadeInDown.delay(300).duration(400)} style={styles.shareCard}>
          <View style={styles.shareHeader}>
            <View style={styles.shareIcon}>
              <MaterialIcons name="eco" size={24} color={colors.secondary} />
            </View>
            <View style={styles.shareInfo}>
              <Text style={styles.shareLabel}>החלק שלך היום</Text>
              <View style={styles.shareAmountRow}>
                <Text style={styles.shareCurrency}>TSF</Text>
                <Text style={styles.shareAmount}>
                  {ubiInfo ? ubiInfo.estimatedShare : '0.00'}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.progressBar}>
            <View style={styles.progressFill} />
          </View>
          <Text style={styles.shareNote}>זמין למשיכה ב-14:00</Text>
        </Animated.View>

        {/* Stats Grid */}
        <Animated.View entering={FadeInDown.delay(400).duration(400)} style={styles.statsGrid}>
          <View style={styles.statImageCard}>
            <Image
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDk_SZyo-NN6BqCrxiU6kuXn6L-AkNMKgH1eHf4bxQvRfBH9iY2d2k8PcYnntGsb78Pp1ewd2xujxRiUeUCf1l0T05eJF_1vZ7Orq-tdyWSonHRFyU-MTf0aeTnZfUtqIzIPvxPqY6YwgTDBVlvLkCV1t4pJOs9DapUyhFkTOxXJKfBGxP2zC42Y-109cxxvDaQCiBPtDCApwk19DwiOnrH4xrVgekC12riqkb1p4hqv584Kt3btb7T9uPffHe6yXNcyGmO_Rl3G7s' }}
              style={styles.statImage}
            />
            <View style={styles.statImageOverlay} />
            <View style={styles.statImageContent}>
              <Text style={styles.statSmallLabel}>משתתפים</Text>
              <Text style={styles.statValue}>
                {ubiInfo ? ubiInfo.totalRegistered.toLocaleString('he-IL') : '0'}
              </Text>
            </View>
          </View>
          <View style={styles.statCard}>
            <MaterialIcons name="verified" size={24} color={colors.primary} />
            <View style={styles.statCardContent}>
              <Text style={styles.statSmallLabel}>סטטוס</Text>
              <Text style={styles.statStatus}>פעיל</Text>
            </View>
          </View>
        </Animated.View>

        {/* Claim Button */}
        <Animated.View entering={FadeInDown.delay(500).duration(400)} style={styles.claimSection}>
          <TouchableOpacity onPress={handleClaim} activeOpacity={0.9}>
            <LinearGradient
              colors={isPoolEmpty ? [colors.onSurfaceVariant, colors.onSurfaceVariant] : colors.gradientPrimary}
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 0 }}
              style={[styles.claimButton, isPoolEmpty && { opacity: 0.5 }]}
            >
              <Text style={styles.claimText}>משוך מענק</Text>
            </LinearGradient>
          </TouchableOpacity>
          <Text style={styles.claimNote}>
            המענק מועבר ישירות לארנק הקהילתי שלך לאחר אימות זהות.
          </Text>
        </Animated.View>
      </ScrollView>

      {/* Confirmation Modal */}
      {showConfirm && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalIcon}>
              <View style={styles.modalIconPulse} />
              <MaterialIcons name="account-balance-wallet" size={40} color={colors.primary} />
            </View>
            <Text style={styles.modalTitle}>אישור משיכת מענק</Text>
            <Text style={styles.modalMessage}>
              האם אתה בטוח שברצונך למשוך{' '}
              <Text style={styles.modalAmount}>{ubiInfo?.estimatedShare || '0'} TSF</Text>
              {' '}לארנק שלך?
            </Text>
            <View style={styles.modalActions}>
              <TouchableOpacity onPress={handleConfirmClaim} activeOpacity={0.9} disabled={claiming}>
                <LinearGradient
                  colors={colors.gradientPrimary}
                  start={{ x: 1, y: 0 }}
                  end={{ x: 0, y: 0 }}
                  style={[styles.modalPrimaryButton, claiming && { opacity: 0.7 }]}
                >
                  <Text style={styles.modalPrimaryText}>{claiming ? 'מעבד...' : 'אשר'}</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.modalSecondaryButton}
                onPress={() => setShowConfirm(false)}
              >
                <Text style={styles.modalSecondaryText}>ביטול</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
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
    paddingBottom: 120,
  },
  pageHeader: {
    marginBottom: 40,
  },
  pageLabel: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
    letterSpacing: 2,
    marginBottom: 4,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.onSurface,
  },
  poolCard: {
    backgroundColor: `${colors.surfaceContainer}B3`,
    borderRadius: 16,
    padding: 32,
    marginBottom: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: `${colors.outlineVariant}1A`,
  },
  poolGlow: {
    position: 'absolute',
    top: -96,
    left: -96,
    width: 256,
    height: 256,
    backgroundColor: colors.primaryContainer,
    opacity: 0.2,
    borderRadius: 9999,
  },
  poolContent: {
    gap: 8,
  },
  poolLabel: {
    fontSize: 10,
    color: colors.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  poolAmountRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  poolAmount: {
    fontSize: 40,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: -1,
  },
  poolCurrency: {
    fontSize: 20,
    fontWeight: '700',
    color: `${colors.primary}B3`,
  },
  trendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 24,
  },
  trendText: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '500',
  },
  poolIconBg: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    padding: 16,
    opacity: 0.1,
  },
  shareCard: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: `${colors.outlineVariant}0D`,
  },
  shareHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  shareIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: `${colors.secondaryContainer}4D`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareInfo: {
    alignItems: 'flex-end',
  },
  shareLabel: {
    fontSize: 10,
    color: colors.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  shareAmountRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
    marginTop: 4,
  },
  shareAmount: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.onSurface,
  },
  shareCurrency: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.onSurfaceVariant,
  },
  progressBar: {
    height: 6,
    backgroundColor: colors.surfaceContainerHighest,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    width: '66%',
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 3,
  },
  shareNote: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
    marginTop: 12,
    textAlign: 'right',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 48,
  },
  statImageCard: {
    flex: 1,
    height: 128,
    borderRadius: 16,
    overflow: 'hidden',
  },
  statImage: {
    width: '100%',
    height: '100%',
    opacity: 0.6,
  },
  statImageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.surfaceContainerLowest,
    opacity: 0.5,
  },
  statImageContent: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    alignItems: 'flex-end',
  },
  statSmallLabel: {
    fontSize: 10,
    color: colors.onSurfaceVariant,
  },
  statValue: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.onSurface,
  },
  statCard: {
    flex: 1,
    height: 128,
    backgroundColor: colors.surfaceContainerHigh,
    borderRadius: 16,
    padding: 16,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: `${colors.outlineVariant}1A`,
  },
  statCardContent: {
    alignItems: 'flex-end',
  },
  statStatus: {
    fontSize: 14,
    fontWeight: '700',
    color: '#4CAF50',
  },
  claimSection: {
    gap: 16,
  },
  claimButton: {
    height: 64,
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primaryContainer,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 30,
  },
  claimText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.onPrimary,
  },
  claimNote: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    paddingHorizontal: 32,
    opacity: 0.6,
  },
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: `${colors.surfaceContainerLowest}CC`,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    zIndex: 100,
  },
  modalCard: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: `${colors.surfaceContainer}99`,
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: `${colors.outlineVariant}1A`,
  },
  modalIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: `${colors.primaryContainer}33`,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalIconPulse: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 40,
    backgroundColor: `${colors.primary}1A`,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.onSurface,
    marginBottom: 12,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 18,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: 40,
    maxWidth: 280,
  },
  modalAmount: {
    color: colors.primary,
    fontWeight: '700',
  },
  modalActions: {
    width: '100%',
    gap: 16,
  },
  modalPrimaryButton: {
    height: 56,
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primaryContainer,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  modalPrimaryText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.onPrimary,
  },
  modalSecondaryButton: {
    height: 56,
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: `${colors.primary}66`,
  },
  modalSecondaryText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
  },
});
