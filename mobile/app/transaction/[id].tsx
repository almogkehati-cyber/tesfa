import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { colors } from '../../theme/colors';

export default function TransactionDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.spacer} />
        <Text style={styles.headerTitle}>פרטי פעולה</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialIcons name="arrow-forward" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Status Hero */}
        <Animated.View entering={FadeInDown.delay(100).duration(400)} style={styles.statusHero}>
          <View style={styles.statusIconContainer}>
            <View style={styles.statusGlow} />
            <MaterialIcons name="check-circle" size={48} color="#4CAF50" />
          </View>
          <Text style={styles.statusLabel}>סטטוס פעולה</Text>
          <Text style={styles.statusText}>הושלם בהצלחה</Text>
        </Animated.View>

        {/* Details Grid */}
        <Animated.View entering={FadeInDown.delay(200).duration(400)} style={styles.detailsGrid}>
          {/* Amount Card */}
          <View style={styles.amountCard}>
            <Text style={styles.cardLabel}>סכום</Text>
            <View style={styles.amountRow}>
              <Text style={styles.currency}>TSF</Text>
              <Text style={styles.amount}>150.00</Text>
            </View>
          </View>

          {/* Date Card */}
          <View style={styles.dateCard}>
            <View style={styles.dateHeader}>
              <MaterialIcons name="calendar-today" size={16} color={`${colors.onSurfaceVariant}66`} />
              <Text style={styles.cardLabel}>תאריך</Text>
            </View>
            <Text style={styles.dateText}>24 במאי, 2024</Text>
            <Text style={styles.timeText}>14:32</Text>
          </View>
        </Animated.View>

        {/* Merchant Card */}
        <Animated.View entering={FadeInDown.delay(300).duration(400)} style={styles.merchantCard}>
          <Image
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDyAheqtLBJ5MzE-7VL3WiHcs2XiFZqzMpcnIoEBjHycWE6f7weFIKYUocwLe1bBfDnxhSwhHMC5sv-wHQ8tX0gKi-2XwmHdSQLk-qQp0f2J1AaDm6iSykddMXE7etkVjo0mRxDgtJJmHfcIB-wuuFs8r3elUQlP8OFizyavj3zW2Mjl6DpvwSpMiJhayy-6VNYl6khs2nqJxqeQoIViF7naAPhPf1Bzy7H1vjdd2v3-gypMd1o0JG1H0I0xPqfJWuBALo_XZ8xTt0' }}
            style={styles.merchantImage}
          />
          <View style={styles.merchantInfo}>
            <Text style={styles.merchantName}>קפה אלכימיה</Text>
            <Text style={styles.merchantDesc}>תשלום עבור שירותים/מוצרים</Text>
          </View>
          <MaterialIcons name="verified" size={24} color={colors.primary} />
        </Animated.View>

        {/* Transaction ID */}
        <Animated.View entering={FadeInDown.delay(400).duration(400)} style={styles.txIdCard}>
          <View style={styles.txIdHeader}>
            <TouchableOpacity style={styles.copyButton}>
              <MaterialIcons name="content-copy" size={14} color={colors.primary} />
              <Text style={styles.copyText}>העתק</Text>
            </TouchableOpacity>
            <Text style={styles.cardLabel}>מזהה פעולה</Text>
          </View>
          <Text style={styles.txIdText}>TSF-882-QX99-0122-V8X</Text>
        </Animated.View>

        {/* Metadata */}
        <Animated.View entering={FadeInDown.delay(500).duration(400)} style={styles.metadata}>
          <View style={styles.metaRow}>
            <Text style={styles.metaValue}>ארנק קהילתי (TSF)</Text>
            <Text style={styles.metaLabel}>אמצעי תשלום</Text>
          </View>
          <View style={styles.metaRow}>
            <Text style={styles.metaValue}>0.00 TSF</Text>
            <Text style={styles.metaLabel}>עמלת רשת</Text>
          </View>
          <View style={[styles.metaRow, styles.metaRowLast]}>
            <Text style={styles.metaValue}>150.00 TSF</Text>
            <Text style={styles.metaLabel}>סה"כ נטו</Text>
          </View>
        </Animated.View>
      </ScrollView>

      {/* Bottom Actions */}
      <BlurView intensity={80} tint="dark" style={styles.footer}>
        <TouchableOpacity activeOpacity={0.9}>
          <LinearGradient
            colors={colors.gradientPrimary}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 0 }}
            style={styles.primaryButton}
          >
            <Text style={styles.primaryButtonText}>כתוב ביקורת</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>הורד קבלה (PDF)</Text>
        </TouchableOpacity>
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
  backButton: {
    padding: 8,
  },
  spacer: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 180,
  },
  statusHero: {
    alignItems: 'center',
    marginBottom: 48,
  },
  statusIconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.surfaceContainerHighest,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  statusGlow: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 48,
    backgroundColor: `${colors.primary}1A`,
  },
  statusLabel: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
    fontWeight: '500',
    marginBottom: 8,
  },
  statusText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#4CAF50',
  },
  detailsGrid: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  amountCard: {
    flex: 1,
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 16,
    padding: 24,
    minHeight: 140,
    justifyContent: 'space-between',
  },
  dateCard: {
    flex: 1,
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 16,
    padding: 24,
  },
  cardLabel: {
    fontSize: 10,
    color: colors.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
    marginTop: 16,
  },
  amount: {
    fontSize: 36,
    fontWeight: '800',
    color: colors.onSurface,
  },
  currency: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary,
  },
  dateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  dateText: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.onSurface,
  },
  timeText: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
    marginTop: 4,
  },
  merchantCard: {
    backgroundColor: colors.surfaceContainerHighest,
    borderRadius: 16,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginBottom: 16,
  },
  merchantImage: {
    width: 56,
    height: 56,
    borderRadius: 16,
  },
  merchantInfo: {
    flex: 1,
  },
  merchantName: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.onSurface,
  },
  merchantDesc: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
  },
  txIdCard: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 16,
    padding: 24,
    marginBottom: 40,
  },
  txIdHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  copyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  copyText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
  },
  txIdText: {
    fontSize: 14,
    color: colors.onSurface,
    fontFamily: 'monospace',
    opacity: 0.8,
  },
  metadata: {
    paddingHorizontal: 8,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: `${colors.outlineVariant}1A`,
  },
  metaRowLast: {
    borderBottomWidth: 0,
  },
  metaLabel: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
  },
  metaValue: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.onSurface,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
    gap: 12,
  },
  primaryButton: {
    height: 56,
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primaryContainer,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 32,
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.onPrimary,
  },
  secondaryButton: {
    height: 48,
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: `${colors.primary}33`,
  },
  secondaryButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
  },
});
