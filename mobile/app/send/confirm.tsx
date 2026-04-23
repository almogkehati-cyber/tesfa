import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { colors } from '../../theme/colors';
import { useWeb3 } from '../../context/Web3Context';
import { isBiometricAvailable, verifyForTransaction } from '../../services/biometric';

export default function SendConfirmScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ recipient?: string; amount?: string; note?: string }>();
  const { sendTSF } = useWeb3();
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    if (!params.recipient || !params.amount) {
      Alert.alert('שגיאה', 'פרטי ההעברה חסרים');
      return;
    }

    setLoading(true);
    try {
      // Require biometric for transactions over 100 TSF
      const amount = parseFloat(params.amount);
      if (amount >= 100) {
        const biometricAvailable = await isBiometricAvailable();
        if (biometricAvailable) {
          const verified = await verifyForTransaction();
          if (!verified) {
            Alert.alert('אימות נכשל', 'נדרש אימות ביומטרי להעברות מעל 100 TSF');
            setLoading(false);
            return;
          }
        }
      }

      const result = await sendTSF(params.recipient, params.amount);
      
      if (result.success) {
        router.replace({
          pathname: '/send/success',
          params: { txHash: result.hash }
        });
      } else {
        Alert.alert('שגיאה', result.error || 'ההעברה נכשלה');
      }
    } catch (error: any) {
      Alert.alert('שגיאה', error.message || 'ההעברה נכשלה');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>אישור העברה</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
          <MaterialIcons name="close" size={24} color={colors.onSurfaceVariant} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {/* Recipient */}
        <Animated.View entering={FadeInDown.delay(100).duration(400)} style={styles.recipientSection}>
          <LinearGradient
            colors={colors.gradientPrimary}
            style={styles.avatarGradient}
          >
            <Image
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCpG-UrwnNOK55j_kJXIeWLfqWQi2k9gpTdMEyB7o5ituRJG0I2gIhbh2ZzXCkLZ_Fl4zE_PDnTwlUUjW6R68eHGJ_YnAC6sfPkJMeLSEh8ajbgrRbYtEKaqCYzz0Svi1w2quf7A6HAXLwRVQcKDH-V7ead9L1gbvtTGR4OCLnrMaNK5w0Y6P3s4F6xEsqOpICiS2tw5mWh4Unt9L6CEnn6Nl7r4ZqlHiHjjNBgGs7CN1XacUtLw16t80s0IdXDUW7rMzlDrwT4JCM' }}
              style={styles.avatar}
            />
          </LinearGradient>
          <Text style={styles.recipientName}>יונתן לוי</Text>
          <Text style={styles.recipientEmail}>jonathan.levy@tesfa.io</Text>
        </Animated.View>

        {/* Amount Card */}
        <Animated.View entering={FadeInDown.delay(200).duration(400)} style={styles.amountCard}>
          <View style={styles.amountGlow} />
          <Text style={styles.amountLabel}>סכום ההעברה</Text>
          <View style={styles.amountRow}>
            <Text style={styles.currency}>TSF</Text>
            <Text style={styles.amount}>150.00</Text>
          </View>
        </Animated.View>

        {/* Details */}
        <Animated.View entering={FadeInDown.delay(300).duration(400)} style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.detailValue}>...4920</Text>
            <View style={styles.detailLeft}>
              <View style={styles.detailIcon}>
                <MaterialIcons name="account-balance-wallet" size={20} color={colors.primary} />
              </View>
              <View style={styles.detailInfo}>
                <Text style={styles.detailLabel}>מקור ההעברה</Text>
                <Text style={styles.detailText}>הארנק הראשי שלי</Text>
              </View>
            </View>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.feeSpeed}>מהיר (כ-30 שניות)</Text>
            <View style={styles.detailLeft}>
              <View style={[styles.detailIcon, styles.detailIconTertiary]}>
                <MaterialIcons name="info" size={20} color={colors.tertiary} />
              </View>
              <View style={styles.detailInfo}>
                <Text style={styles.detailLabel}>עמלת רשת</Text>
                <Text style={styles.detailText}>0.15 TSF</Text>
              </View>
            </View>
          </View>

          <View style={[styles.detailRow, styles.totalRow]}>
            <View style={styles.detailLeft}>
              <View style={[styles.detailIcon, styles.detailIconPrimary]}>
                <MaterialIcons name="payments" size={20} color={colors.primary} />
              </View>
              <View style={styles.detailInfo}>
                <Text style={styles.detailLabel}>סה"כ לחיוב</Text>
                <Text style={styles.totalAmount}>150.15 TSF</Text>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Note */}
        <Animated.View entering={FadeInDown.delay(400).duration(400)} style={styles.noteSection}>
          <MaterialIcons name="notes" size={16} color={colors.onSurfaceVariant} />
          <Text style={styles.noteText}>
            הערה: "תשלום עבור שירותי עיצוב גרפי - פרויקט TESFA מרץ"
          </Text>
        </Animated.View>
      </View>

      {/* Footer */}
      <BlurView intensity={80} tint="dark" style={styles.footer}>
        <TouchableOpacity onPress={handleConfirm} activeOpacity={0.9} disabled={loading}>
          <LinearGradient
            colors={colors.gradientPrimary}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 0 }}
            style={[styles.confirmButton, loading && styles.confirmButtonLoading]}
          >
            <Text style={styles.confirmText}>
              {loading ? 'מעבד...' : 'אשר ושלח'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
        <Text style={styles.disclaimer}>
          בלחיצה על "אשר ושלח" הינך מאשר את תנאי השימוש והעברת הכספים.
        </Text>
      </BlurView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
  },
  closeButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  recipientSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  avatarGradient: {
    padding: 4,
    borderRadius: 56,
    marginBottom: 16,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 4,
    borderColor: colors.surface,
  },
  recipientName: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: 4,
  },
  recipientEmail: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
    opacity: 0.8,
  },
  amountCard: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    marginBottom: 32,
    overflow: 'hidden',
  },
  amountGlow: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 128,
    height: 128,
    backgroundColor: colors.primary,
    opacity: 0.1,
    borderRadius: 9999,
    transform: [{ translateX: 64 }, { translateY: -64 }],
  },
  amountLabel: {
    fontSize: 10,
    color: colors.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 8,
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  amount: {
    fontSize: 48,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: -2,
  },
  currency: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.secondary,
  },
  detailsContainer: {
    gap: 16,
  },
  detailRow: {
    backgroundColor: colors.surfaceContainer,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  totalRow: {
    borderWidth: 1,
    borderColor: `${colors.primary}1A`,
  },
  detailLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  detailIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surfaceContainerHighest,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailIconTertiary: {
    backgroundColor: colors.surfaceContainerHighest,
  },
  detailIconPrimary: {
    backgroundColor: `${colors.primary}1A`,
  },
  detailInfo: {
    alignItems: 'flex-end',
  },
  detailLabel: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
  },
  detailText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.onSurface,
  },
  detailValue: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
    opacity: 0.6,
  },
  feeSpeed: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '500',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
  },
  noteSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginTop: 32,
    paddingHorizontal: 8,
  },
  noteText: {
    flex: 1,
    fontSize: 14,
    color: colors.onSurfaceVariant,
    lineHeight: 22,
    textAlign: 'right',
  },
  footer: {
    padding: 24,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
  },
  confirmButton: {
    height: 56,
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  confirmButtonLoading: {
    opacity: 0.7,
  },
  confirmText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.white,
  },
  disclaimer: {
    fontSize: 10,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    opacity: 0.6,
  },
});
