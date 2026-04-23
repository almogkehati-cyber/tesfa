import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeIn, FadeInDown, ZoomIn } from 'react-native-reanimated';
import { colors } from '../../theme/colors';

export default function TransferSuccessScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Background Decorations */}
      <View style={styles.confettiPattern} />
      <View style={styles.celestialGlow} />

      <View style={styles.content}>
        {/* Success Icon */}
        <Animated.View 
          entering={ZoomIn.delay(200).duration(600)}
          style={styles.iconContainer}
        >
          <View style={styles.iconGlow} />
          <LinearGradient
            colors={colors.gradientPrimary}
            style={styles.iconCircle}
          >
            <MaterialIcons name="check" size={56} color={colors.surface} />
          </LinearGradient>
          {/* Decorative dots */}
          <View style={[styles.decorDot, styles.decorDotTop]} />
          <View style={[styles.decorDot, styles.decorDotBottom]} />
        </Animated.View>

        {/* Success Message */}
        <Animated.View 
          entering={FadeInDown.delay(400).duration(600)}
          style={styles.messageContainer}
        >
          <Text style={styles.title}>העברה בוצעה בהצלחה!</Text>
          <Text style={styles.subtitle}>הכסף נשלח ויגיע ליעדו בקרוב</Text>
        </Animated.View>

        {/* Transaction Card */}
        <Animated.View 
          entering={FadeInDown.delay(600).duration(600)}
          style={styles.txCard}
        >
          <View style={styles.txCardGlow} />
          <Text style={styles.txLabel}>סכום ההעברה</Text>
          <View style={styles.txAmountRow}>
            <Text style={styles.txCurrency}>TSF</Text>
            <Text style={styles.txAmount}>150.00</Text>
          </View>
          
          {/* Details Grid */}
          <View style={styles.detailsGrid}>
            <View style={styles.detailBox}>
              <Text style={styles.detailLabel}>תאריך</Text>
              <Text style={styles.detailValue}>24 במאי, 2024</Text>
            </View>
            <View style={styles.detailBox}>
              <Text style={styles.detailLabel}>מזהה פעולה</Text>
              <Text style={styles.detailValue}>#TX-88291</Text>
            </View>
          </View>
        </Animated.View>

        {/* Actions */}
        <Animated.View 
          entering={FadeInDown.delay(800).duration(600)}
          style={styles.actionsContainer}
        >
          <TouchableOpacity 
            onPress={() => router.replace('/(tabs)/home')} 
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={colors.gradientPrimary}
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 0 }}
              style={styles.primaryButton}
            >
              <MaterialIcons name="home" size={20} color={colors.onSurface} />
              <Text style={styles.primaryButtonText}>חזרה למסך הבית</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} activeOpacity={0.8}>
            <MaterialIcons name="share" size={20} color={colors.onSurfaceVariant} />
            <Text style={styles.secondaryButtonText}>שיתוף אישור העברה</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Brand */}
        <Animated.View entering={FadeIn.delay(1000).duration(600)}>
          <Text style={styles.brand}>TESFA</Text>
        </Animated.View>
      </View>

      {/* Toast Notification */}
      <Animated.View 
        entering={FadeInDown.delay(1200).duration(400)}
        style={styles.toast}
      >
        <View style={styles.toastIcon}>
          <MaterialIcons name="notifications-active" size={20} color={colors.primary} />
        </View>
        <View style={styles.toastContent}>
          <Text style={styles.toastTitle}>יתרה עודכנה</Text>
          <Text style={styles.toastMessage}>היתרה החדשה שלך היא 2,450 TSF</Text>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  confettiPattern: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.4,
  },
  celestialGlow: {
    position: 'absolute',
    top: '25%',
    left: '50%',
    width: 384,
    height: 384,
    backgroundColor: colors.primaryContainer,
    opacity: 0.1,
    borderRadius: 9999,
    transform: [{ translateX: -192 }, { translateY: -192 }],
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  iconContainer: {
    position: 'relative',
    marginBottom: 48,
  },
  iconGlow: {
    position: 'absolute',
    inset: 0,
    backgroundColor: colors.primary,
    opacity: 0.2,
    borderRadius: 9999,
    transform: [{ scale: 1.5 }],
  },
  iconCircle: {
    width: 112,
    height: 112,
    borderRadius: 56,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primaryContainer,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 50,
  },
  decorDot: {
    position: 'absolute',
    borderRadius: 9999,
  },
  decorDotTop: {
    top: -16,
    right: -16,
    width: 16,
    height: 16,
    backgroundColor: colors.secondary,
    opacity: 0.6,
  },
  decorDotBottom: {
    bottom: 8,
    left: -24,
    width: 24,
    height: 24,
    backgroundColor: colors.tertiary,
    opacity: 0.4,
  },
  messageContainer: {
    alignItems: 'center',
    marginBottom: 48,
    gap: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.onSurface,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
  },
  txCard: {
    width: '100%',
    backgroundColor: colors.surfaceContainer,
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    marginBottom: 48,
    overflow: 'hidden',
  },
  txCardGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
  },
  txLabel: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 8,
  },
  txAmountRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
    marginBottom: 24,
  },
  txAmount: {
    fontSize: 48,
    fontWeight: '800',
    color: colors.primary,
  },
  txCurrency: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.secondary,
  },
  detailsGrid: {
    width: '100%',
    flexDirection: 'row',
    gap: 16,
  },
  detailBox: {
    flex: 1,
    backgroundColor: colors.surfaceContainerLow,
    padding: 16,
    borderRadius: 12,
    gap: 4,
  },
  detailLabel: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.onSurface,
  },
  actionsContainer: {
    width: '100%',
    gap: 16,
  },
  primaryButton: {
    height: 64,
    borderRadius: 9999,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    shadowColor: colors.primaryContainer,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.onSurface,
  },
  secondaryButton: {
    height: 56,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: `${colors.outlineVariant}33`,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.onSurfaceVariant,
  },
  brand: {
    marginTop: 48,
    fontSize: 24,
    fontWeight: '800',
    color: colors.onSurfaceVariant,
    opacity: 0.3,
    letterSpacing: -1,
  },
  toast: {
    position: 'absolute',
    bottom: 32,
    left: 24,
    right: 24,
    backgroundColor: colors.surfaceContainerHighest,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    borderRightWidth: 4,
    borderRightColor: colors.primary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
  },
  toastIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: `${colors.primary}1A`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toastContent: {
    flex: 1,
    alignItems: 'flex-end',
  },
  toastTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.onSurface,
  },
  toastMessage: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
  },
});
