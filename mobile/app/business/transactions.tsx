import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { colors } from '../../theme/colors';

const todayTransactions = [
  { id: '1', name: 'אביטל', phone: '****8824', amount: 150, time: '14:22' },
  { id: '2', name: 'יונתן', phone: '****1092', amount: 320, time: '13:05' },
  { id: '3', name: 'מיכל', phone: '****5567', amount: 85, time: '11:48' },
];

const yesterdayTransactions = [
  { id: '4', name: 'דוד', phone: '****3301', amount: 1100, time: '19:15' },
  { id: '5', name: 'שרה', phone: '****9942', amount: 45.5, time: '17:40' },
  { id: '6', name: 'עידן', phone: '****2218', amount: 290, time: '16:22' },
];

export default function BusinessTransactionsScreen() {
  const router = useRouter();

  const renderTransaction = (tx: typeof todayTransactions[0], index: number, baseDelay: number) => (
    <Animated.View 
      key={tx.id}
      entering={FadeInDown.delay(baseDelay + index * 50).duration(400)}
    >
      <TouchableOpacity style={styles.transactionItem} activeOpacity={0.7}>
        <View style={styles.txLeft}>
          <View style={[styles.txIcon, { backgroundColor: `${colors.primaryContainer}33` }]}>
            <MaterialIcons name="person" size={24} color={colors.primary} />
          </View>
          <View>
            <Text style={styles.txName}>{tx.name}</Text>
            <Text style={styles.txPhone}>נייד: {tx.phone}</Text>
          </View>
        </View>
        <View style={styles.txRight}>
          <Text style={styles.txAmount}>₪{tx.amount.toFixed(2)}+</Text>
          <Text style={styles.txTime}>{tx.time}</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.switchButton}>
          <Text style={styles.switchText}>Switch to Personal</Text>
        </TouchableOpacity>
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
          <Text style={styles.title}>עסקאות אחרונות</Text>
          <Text style={styles.subtitle}>מעקב אחר תשלומים נכנסים מלקוחות</Text>
        </Animated.View>

        {/* Stats */}
        <Animated.View entering={FadeInDown.delay(150).duration(400)} style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>סה"כ היום</Text>
            <Text style={[styles.statValue, { color: colors.primary }]}>₪4,250</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>עסקאות</Text>
            <Text style={[styles.statValue, { color: colors.secondary }]}>28</Text>
          </View>
        </Animated.View>

        {/* Today's Transactions */}
        <View style={styles.transactionGroup}>
          <View style={styles.groupHeader}>
            <MaterialIcons name="calendar-today" size={16} color={colors.onSurfaceVariant} />
            <Text style={styles.groupDate}>היום, 24 באוקטובר</Text>
          </View>
          {todayTransactions.map((tx, i) => renderTransaction(tx, i, 200))}
        </View>

        {/* Yesterday's Transactions */}
        <View style={styles.transactionGroup}>
          <View style={styles.groupHeader}>
            <Text style={styles.groupDate}>אתמול, 23 באוקטובר</Text>
          </View>
          {yesterdayTransactions.map((tx, i) => renderTransaction(tx, i, 400))}
        </View>
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
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerIcon: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: `${colors.primaryContainer}33`,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.onSurface,
  },
  switchButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
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
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: `${colors.outlineVariant}1A`,
  },
  statLabel: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
  },
  transactionGroup: {
    marginBottom: 24,
    gap: 16,
  },
  groupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  groupDate: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.onSurfaceVariant,
    letterSpacing: 1,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainer,
    borderRadius: 16,
    padding: 16,
  },
  txLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  txIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.onSurface,
  },
  txPhone: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
  },
  txRight: {
    alignItems: 'flex-end',
  },
  txAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#4CAF50',
  },
  txTime: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
  },
});
