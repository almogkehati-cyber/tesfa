import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { colors } from '../../theme/colors';

export default function ActivityScreen() {
  const transactions = [
    { icon: 'coffee', name: 'בית קפה שכונתי', time: 'היום, 14:20', amount: '+45', positive: true },
    { icon: 'star', name: 'UBI יומי', time: 'היום, 08:00', amount: '+12', positive: true, special: true },
    { icon: 'shopping-bag', name: 'מכולת השלום', time: 'אתמול, 19:45', amount: '-32', positive: false },
    { icon: 'send', name: 'העברה ליונתן', time: 'אתמול, 15:30', amount: '-150', positive: false },
    { icon: 'download', name: 'קבלה מדוד', time: '22/05, 10:00', amount: '+200', positive: true },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>פעילות</Text>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        <TouchableOpacity style={[styles.filterTab, styles.filterTabActive]}>
          <Text style={[styles.filterText, styles.filterTextActive]}>הכל</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterTab}>
          <Text style={styles.filterText}>נכנס</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterTab}>
          <Text style={styles.filterText}>יוצא</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {transactions.map((tx, index) => (
          <Animated.View 
            key={index}
            entering={FadeInDown.delay(index * 100).duration(400)}
          >
            <TouchableOpacity style={styles.txItem} activeOpacity={0.7}>
              <View style={styles.txRight}>
                <Text style={[
                  styles.txAmount,
                  tx.positive ? styles.txPositive : styles.txNegative
                ]}>
                  {tx.amount} TSF
                </Text>
                <Text style={styles.txStatus}>הושלם</Text>
              </View>
              <View style={styles.txLeft}>
                <View style={[
                  styles.txIcon,
                  tx.special && styles.txIconSpecial
                ]}>
                  <MaterialIcons 
                    name={tx.icon as any} 
                    size={20} 
                    color={tx.special ? colors.primary : colors.onSurfaceVariant} 
                  />
                </View>
                <View style={styles.txInfo}>
                  <Text style={styles.txName}>{tx.name}</Text>
                  <Text style={styles.txTime}>{tx.time}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </Animated.View>
        ))}
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
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.onSurface,
    textAlign: 'right',
  },
  filterContainer: {
    flexDirection: 'row-reverse',
    paddingHorizontal: 24,
    gap: 12,
    marginBottom: 24,
  },
  filterTab: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: colors.surfaceContainerLow,
  },
  filterTabActive: {
    backgroundColor: colors.primaryContainer,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.onSurfaceVariant,
  },
  filterTextActive: {
    color: colors.onPrimaryContainer,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 120,
    gap: 12,
  },
  txItem: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    backgroundColor: colors.surfaceContainerHighest,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txIconSpecial: {
    backgroundColor: `${colors.primaryContainer}1A`,
  },
  txInfo: {
    alignItems: 'flex-end',
  },
  txName: {
    fontSize: 16,
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
  },
  txPositive: {
    color: colors.primary,
  },
  txNegative: {
    color: colors.error,
  },
  txStatus: {
    fontSize: 10,
    color: colors.onSurfaceVariant,
  },
});
