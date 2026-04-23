import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { colors } from '../../theme/colors';

export default function DeleteSuccessScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Background Decorations */}
      <View style={styles.bgGlow1} />
      <View style={styles.bgGlow2} />

      <View style={styles.content}>
        {/* Success Card */}
        <Animated.View entering={FadeIn.delay(100).duration(600)} style={styles.card}>
          {/* Success Icon */}
          <View style={styles.iconSection}>
            <View style={styles.iconPulse} />
            <View style={styles.iconOuter}>
              <MaterialIcons name="check-circle" size={64} color="#00C896" />
            </View>
          </View>

          {/* Text */}
          <Animated.View entering={FadeInDown.delay(300).duration(400)} style={styles.textSection}>
            <Text style={styles.title}>חשבונך נמחק בהצלחה</Text>
            <Text style={styles.subtitle}>
              צר לנו לראות אותך עוזב. כל המידע שלך הוסר מהמערכת בהתאם לבקשתך.
            </Text>
          </Animated.View>

          {/* Info Card */}
          <Animated.View entering={FadeInDown.delay(500).duration(400)} style={styles.infoCard}>
            <MaterialIcons name="security" size={20} color={colors.onSurfaceVariant} />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>פרטיות וביטחון</Text>
              <Text style={styles.infoText}>נתוניך האישיים נמחקו לצמיתות ולא ניתן יהיה לשחזרם בעתיד.</Text>
            </View>
          </Animated.View>
        </Animated.View>

        {/* Action Button */}
        <Animated.View entering={FadeInDown.delay(700).duration(400)} style={styles.actionSection}>
          <TouchableOpacity onPress={() => router.replace('/(auth)/login')} activeOpacity={0.9}>
            <LinearGradient
              colors={['#7B2FBE', '#9B59F5']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.actionButton}
            >
              <Text style={styles.actionButtonText}>חזרה למסך הפתיחה</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Trust Badges */}
          <View style={styles.badges}>
            <View style={styles.badge} />
            <View style={[styles.badge, styles.badgeSmall]} />
          </View>
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
  bgGlow1: {
    position: 'absolute',
    top: '-10%',
    right: '-10%',
    width: 256,
    height: 256,
    borderRadius: 128,
    backgroundColor: '#7B2FBE',
    opacity: 0.1,
  },
  bgGlow2: {
    position: 'absolute',
    bottom: '-10%',
    left: '-10%',
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: '#9B59F5',
    opacity: 0.1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  card: {
    backgroundColor: 'rgba(18, 18, 42, 0.6)',
    borderRadius: 24,
    padding: 48,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    alignItems: 'center',
  },
  iconSection: {
    position: 'relative',
    marginBottom: 40,
  },
  iconPulse: {
    position: 'absolute',
    width: 144,
    height: 144,
    borderRadius: 72,
    backgroundColor: 'rgba(0, 200, 150, 0.2)',
    top: -24,
    left: -24,
  },
  iconOuter: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: 'rgba(0, 200, 150, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 200, 150, 0.3)',
  },
  textSection: {
    alignItems: 'center',
    marginBottom: 48,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.white,
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: 28,
  },
  infoCard: {
    flexDirection: 'row-reverse',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    padding: 16,
    gap: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    width: '100%',
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.onSurface,
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 4,
  },
  infoText: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
  },
  actionSection: {
    marginTop: 40,
    paddingHorizontal: 24,
  },
  actionButton: {
    height: 64,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(123, 47, 190, 0.5)',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 40,
  },
  actionButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.white,
  },
  badges: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
    marginTop: 32,
    opacity: 0.3,
  },
  badge: {
    width: 60,
    height: 24,
    borderRadius: 4,
    backgroundColor: colors.onSurfaceVariant,
  },
  badgeSmall: {
    width: 48,
    height: 20,
  },
});
