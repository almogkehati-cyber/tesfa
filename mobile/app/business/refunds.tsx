import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { colors } from '../../theme/colors';

const refundableTransactions = [
  { id: '88291', name: 'ישראל ישראלי', amount: 450, time: 'לפני שעה', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXqHNg7UlVtb4YzbVxBBa2nR3_dqGprPt1ZWIDb47bJQGeaviWtgvQL26To7zGoZxBDLuK880N9icKv_M2WmbL-y9j_9EJEIu4N5NbSl2K9tGJiIAqdFkVuwPB64LjjiswrN-3xMxG9BGbx56Q9_o5dOB936qxbXmhSJzn1loXj1h3GyZzyBWsoIMHL5diN6LnsHWxXjdtZagdEAtYMZXiq7LqVmFD8gG75FkhUBbJnabGiLCNIQOgYYQehRhjW9wSO9H8giT26k8' },
  { id: '88285', name: 'דנה כהן', amount: 1200, time: 'לפני 3 שעות', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAW_7JS8AL_c8FsQ0b_NK_YT3tBRP13dPYPZSogP4KEKz2UaCssu9sChvPgCSEFfonnad8XkhoTQzBIE-kPFckFR-pJmQfBwD3kXHGVHeIOkpWCihBxhcVLUmgfRb0xQdkXu2ybGBHUuxetdeV99P1jj5KUYajlcKDiO408tdUFr0IuZkrmr67aB1m90_CSu1gIF5O49IYNVg_Rwyd1Q9m193ZBxgJOTEp8jE0uYcvsJNmwUUYTJR_HAHVEorwlB1q2F8yXU_Vw9zM' },
  { id: '88274', name: 'אבי לוי', amount: 89.9, time: 'אתמול', avatar: null },
];

export default function RefundsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton}>
          <MaterialIcons name="more-vert" size={24} color={colors.tertiary} />
        </TouchableOpacity>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>Transactions</Text>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <MaterialIcons name="arrow-forward" size={24} color={colors.tertiary} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Title */}
        <Animated.View entering={FadeInDown.delay(100).duration(400)} style={styles.titleSection}>
          <Text style={styles.title}>Refund Management</Text>
          <Text style={styles.subtitle}>נהל את החזרי הלקוחות שלך במקום אחד בצורה מאובטחת ומהירה.</Text>
        </Animated.View>

        {/* Main Action */}
        <Animated.View entering={FadeInDown.delay(200).duration(400)}>
          <TouchableOpacity 
            activeOpacity={0.9} 
            style={styles.mainActionContainer}
            onPress={() => router.push('/business/refund-execute')}
          >
            <LinearGradient
              colors={['#A855F7', '#6366F1']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.mainAction}
            >
              <View style={styles.mainActionGlow} />
              <View style={styles.mainActionTop}>
                <View style={styles.mainActionIcon}>
                  <MaterialIcons name="payments" size={32} color={colors.white} />
                </View>
                <MaterialIcons name="open-in-new" size={24} color="rgba(255,255,255,0.5)" />
              </View>
              <View style={styles.mainActionBottom}>
                <Text style={styles.mainActionLabel}>CREDIT EXECUTION</Text>
                <Text style={styles.mainActionTitle}>בצע זיכוי</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>

        {/* Stats */}
        <Animated.View entering={FadeInDown.delay(300).duration(400)} style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>סה"כ זוכו השבוע</Text>
            <Text style={styles.statValue}>₪12,450</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>זיכויים בהמתנה</Text>
            <Text style={styles.statValue}>03</Text>
          </View>
        </Animated.View>

        {/* Transactions List */}
        <Animated.View entering={FadeInDown.delay(400).duration(400)} style={styles.listSection}>
          <View style={styles.listHeader}>
            <Text style={styles.listTitle}>Recent Transactions for Refund</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>הצג הכל</Text>
            </TouchableOpacity>
          </View>
          
          {refundableTransactions.map((tx) => (
            <TouchableOpacity 
              key={tx.id} 
              style={styles.txItem}
              onPress={() => router.push({ pathname: '/business/refund-execute', params: { amount: tx.amount, name: tx.name, txId: tx.id } })}
            >
              <View style={styles.txLeft}>
                {tx.avatar ? (
                  <Image source={{ uri: tx.avatar }} style={styles.txAvatar} />
                ) : (
                  <View style={styles.txAvatarPlaceholder}>
                    <MaterialIcons name="person" size={24} color={colors.onSurfaceVariant} />
                  </View>
                )}
                <View>
                  <Text style={styles.txName}>{tx.name}</Text>
                  <Text style={styles.txMeta}>ID: #{tx.id} • {tx.time}</Text>
                </View>
              </View>
              <View style={styles.txRight}>
                <Text style={styles.txAmount}>₪{tx.amount.toFixed(2)}</Text>
                <Text style={styles.txStatus}>ניתן לזיכוי</Text>
              </View>
            </TouchableOpacity>
          ))}
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A1A',
  },
  header: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)',
  },
  headerButton: {
    padding: 8,
  },
  headerLeft: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 16,
  },
  backButton: {
    padding: 8,
    borderRadius: 9999,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.onSurface,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 120,
  },
  titleSection: {
    marginVertical: 32,
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
  },
  mainActionContainer: {
    marginBottom: 24,
  },
  mainAction: {
    borderRadius: 24,
    padding: 32,
    aspectRatio: 16 / 10,
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  mainActionGlow: {
    position: 'absolute',
    top: -96,
    left: -96,
    width: 256,
    height: 256,
    borderRadius: 128,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  mainActionTop: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
  },
  mainActionIcon: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainActionBottom: {},
  mainActionLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.8)',
    letterSpacing: 2,
    marginBottom: 4,
  },
  mainActionTitle: {
    fontSize: 40,
    fontWeight: '900',
    color: colors.white,
  },
  statsRow: {
    flexDirection: 'row-reverse',
    gap: 16,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  statLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.onSurfaceVariant,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.onSurface,
  },
  listSection: {
    gap: 16,
  },
  listHeader: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  listTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.onSurface,
  },
  seeAll: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.tertiary,
  },
  txItem: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  txLeft: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 16,
  },
  txAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  txAvatarPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.surfaceContainerHighest,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: 2,
  },
  txMeta: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.onSurfaceVariant,
  },
  txRight: {
    alignItems: 'flex-start',
  },
  txAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.onSurface,
  },
  txStatus: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.tertiary,
  },
});
