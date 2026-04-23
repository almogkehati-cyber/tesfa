import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Image, Share, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import Animated, { FadeIn, SlideInUp } from 'react-native-reanimated';
import { colors } from '../theme/colors';

interface InviteModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function InviteModal({ visible, onClose }: InviteModalProps) {
  const inviteLink = 'https://tesfa.app/invite/abc123';
  const inviteMessage = 'הצטרף/י לקהילת TESFA - המטבע הדיגיטלי של הקהילה! 🚀\n\n' + inviteLink;

  const handleWhatsAppShare = async () => {
    const whatsappUrl = `whatsapp://send?text=${encodeURIComponent(inviteMessage)}`;
    try {
      await Linking.openURL(whatsappUrl);
    } catch {
      await Share.share({ message: inviteMessage });
    }
  };

  const handleSMSShare = async () => {
    const smsUrl = `sms:?body=${encodeURIComponent(inviteMessage)}`;
    try {
      await Linking.openURL(smsUrl);
    } catch {
      await Share.share({ message: inviteMessage });
    }
  };

  const handleCopyLink = async () => {
    await Share.share({ message: inviteLink });
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <BlurView intensity={40} style={styles.backdrop} tint="dark">
        <TouchableOpacity style={styles.backdropTouch} onPress={onClose} activeOpacity={1}>
          <Animated.View 
            entering={SlideInUp.springify().damping(15)}
            style={styles.modalContainer}
          >
            <TouchableOpacity activeOpacity={1}>
              {/* Close Button */}
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <MaterialIcons name="close" size={24} color={colors.onSurfaceVariant} />
              </TouchableOpacity>

              {/* Hero Image */}
              <View style={styles.heroContainer}>
                <View style={styles.celestialGlow} />
                <View style={styles.heroImageWrapper}>
                  <Image
                    source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQtU4Z0P1jsG2gzEU7WNKfPOwFQIe8wEIpIPw3X40VEM_ZnSVvthLwkiNIVdhyNq5bU2FgxVQjv0BSDhAX1hKQ8HQG2e6dNtJcAem56_e1o3vLk8zoZzBVflXg67fxFxoN11j2HNswf9znT7rGcCq6Ijwo9bhu86VnCUJN0nXizeKb3BomK1NRAZ3HZq9kmAE2XlFvE7vi77HM7G3ZQqlT0uLHsUOGbW5taW43qJ9oweuINQfnF6EZX-YUOwGa1DQZjGdqxL_wCBc' }}
                    style={styles.heroImage}
                  />
                  <LinearGradient
                    colors={['transparent', '#0A0A1A']}
                    style={styles.heroGradient}
                  />
                </View>
              </View>

              {/* Headline */}
              <View style={styles.headlineContainer}>
                <Text style={styles.headline}>הזמן חברים ל-TESFA</Text>
                <Text style={styles.subheadline}>
                  שתף את העתיד הפיננסי עם הקהילה שלך וצמחו יחד בתוך הכספת הדיגיטלית.
                </Text>
              </View>

              {/* Action Buttons */}
              <View style={styles.actionsContainer}>
                {/* WhatsApp */}
                <TouchableOpacity onPress={handleWhatsAppShare} activeOpacity={0.9}>
                  <LinearGradient
                    colors={['#7B2FBE', '#6107BA']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.primaryButton}
                  >
                    <View style={styles.primaryButtonContent}>
                      <MaterialIcons name="share" size={24} color={colors.white} />
                      <Text style={styles.primaryButtonText}>שתף ב-WhatsApp</Text>
                    </View>
                    <MaterialIcons name="arrow-back-ios" size={16} color={`${colors.white}99`} />
                  </LinearGradient>
                </TouchableOpacity>

                {/* SMS */}
                <TouchableOpacity style={styles.secondaryButton} onPress={handleSMSShare} activeOpacity={0.8}>
                  <MaterialIcons name="sms" size={24} color={colors.primary} />
                  <Text style={styles.secondaryButtonText}>שלח ב-SMS</Text>
                </TouchableOpacity>

                {/* Copy Link */}
                <TouchableOpacity style={styles.secondaryButton} onPress={handleCopyLink} activeOpacity={0.8}>
                  <MaterialIcons name="content-copy" size={24} color={colors.primary} />
                  <Text style={styles.secondaryButtonText}>העתק קישור</Text>
                </TouchableOpacity>
              </View>

              {/* Social Proof */}
              <View style={styles.socialProof}>
                <View style={styles.avatarStack}>
                  <View style={[styles.avatar, { zIndex: 3 }]}>
                    <MaterialIcons name="person" size={16} color={colors.onSurfaceVariant} />
                  </View>
                  <View style={[styles.avatar, { marginEnd: -12, zIndex: 2 }]}>
                    <MaterialIcons name="person" size={16} color={colors.onSurfaceVariant} />
                  </View>
                  <View style={[styles.avatar, { marginEnd: -12, zIndex: 1 }]}>
                    <MaterialIcons name="person" size={16} color={colors.onSurfaceVariant} />
                  </View>
                </View>
                <Text style={styles.socialProofLabel}>מצטרפים חדשים בקהילה</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
        </TouchableOpacity>
      </BlurView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdropTouch: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContainer: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#0A0A1A',
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: `${colors.outlineVariant}33`,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: `${colors.surfaceContainer}CC`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroContainer: {
    width: '100%',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  celestialGlow: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: colors.primary,
    opacity: 0.1,
  },
  heroImageWrapper: {
    width: '80%',
    height: '100%',
    borderRadius: 16,
    overflow: 'hidden',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    opacity: 0.8,
  },
  heroGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
  },
  headlineContainer: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 24,
    alignItems: 'center',
  },
  headline: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.onSurface,
    textAlign: 'center',
    marginBottom: 12,
  },
  subheadline: {
    fontSize: 16,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: 24,
  },
  actionsContainer: {
    paddingHorizontal: 24,
    gap: 12,
  },
  primaryButton: {
    height: 64,
    borderRadius: 32,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  primaryButtonContent: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 16,
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.white,
  },
  secondaryButton: {
    height: 56,
    borderRadius: 28,
    backgroundColor: `${colors.surfaceContainer}99`,
    borderWidth: 1,
    borderColor: `${colors.primary}33`,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    paddingHorizontal: 24,
    gap: 16,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.onSurface,
  },
  socialProof: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
    gap: 12,
  },
  avatarStack: {
    flexDirection: 'row-reverse',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surfaceContainerHighest,
    borderWidth: 2,
    borderColor: '#0A0A1A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialProofLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
