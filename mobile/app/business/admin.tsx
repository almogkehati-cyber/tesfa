import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { colors } from '../../theme/colors';

const recentTransactions = [
  { id: '8842', amount: 240, time: 'לפני 5 דקות' },
  { id: '8841', amount: 1100, time: 'לפני 12 דקות' },
];

export default function BusinessAdminScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.switchButton}>
            <Text style={styles.switchText}>Switch to Personal</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.settingsButton} 
            onPress={() => router.push('/business/settings')}
          >
            <MaterialIcons name="settings" size={24} color={colors.onSurfaceVariant} />
          </TouchableOpacity>
        </View>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>Business Admin</Text>
          <View style={styles.headerIcon}>
            <MaterialIcons name="storefront" size={24} color={colors.primary} />
          </View>
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Title */}
        <Animated.View entering={FadeInDown.delay(100).duration(400)} style={styles.titleSection}>
          <Text style={styles.title}>ניהול עסק</Text>
          <Text style={styles.subtitle}>מבט על ביצועי העסק להיום</Text>
        </Animated.View>

        {/* Stats Grid */}
        <Animated.View entering={FadeInDown.delay(200).duration(400)} style={styles.statsGrid}>
          <View style={styles.statCard}>
            <MaterialIcons name="payments" size={32} color={colors.primary} />
            <View style={styles.statContent}>
              <Text style={styles.statLabel}>התקבל היום (TSF)</Text>
              <Text style={styles.statValue}>12,450.00</Text>
            </View>
          </View>
          <View style={styles.statCard}>
            <MaterialIcons name="receipt-long" size={32} color={colors.tertiary} />
            <View style={styles.statContent}>
              <Text style={styles.statLabel}>עסקאות היום</Text>
              <Text style={styles.statValue}>42</Text>
            </View>
          </View>
        </Animated.View>

        {/* Main Actions */}
        <Animated.View entering={FadeInDown.delay(300).duration(400)} style={styles.actionsSection}>
          <TouchableOpacity 
            activeOpacity={0.9}
            onPress={() => router.push('/business/receive-qr')}
          >
            <LinearGradient
              colors={colors.gradientPrimary}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.mainAction}
            >
              <View style={styles.mainActionContent}>
                <View style={styles.mainActionIcon}>
                  <MaterialIcons name="qr-code-2" size={32} color={colors.white} />
                </View>
                <View style={styles.mainActionText}>
                  <Text style={styles.mainActionTitle}>קבלת תשלום</Text>
                  <Text style={styles.mainActionSubtitle}>הצג קוד QR לסריקה</Text>
                </View>
              </View>
              <MaterialIcons name="arrow-back" size={24} color={colors.white} />
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.secondaryActions}>
            <TouchableOpacity style={styles.secondaryAction} activeOpacity={0.8}>
              <View style={[styles.secondaryIcon, { backgroundColor: `${colors.primary}1A` }]}>
                <MaterialIcons name="leaderboard" size={24} color={colors.primary} />
              </View>
              <Text style={styles.secondaryTitle}>ביצועים</Text>
              <Text style={styles.secondarySubtitle}>סטטיסטיקה וניתוח</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryAction} activeOpacity={0.8}>
              <View style={[styles.secondaryIcon, { backgroundColor: `${colors.tertiary}1A` }]}>
                <MaterialIcons name="badge" size={24} color={colors.tertiary} />
              </View>
              <Text style={styles.secondaryTitle}>תשלום לעובד</Text>
              <Text style={styles.secondarySubtitle}>שכר ותגמולים</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Recent Activity */}
        <Animated.View entering={FadeInDown.delay(400).duration(400)} style={styles.activitySection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>פעילות אחרונה</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>הכל</Text>
            </TouchableOpacity>
          </View>
          
          {recentTransactions.map((tx) => (
            <View key={tx.id} style={styles.transactionItem}>
              <View style={styles.txLeft}>
                <View style={styles.txIcon}>
                  <MaterialIcons name="add-circle" size={24} color="#4CAF50" />
                </View>
                <View>
                  <Text style={styles.txTitle}>תשלום מלקוח #{tx.id}</Text>
                  <Text style={styles.txTime}>{tx.time}</Text>
                </View>
              </View>
              <View style={styles.txRight}>
                <Text style={styles.txAmount}>+{tx.amount.toFixed(2)}</Text>
                <Text style={styles.txCurrency}>TSF</Text>
              </View>
            </View>
          ))}
        </Animated.View>

        {/* Help Card */}
        <Animated.View entering={FadeInDown.delay(500).duration(400)} style={styles.helpCard}>
          <LinearGradient
            colors={[`${colors.primaryContainer}33`, 'transparent']}
            style={styles.helpGradient}
          />
          <View style={styles.helpContent}>
            <View>
              <Text style={styles.helpTitle}>זקוק לעזרה בניהול?</Text>
              <Text style={styles.helpSubtitle}>עבור למדריך המקיף לעסקים</Text>
            </View>
            <MaterialIcons name="help-center" size={48} color={`${colors.primaryContainer}80`} />
          </View>
        </Animated.View>
      </ScrollView>
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
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surfaceContainerHighest,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surfaceContainerHighest,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.onSurface,
  },
  switchButton: {
    backgroundColor: colors.surfaceContainerHighest,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 9999,
  },
  switchText: {
    fontSize: 14,
    fontWeight: '700',
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
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.onSurface,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 16,
    padding: 20,
    height: 160,
    justifyContent: 'space-between',
  },
  statContent: {
    gap: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
    fontWeight: '500',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.onSurface,
  },
  actionsSection: {
    gap: 16,
    marginBottom: 32,
  },
  mainAction: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 24,
    borderRadius: 16,
  },
  mainActionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  mainActionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainActionText: {
    alignItems: 'flex-end',
  },
  mainActionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.white,
  },
  mainActionSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  secondaryActions: {
    flexDirection: 'row',
    gap: 16,
  },
  secondaryAction: {
    flex: 1,
    backgroundColor: colors.surfaceContainerHigh,
    borderRadius: 16,
    padding: 20,
    alignItems: 'flex-start',
    gap: 16,
  },
  secondaryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.onSurface,
  },
  secondarySubtitle: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
  },
  activitySection: {
    marginBottom: 32,
    gap: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.onSurface,
  },
  seeAll: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.primary,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 16,
    padding: 16,
  },
  txLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  txIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surfaceContainerHighest,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.onSurface,
  },
  txTime: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
  },
  txRight: {
    alignItems: 'flex-start',
  },
  txAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
  },
  txCurrency: {
    fontSize: 10,
    color: colors.onSurfaceVariant,
  },
  helpCard: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 16,
    height: 128,
    overflow: 'hidden',
  },
  helpGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  helpContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
  },
  helpTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.onSurface,
  },
  helpSubtitle: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
  },
});
