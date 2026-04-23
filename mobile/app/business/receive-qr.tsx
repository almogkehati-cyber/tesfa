import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { colors } from '../../theme/colors';

export default function BusinessReceiveQRScreen() {
  const router = useRouter();

  const handleShare = () => {
    // TODO: Share QR code
  };

  const handleDownload = () => {
    // TODO: Download QR code
  };

  const handleCopy = () => {
    // TODO: Copy address
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.switchButton}>
          <Text style={styles.switchText}>Switch to Personal</Text>
        </TouchableOpacity>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>Business Admin</Text>
          <MaterialIcons name="storefront" size={24} color={colors.primary} />
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Title */}
        <Animated.View entering={FadeInDown.delay(100).duration(400)} style={styles.titleSection}>
          <Text style={styles.title}>קבלת תשלום</Text>
          <Text style={styles.subtitle}>הצג את הקוד ללקוח לסריקה מהירה</Text>
        </Animated.View>

        {/* QR Section */}
        <Animated.View entering={FadeInDown.delay(200).duration(400)} style={styles.qrSection}>
          <View style={styles.qrGlow} />
          <View style={styles.qrCard}>
            <View style={styles.qrContainer}>
              <Image
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCBCUYwHC_QSmKMXmPbTJeRWzRtEgMA_25XFc-t0lDgROztLRfpui9imAFhoNVZIR4gHfkwlgUhHGPnL-9SpDOYRqM_vxULYIJOai1cvYxXJ6dYUTqW7a1tMWGuAXHn4z3UuArzjjyyrqcJcr7PDjEto1Ib-n02p-b6yf63goGMG0J3x3bjimlPNewgkboPBn1aOFLMF9ZC3MqRWLC06qQ7LPPDzyO28rtQPiWUAI5XCw7mv6ZjbyasXwm8fY2ocYTMPRj7GwiwRmQ' }}
                style={styles.qrImage}
              />
              {/* Corner decorations */}
              <View style={[styles.corner, styles.cornerTopLeft]} />
              <View style={[styles.corner, styles.cornerTopRight]} />
              <View style={[styles.corner, styles.cornerBottomLeft]} />
              <View style={[styles.corner, styles.cornerBottomRight]} />
            </View>
            
            {/* Currency Badge */}
            <View style={styles.currencyBadge}>
              <View style={styles.pulseDot} />
              <Text style={styles.currencyText}>TSF NETWORK</Text>
            </View>
          </View>
        </Animated.View>

        {/* Business Details */}
        <Animated.View entering={FadeInDown.delay(300).duration(400)} style={styles.detailsSection}>
          <View style={styles.detailCard}>
            <View style={styles.detailIcon}>
              <MaterialIcons name="apartment" size={24} color={colors.primary} />
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>שם העסק</Text>
              <Text style={styles.detailValue}>בוטיק הקפה של אריאל</Text>
            </View>
          </View>

          <View style={styles.addressCard}>
            <View style={styles.detailIcon}>
              <MaterialIcons name="fingerprint" size={24} color={colors.secondary} />
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>מזהה עסק / כתובת</Text>
              <Text style={styles.addressText}>tsf1_8v3p9q2m5x7z9l0k4j2h6n1r8t0u3y5w</Text>
            </View>
            <TouchableOpacity style={styles.copyButton} onPress={handleCopy}>
              <MaterialIcons name="content-copy" size={20} color={colors.primaryFixed} />
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Actions */}
        <Animated.View entering={FadeInDown.delay(400).duration(400)} style={styles.actionsSection}>
          <TouchableOpacity onPress={handleShare} activeOpacity={0.9} style={styles.shareButtonContainer}>
            <LinearGradient
              colors={colors.gradientPrimary}
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 0 }}
              style={styles.shareButton}
            >
              <MaterialIcons name="share" size={20} color={colors.white} />
              <Text style={styles.shareButtonText}>שתף קוד</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={styles.downloadButton} onPress={handleDownload}>
            <MaterialIcons name="download" size={24} color={colors.onSurface} />
          </TouchableOpacity>
        </Animated.View>

        {/* Info */}
        <Animated.View entering={FadeInDown.delay(500).duration(400)}>
          <Text style={styles.infoText}>
            התשלומים מתקבלים באופן מיידי בארנק הדיגיטלי שלך ומסונכרנים עם מערכת הניהול
          </Text>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.onSurface,
  },
  switchButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 9999,
  },
  switchText: {
    fontSize: 14,
    fontWeight: '500',
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
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.onSurface,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.onSurfaceVariant,
    fontWeight: '500',
  },
  qrSection: {
    alignItems: 'center',
    marginBottom: 32,
    position: 'relative',
  },
  qrGlow: {
    position: 'absolute',
    width: '120%',
    height: '120%',
    backgroundColor: colors.primary,
    opacity: 0.1,
    borderRadius: 9999,
    transform: [{ scale: 1.2 }],
  },
  qrCard: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: `${colors.white}0D`,
  },
  qrContainer: {
    width: 256,
    height: 256,
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    position: 'relative',
  },
  qrImage: {
    width: '100%',
    height: '100%',
  },
  corner: {
    position: 'absolute',
    width: 16,
    height: 16,
    borderColor: colors.primaryContainer,
  },
  cornerTopLeft: {
    top: 8,
    left: 8,
    borderTopWidth: 2,
    borderLeftWidth: 2,
  },
  cornerTopRight: {
    top: 8,
    right: 8,
    borderTopWidth: 2,
    borderRightWidth: 2,
  },
  cornerBottomLeft: {
    bottom: 8,
    left: 8,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
  },
  cornerBottomRight: {
    bottom: 8,
    right: 8,
    borderBottomWidth: 2,
    borderRightWidth: 2,
  },
  currencyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 32,
    backgroundColor: `${colors.primaryContainer}33`,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: `${colors.primary}33`,
  },
  pulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  currencyText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  detailsSection: {
    gap: 16,
    marginBottom: 32,
  },
  detailCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
    backgroundColor: colors.surfaceContainer,
    borderRadius: 16,
    padding: 24,
  },
  addressCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
    backgroundColor: `${colors.surfaceContainerLow}80`,
    borderRadius: 16,
    padding: 24,
  },
  detailIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.surfaceContainerHighest,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.onSurface,
  },
  addressText: {
    fontSize: 14,
    color: colors.onSurface,
    fontFamily: 'monospace',
    lineHeight: 22,
  },
  copyButton: {
    padding: 8,
    borderRadius: 9999,
  },
  actionsSection: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 48,
  },
  shareButtonContainer: {
    flex: 1,
  },
  shareButton: {
    height: 56,
    borderRadius: 9999,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  shareButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.white,
  },
  downloadButton: {
    width: 56,
    height: 56,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: `${colors.outlineVariant}66`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: 22,
    opacity: 0.7,
    maxWidth: 280,
    alignSelf: 'center',
  },
});
