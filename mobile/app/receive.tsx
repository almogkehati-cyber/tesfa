import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Header } from '../components/ui';
import { colors } from '../theme/colors';

export default function ReceiveScreen() {
  const walletAddress = 'tsf_1a2b3c4d5e...';

  const handleCopy = () => {
    // TODO: Copy to clipboard
  };

  const handleShare = () => {
    // TODO: Share QR code
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="קבלת TSF" showLogo />

      <View style={styles.content}>
        {/* Header */}
        <Animated.View entering={FadeInDown.delay(100).duration(400)} style={styles.headerSection}>
          <Text style={styles.title}>קבלת TSF</Text>
          <Text style={styles.subtitle}>
            שתף את הכתובת שלך או את קוד ה-QR כדי לקבל תשלומים בתוך קהילת TESFA.
          </Text>
        </Animated.View>

        {/* QR Card */}
        <Animated.View entering={FadeInDown.delay(200).duration(400)} style={styles.qrCard}>
          <View style={styles.qrGlowTop} />
          <View style={styles.qrGlowBottom} />
          
          <View style={styles.qrContainer}>
            <View style={styles.qrWrapper}>
              <Image
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0wWS_UGAyCYDRCk_b2EOsFCJlDU3lbNF8HBWjCmSBTyfV4j3H-aLdfl60IJV-KMmR-Y_tdhpv8DxTUbSn4zucC2ZFz63PbGeUYgMLVyFKUfwNa26F0KM_ILat0aXtg96gURJ8hq4u52t1X5RPsJEqFe17mn6oajTo8c9gGSHTJwYqUhzSK6ayuDvOkoLAVNzWITi8rtvhxzhwdNZrSW_PUwwOm4yPPft_I7FP_OR0MOBOchoERdV5c1hU1syItnCQOLk1eGCMUg8' }}
                style={styles.qrImage}
              />
              {/* Center Logo */}
              <View style={styles.qrLogo}>
                <View style={styles.qrLogoBg}>
                  <Text style={styles.qrLogoText}>T</Text>
                </View>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Wallet Address */}
        <Animated.View entering={FadeInDown.delay(300).duration(400)} style={styles.addressCard}>
          <Text style={styles.addressLabel}>כתובת הארנק שלך</Text>
          <Text style={styles.addressText}>{walletAddress}</Text>
        </Animated.View>

        {/* Action Buttons */}
        <Animated.View entering={FadeInDown.delay(400).duration(400)} style={styles.actionsRow}>
          <TouchableOpacity onPress={handleCopy} activeOpacity={0.9} style={styles.actionButtonWrapper}>
            <LinearGradient
              colors={colors.gradientPrimary}
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 0 }}
              style={styles.primaryAction}
            >
              <MaterialIcons name="content-copy" size={20} color={colors.onPrimary} />
              <Text style={styles.primaryActionText}>העתק</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleShare} style={styles.secondaryAction} activeOpacity={0.8}>
            <MaterialIcons name="share" size={20} color={colors.primary} />
            <Text style={styles.secondaryActionText}>שתף קוד</Text>
          </TouchableOpacity>
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
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  headerSection: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: 8,
    textAlign: 'right',
  },
  subtitle: {
    fontSize: 16,
    color: colors.onSurfaceVariant,
    lineHeight: 24,
    textAlign: 'right',
  },
  qrCard: {
    aspectRatio: 1,
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 16,
    padding: 32,
    marginBottom: 40,
    overflow: 'hidden',
  },
  qrGlowTop: {
    position: 'absolute',
    top: -96,
    right: -96,
    width: 256,
    height: 256,
    backgroundColor: colors.primary,
    opacity: 0.1,
    borderRadius: 9999,
  },
  qrGlowBottom: {
    position: 'absolute',
    bottom: -96,
    left: -96,
    width: 256,
    height: 256,
    backgroundColor: colors.secondary,
    opacity: 0.1,
    borderRadius: 9999,
  },
  qrContainer: {
    flex: 1,
    backgroundColor: colors.surfaceContainerHighest,
    borderRadius: 16,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.08,
    shadowRadius: 40,
  },
  qrWrapper: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 16,
    position: 'relative',
  },
  qrImage: {
    width: '100%',
    height: '100%',
  },
  qrLogo: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -16 }, { translateY: -16 }],
    backgroundColor: colors.white,
    padding: 4,
    borderRadius: 4,
  },
  qrLogoBg: {
    width: 24,
    height: 24,
    backgroundColor: colors.primary,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrLogoText: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.onPrimary,
  },
  addressCard: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: `${colors.outlineVariant}1A`,
    alignItems: 'center',
  },
  addressLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 8,
  },
  addressText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.onSurface,
    fontFamily: 'monospace',
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 16,
  },
  actionButtonWrapper: {
    flex: 1,
  },
  primaryAction: {
    height: 56,
    borderRadius: 9999,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    shadowColor: colors.primaryContainer,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
  },
  primaryActionText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.onPrimary,
  },
  secondaryAction: {
    flex: 1,
    height: 56,
    borderRadius: 9999,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: `${colors.primary}66`,
    backgroundColor: `${colors.primary}0D`,
  },
  secondaryActionText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
  },
});
