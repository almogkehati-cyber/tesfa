import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { colors } from '../../theme/colors';

export default function PaySuccessScreen() {
  const router = useRouter();

  const handleDone = () => {
    router.push('/business/admin');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      {/* Background Glow */}
      <View style={styles.bgGlowTop} />
      <View style={styles.bgGlowBottom} />

      <View style={styles.content}>
        {/* Success Icon */}
        <Animated.View entering={FadeIn.delay(100).duration(600)} style={styles.iconSection}>
          <View style={styles.ringOuter} />
          <View style={styles.ringInner} />
          <LinearGradient
            colors={colors.gradientPrimary}
            style={styles.iconContainer}
          >
            <MaterialIcons name="check-circle" size={64} color={colors.white} />
          </LinearGradient>
        </Animated.View>

        {/* Success Text */}
        <Animated.View entering={FadeInDown.delay(300).duration(400)} style={styles.textSection}>
          <Text style={styles.title}>התשלום בוצע</Text>
          <Text style={styles.subtitle}>הכסף הועבר בהצלחה לחשבון העובד</Text>
        </Animated.View>

        {/* Transaction Card */}
        <Animated.View entering={FadeInDown.delay(500).duration(400)} style={styles.card}>
          <View style={styles.cardGlow} />
          
          {/* Amount */}
          <View style={styles.amountSection}>
            <Text style={styles.amountLabel}>סכום שהועבר</Text>
            <Text style={styles.amountValue}>₪12,450.00</Text>
          </View>

          <View style={styles.divider} />

          {/* Recipient */}
          <View style={styles.recipientRow}>
            <View style={styles.recipientInfo}>
              <Text style={styles.recipientLabel}>עובד</Text>
              <Text style={styles.recipientName}>דוד אברהם</Text>
            </View>
            <View style={styles.recipientAvatar}>
              <Image
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBEwQvXkaiOSOtgRlf1hbKhyN0SN4OVboowPJzEIdjp6VbcFSthVMla_yyjPG_BhEgUcFfpDqB2vwVpxFqjTq3JrtgvrTT48TazOAAzYYf9ChTWsKRacL2zTYnyL8Dwnz0YCiWsBoUAe0fpLxMqfw9dSaMuJ5QxgAs24Qw0YlIJcbKZ2R3GmfV_RCjC3SWaXY7zQz0h0DTseGin4UUtZAy5ldALCQofHqm2513HhulernQXAALwaGzrn5b4zo6s3-M5RvtLf-6j8hE' }}
                style={styles.avatarImage}
              />
            </View>
          </View>

          {/* Reference */}
          <View style={styles.referenceRow}>
            <View style={styles.referenceItem}>
              <Text style={styles.referenceLabel}>מספר אישור</Text>
              <Text style={styles.referenceValue}>#TXN-88294-XP</Text>
            </View>
            <View style={[styles.referenceItem, { alignItems: 'flex-start' }]}>
              <Text style={styles.referenceLabel}>תאריך</Text>
              <Text style={styles.referenceValue}>24 במאי, 2024</Text>
            </View>
          </View>
        </Animated.View>

        {/* Actions */}
        <Animated.View entering={FadeInDown.delay(700).duration(400)} style={styles.actions}>
          <TouchableOpacity onPress={handleDone} activeOpacity={0.9}>
            <LinearGradient
              colors={['#7b2fbe', '#9b59f5']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.primaryButton}
            >
              <Text style={styles.primaryButtonText}>חזרה ללוח הבקרה</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>הורד קבלה (PDF)</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>

      {/* Bottom Glow */}
      <View style={styles.bottomGlow} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A1A',
  },
  bgGlowTop: {
    position: 'absolute',
    top: '-10%',
    right: '-10%',
    width: 600,
    height: 600,
    backgroundColor: colors.primaryContainer,
    opacity: 0.15,
    borderRadius: 300,
    transform: [{ scale: 1.5 }],
  },
  bgGlowBottom: {
    position: 'absolute',
    bottom: '-10%',
    left: '-10%',
    width: 400,
    height: 400,
    backgroundColor: colors.primaryContainer,
    opacity: 0.1,
    borderRadius: 200,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconSection: {
    position: 'relative',
    marginBottom: 48,
  },
  ringOuter: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 1,
    borderColor: `${colors.primary}1A`,
    top: -11,
    left: -11,
  },
  ringInner: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 1,
    borderColor: `${colors.primary}0D`,
    top: -26,
    left: -26,
  },
  iconContainer: {
    width: 128,
    height: 128,
    borderRadius: 64,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primaryContainer,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 60,
  },
  textSection: {
    alignItems: 'center',
    marginBottom: 48,
    gap: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.primary,
  },
  subtitle: {
    fontSize: 18,
    color: colors.onSurfaceVariant,
    fontWeight: '500',
    opacity: 0.8,
  },
  card: {
    width: '100%',
    backgroundColor: `${colors.surfaceContainerLow}66`,
    borderRadius: 16,
    padding: 32,
    borderWidth: 1,
    borderColor: `${colors.outlineVariant}1A`,
    marginBottom: 48,
    overflow: 'hidden',
  },
  cardGlow: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 128,
    height: 128,
    backgroundColor: colors.primary,
    opacity: 0.05,
    borderRadius: 64,
    transform: [{ translateX: 40 }, { translateY: -40 }],
  },
  amountSection: {
    alignItems: 'center',
    gap: 4,
  },
  amountLabel: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
    letterSpacing: 2,
  },
  amountValue: {
    fontSize: 48,
    fontWeight: '700',
    color: colors.onSurface,
  },
  divider: {
    height: 1,
    backgroundColor: `${colors.outlineVariant}1A`,
    marginVertical: 24,
  },
  recipientRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  recipientInfo: {
    alignItems: 'flex-end',
  },
  recipientLabel: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  recipientName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.onSurface,
  },
  recipientAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: `${colors.primaryContainer}4D`,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  referenceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  referenceItem: {
    alignItems: 'flex-end',
  },
  referenceLabel: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  referenceValue: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
    fontFamily: 'monospace',
  },
  actions: {
    width: '100%',
    gap: 16,
  },
  primaryButton: {
    height: 56,
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primaryContainer,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 32,
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.white,
  },
  secondaryButton: {
    height: 48,
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  bottomGlow: {
    position: 'absolute',
    bottom: -128,
    left: '50%',
    marginLeft: -400,
    width: 800,
    height: 300,
    backgroundColor: colors.primary,
    opacity: 0.2,
    borderRadius: 9999,
    transform: [{ scaleX: 1.5 }],
  },
});
