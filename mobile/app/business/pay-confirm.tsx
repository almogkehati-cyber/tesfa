import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { colors } from '../../theme/colors';
import { useWeb3 } from '../../context/Web3Context';

export default function PayConfirmScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ sellerAddress?: string; amountILS?: string; employeeName?: string }>();
  const { payBusinessTx } = useWeb3();
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    if (!params.sellerAddress || !params.amountILS) {
      Alert.alert('שגיאה', 'פרטי התשלום חסרים');
      return;
    }

    setLoading(true);
    try {
      const result = await payBusinessTx(params.sellerAddress, parseInt(params.amountILS));
      
      if (result.success) {
        router.push({
          pathname: '/business/pay-success',
          params: { txHash: result.hash }
        });
      } else {
        Alert.alert('שגיאה', result.error || 'התשלום נכשל');
      }
    } catch (error: any) {
      Alert.alert('שגיאה', error.message || 'התשלום נכשל');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.brandSection}>
          <TouchableOpacity style={styles.headerButton}>
            <MaterialIcons name="account-balance-wallet" size={24} color={colors.primary} />
          </TouchableOpacity>
          <Text style={styles.brandText}>TESFA</Text>
        </View>
        <View style={styles.titleSection}>
          <Text style={styles.headerTitle}>אישור תשלום</Text>
          <TouchableOpacity style={styles.headerButton} onPress={() => router.back()}>
            <MaterialIcons name="arrow-forward" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        {/* Employee Profile */}
        <Animated.View entering={FadeInDown.delay(100).duration(400)} style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <LinearGradient
              colors={colors.gradientPrimary}
              style={styles.avatarGlow}
            />
            <View style={styles.avatarBorder}>
              <Image
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsZVgmHWSBfGwjuffkDn2OKGbilb_lGAiES3BOecs7n2tNnbjjI8PSsfjhecEqrPNGAR7X8zmSev5r9O7rihNfnAeNNLiBp2hCEnYbXq7HCubearZXLx64_FWh88STzqzeoZqADlg84R39AFPscDVqfxjtTMZTWk1757b2-i4eefpispZdWKCgarQUV0LKbTffO_nYvsxMH5xwdYbqNaHhNtfYA55CZMOd88GUQPE82TiIqK4QwcxKjg5174vBc7UqDa-3hFK9Mvg' }}
                style={styles.avatar}
              />
            </View>
          </View>
          <Text style={styles.employeeName}>יונתן רפאלי</Text>
          <Text style={styles.employeeRole}>מנהל צוות פיתוח</Text>
        </Animated.View>

        {/* Payment Details */}
        <Animated.View entering={FadeInDown.delay(200).duration(400)} style={styles.detailsSection}>
          {/* Amount */}
          <View style={styles.amountCard}>
            <View style={styles.amountGlow} />
            <Text style={styles.amountLabel}>סכום לתשלום</Text>
            <View style={styles.amountRow}>
              <Text style={styles.amountValue}>₪12,450</Text>
              <Text style={styles.amountDecimals}>.00</Text>
            </View>
          </View>

          {/* Meta Grid */}
          <View style={styles.metaGrid}>
            <View style={styles.metaCard}>
              <Text style={styles.metaLabel}>תאריך ערך</Text>
              <Text style={styles.metaValue}>10 באוקטובר, 2023</Text>
            </View>
            <View style={styles.metaCard}>
              <Text style={styles.metaLabel}>אמצעי תשלום</Text>
              <View style={styles.metaRow}>
                <MaterialIcons name="credit-card" size={16} color={colors.primary} />
                <Text style={styles.metaValue}>ויזה •••• 8829</Text>
              </View>
            </View>
          </View>

          {/* Description */}
          <View style={styles.descCard}>
            <Text style={styles.metaLabel}>תיאור העברה</Text>
            <Text style={styles.descText}>
              תשלום שכר חודש ספטמבר - כולל החזרי נסיעות ובונוס עמידה ביעדים רבעוניים.
            </Text>
          </View>
        </Animated.View>

        {/* Security Badge */}
        <Animated.View entering={FadeInDown.delay(300).duration(400)} style={styles.securityBadge}>
          <MaterialIcons name="verified-user" size={20} color="#4CAF50" />
          <Text style={styles.securityText}>העברה מאובטחת תחת תקן ה-Celestial Vault</Text>
        </Animated.View>

        {/* Actions */}
        <Animated.View entering={FadeInDown.delay(400).duration(400)} style={styles.actions}>
          <TouchableOpacity onPress={handleConfirm} activeOpacity={0.9} disabled={loading}>
            <LinearGradient
              colors={colors.gradientPrimary}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.confirmButton, loading && { opacity: 0.7 }]}
            >
              <Text style={styles.confirmButtonText}>{loading ? 'מעבד...' : 'אשר תשלום'}</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
            <Text style={styles.cancelButtonText}>ביטול וחזרה</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  brandSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  brandText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
  },
  titleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  headerButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 24,
  },
  avatarGlow: {
    position: 'absolute',
    width: 104,
    height: 104,
    borderRadius: 52,
    opacity: 0.4,
    transform: [{ scale: 1.1 }],
  },
  avatarBorder: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 2,
    borderColor: `${colors.primary}33`,
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  employeeName: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.onSurface,
    marginBottom: 4,
  },
  employeeRole: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
    letterSpacing: 1,
  },
  detailsSection: {
    width: '100%',
    gap: 16,
    marginBottom: 40,
  },
  amountCard: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    overflow: 'hidden',
  },
  amountGlow: {
    position: 'absolute',
    top: -64,
    right: -64,
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: colors.primary,
    opacity: 0.05,
  },
  amountLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
    letterSpacing: 2,
    marginBottom: 8,
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  amountValue: {
    fontSize: 48,
    fontWeight: '800',
    color: colors.onSurface,
  },
  amountDecimals: {
    fontSize: 18,
    color: colors.onSurfaceVariant,
  },
  metaGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  metaCard: {
    flex: 1,
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 16,
    padding: 20,
    gap: 4,
  },
  metaLabel: {
    fontSize: 10,
    color: colors.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  metaValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.onSurface,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  descCard: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 16,
    padding: 20,
    gap: 8,
  },
  descText: {
    fontSize: 14,
    color: colors.onSurface,
    lineHeight: 22,
  },
  securityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: `${colors.surfaceContainerHighest}4D`,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 9999,
    marginBottom: 40,
  },
  securityText: {
    fontSize: 11,
    color: colors.onSurfaceVariant,
    fontWeight: '500',
  },
  actions: {
    width: '100%',
    gap: 16,
  },
  confirmButton: {
    height: 56,
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primaryContainer,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
  },
  confirmButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.white,
  },
  cancelButton: {
    paddingVertical: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
  },
});
