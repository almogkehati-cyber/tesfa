import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { colors } from '../../theme/colors';
import { useWeb3 } from '../../context/Web3Context';

export default function HomeScreen() {
  const router = useRouter();
  const { balance, isLoading, refreshBalance, isReady } = useWeb3();
  const [refreshing, setRefreshing] = React.useState(false);

  // Refresh balance on mount
  useEffect(() => {
    if (isReady) {
      refreshBalance();
    }
  }, [isReady]);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await refreshBalance();
    setRefreshing(false);
  }, [refreshBalance]);

  const actions = [
    { icon: 'send', label: 'שלח', route: '/send' },
    { icon: 'download', label: 'קבל', route: '/receive' },
    { icon: 'token', label: 'UBI', route: '/ubi', special: true },
    { icon: 'qr-code-scanner', label: 'סרוק', route: '/scan' },
  ];

  const activities = [
    { icon: 'coffee', name: 'בית קפה שכונתי', time: 'היום, 14:20', amount: '+45', positive: true },
    { icon: 'star', name: 'UBI יומי', time: 'היום, 08:00', amount: '+12', positive: true, special: true },
    { icon: 'shopping-bag', name: 'מכולת השלום', time: 'אתמול, 19:45', amount: '-32', positive: false },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton}>
          <MaterialIcons name="menu" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.logo}>TESFA</Text>
        <TouchableOpacity style={styles.profileButton}>
          <Image
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMJPui-vD20hRSqBe2qS6BPgmnB9Dmsfc1YklgliIRu6zWqlvh9ROKXbNPMug51aEr8yriL7Mu8om-IjSJv7xM-5EjrOp1OGdZ153k3NmHbGG-qEl1NxxQnQl-awU7KGpOL2kBzBT0LKMpgBqNjqskbnZkKaEhmRSu4gcuGgxfWpn9jgWCXV_L2__gCbeZnqfhGZabaVlb_gRa-Jff7lZMp2jQL_REcmj_atqJmmjpsD-7-zUs5aPnHHjNvH0xfvWaQvQ2UeJjCIo' }}
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }
      >
        {/* Balance Card */}
        <Animated.View entering={FadeInDown.delay(100).duration(600)}>
          <View style={styles.balanceCard}>
            <View style={styles.balanceGlowTop} />
            <View style={styles.balanceGlowBottom} />
            <View style={styles.balanceContent}>
              <Text style={styles.balanceLabel}>יתרה כוללת</Text>
              <View style={styles.balanceRow}>
                <Text style={styles.balanceAmount}>
                  {balance ? balance.display : '0.00'}
                </Text>
                <Text style={styles.balanceCurrency}>TSF</Text>
              </View>
              <View style={styles.trendRow}>
                <MaterialIcons name="trending-up" size={14} color="#4CAF50" />
                <Text style={styles.trendText}>+2.4% השבוע</Text>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Action Grid */}
        <Animated.View entering={FadeInDown.delay(200).duration(600)} style={styles.actionsGrid}>
          {actions.map((action, index) => (
            <TouchableOpacity 
              key={action.label}
              style={styles.actionButton}
              onPress={() => router.push(action.route as any)}
              activeOpacity={0.8}
            >
              {action.special ? (
                <LinearGradient
                  colors={colors.gradientPrimary}
                  style={styles.actionIconSpecial}
                >
                  <MaterialIcons name={action.icon as any} size={24} color={colors.onPrimary} />
                </LinearGradient>
              ) : (
                <View style={styles.actionIcon}>
                  <MaterialIcons name={action.icon as any} size={24} color={colors.primary} />
                </View>
              )}
              <Text style={[styles.actionLabel, action.special && styles.actionLabelBold]}>
                {action.label}
              </Text>
            </TouchableOpacity>
          ))}
        </Animated.View>

        {/* Promotion Card */}
        <Animated.View entering={FadeInDown.delay(300).duration(600)}>
          <TouchableOpacity style={styles.promoCard} activeOpacity={0.8}>
            <View style={styles.promoContent}>
              <Text style={styles.promoTitle}>המדריך המלא לקהילה</Text>
              <Text style={styles.promoSubtitle}>למד איך להפיק את המירב מ-TESFA</Text>
            </View>
            <MaterialIcons name="chevron-left" size={24} color={colors.primaryFixed} />
          </TouchableOpacity>
        </Animated.View>

        {/* Recent Activity */}
        <Animated.View entering={FadeInDown.delay(400).duration(600)} style={styles.activitySection}>
          <View style={styles.activityHeader}>
            <TouchableOpacity>
              <Text style={styles.activitySeeAll}>הכל</Text>
            </TouchableOpacity>
            <Text style={styles.activityTitle}>פעילות אחרונה</Text>
          </View>

          <View style={styles.activityList}>
            {activities.map((activity, index) => (
              <TouchableOpacity key={index} style={styles.activityItem} activeOpacity={0.7}>
                <View style={styles.activityRight}>
                  <Text style={[
                    styles.activityAmount,
                    activity.positive ? styles.activityPositive : styles.activityNegative
                  ]}>
                    {activity.amount} TSF
                  </Text>
                  <Text style={styles.activityStatus}>הושלם</Text>
                </View>
                <View style={styles.activityLeft}>
                  <View style={[
                    styles.activityIcon,
                    activity.special && styles.activityIconSpecial
                  ]}>
                    <MaterialIcons 
                      name={activity.icon as any} 
                      size={20} 
                      color={activity.special ? colors.primary : colors.onSurfaceVariant} 
                    />
                  </View>
                  <View style={styles.activityInfo}>
                    <Text style={styles.activityName}>{activity.name}</Text>
                    <Text style={styles.activityTime}>{activity.time}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
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
  logo: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: -0.5,
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: colors.primaryContainer,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 120,
  },
  balanceCard: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 16,
    padding: 32,
    marginBottom: 32,
    overflow: 'hidden',
  },
  balanceGlowTop: {
    position: 'absolute',
    top: -96,
    right: -96,
    width: 256,
    height: 256,
    backgroundColor: colors.primaryContainer,
    opacity: 0.2,
    borderRadius: 9999,
  },
  balanceGlowBottom: {
    position: 'absolute',
    bottom: -96,
    left: -96,
    width: 256,
    height: 256,
    backgroundColor: colors.secondaryContainer,
    opacity: 0.2,
    borderRadius: 9999,
  },
  balanceContent: {
    alignItems: 'flex-end',
  },
  balanceLabel: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 8,
    opacity: 0.7,
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
    marginBottom: 16,
  },
  balanceAmount: {
    fontSize: 48,
    fontWeight: '800',
    color: colors.onSurface,
    letterSpacing: -1,
  },
  balanceCurrency: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
  },
  trendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trendText: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '500',
  },
  actionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  actionButton: {
    alignItems: 'center',
    gap: 12,
  },
  actionIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.surfaceContainerHighest,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionIconSpecial: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primaryContainer,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
  },
  actionLabel: {
    fontSize: 14,
    color: colors.onSurface,
    fontWeight: '500',
  },
  actionLabelBold: {
    fontWeight: '700',
  },
  promoCard: {
    backgroundColor: colors.surfaceContainerHigh,
    borderRadius: 16,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  promoContent: {
    flex: 1,
  },
  promoTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: 4,
  },
  promoSubtitle: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
  },
  activitySection: {
    marginBottom: 32,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  activityTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.onSurface,
  },
  activitySeeAll: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
  },
  activityList: {
    gap: 16,
  },
  activityItem: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  activityLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  activityIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.surfaceContainerHighest,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityIconSpecial: {
    backgroundColor: `${colors.primaryContainer}1A`,
  },
  activityInfo: {
    alignItems: 'flex-end',
  },
  activityName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.onSurface,
  },
  activityTime: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
  },
  activityRight: {
    alignItems: 'flex-start',
  },
  activityAmount: {
    fontSize: 16,
    fontWeight: '700',
  },
  activityPositive: {
    color: colors.primary,
  },
  activityNegative: {
    color: colors.error,
  },
  activityStatus: {
    fontSize: 10,
    color: colors.onSurfaceVariant,
  },
});
