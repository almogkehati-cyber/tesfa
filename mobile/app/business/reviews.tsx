import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { colors } from '../../theme/colors';

const reviews = [
  {
    id: '1',
    name: 'איתמר כהן',
    rating: 5,
    date: 'לפני יומיים',
    text: 'שירות מעולה! האפליקציה מאוד נוחה לשימוש והכל מרגיש מאוד פרימיום. השקיפות בדירוגים ובפעילות נותנת לי המון ביטחון.',
    likes: 12,
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqyby7VDBrpGvu8zAFZ9kYCv0rVgzz4WbUJ3umrawh9sXLJKhtBiPlNX0_1WamzUswsIJC0JTlctUA0XLvyaRsQ7XYyLaO813LVH1Oyod4zLPCp960XEZ1CBOsX06qm5j-KZjfEobkBWChXNuOOv-7ZI4XgS9BsCeNVk0F4jmeS8y0hFGYV21ObrVcBItMNS2FRFEKQXqUaH6FHGgeVrMhJ4bGF0BuO4H4NGv5nYRd-19U8tg0pFxY8piNJfBG3RhAYaqXY8RZVQg',
  },
  {
    id: '2',
    name: 'דניאל לוי',
    rating: 4,
    date: 'לפני שבוע',
    text: 'חווית משתמש מדהימה. הממשק נקי ומזמין. היה חסר לי קצת יותר מידע בתהליך ההרשמה אבל בסוף הסתדרתי.',
    likes: 5,
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB-ht9Nmf0uEfQT0z8_O4e5BAF6H1OT_8_lwFuLNf5eUNRKwrq3bbbM62dSEDq3FjzGpqybnfyfF2-vtA13AoEXMmekcXCCtSz1LQpUwO6F2O8i0SYDPD1HbAH9cAMv9GJ_Zzag8ixH6G6e4C3yCtLQfGkyKYYKtxQtlY9Vq8GLPQSgErtpm4AeDkdmVHWJfKtu5gS6EEPQRe1DPveH-BuM0x60BzT38fh54ajDMxSxoMoYnEAl8_nwZkiJTOh5IXkgv-ZbqML3Lbo',
  },
  {
    id: '3',
    name: 'מיכאל רז',
    rating: 5,
    date: 'לפני שבועיים',
    text: 'פשוט וואו. הקהילה כאן מדהימה והמערכת תומכת בצורה מושלמת בצרכים שלנו. ממליץ בחום לכל מי שמחפש פתרון פיננסי חברתי.',
    likes: 28,
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmXKZrLFzMKQKK32PniEY3l0JSBifjvcVNnBT1DX-e-xF0bGhRXVglLQ6ykFgsObwvU5pTV1zb5ypQpkCQCYq8TX9YFrtFcw6bWEwG4c2mcpwvbSyGOcCGgu7H-LCMlBrMF0hVmFBarYaRW09wwbmMl3Tw9Faz6h0CCZoTimQkmsCR7GnbIrTmCW6jqGmpSXTRMF-58PnhTvQ7Rd60r7QFrr8QoFViMuYFGJI5fiYohCQh-GSMwaukB6m56_OT3I97_SkL6HDxRHQ',
  },
];

const ratingDistribution = [
  { stars: 5, percentage: 82 },
  { stars: 4, percentage: 12 },
  { stars: 3, percentage: 4 },
  { stars: 2, percentage: 1 },
  { stars: 1, percentage: 1 },
];

export default function ReviewsScreen() {
  const router = useRouter();

  const renderStars = (count: number) => {
    return Array(5).fill(0).map((_, i) => (
      <MaterialIcons 
        key={i}
        name="star" 
        size={16} 
        color={i < count ? colors.primary : `${colors.outlineVariant}66`}
      />
    ));
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <SafeAreaView edges={['top']}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.moreButton}>
            <MaterialIcons name="more-vert" size={24} color={colors.onSurfaceVariant} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>ביקורות</Text>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <MaterialIcons name="arrow-forward" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Rating Summary Card */}
        <Animated.View entering={FadeInDown.delay(100).duration(400)} style={styles.summaryCard}>
          <View style={styles.summaryContent}>
            {/* Left: Big Number */}
            <View style={styles.ratingBig}>
              <Text style={styles.ratingNumber}>4.8</Text>
              <View style={styles.starsRow}>
                {renderStars(5)}
              </View>
              <Text style={styles.ratingCount}>124 דירוגים</Text>
            </View>

            {/* Right: Progress Bars */}
            <View style={styles.distributionContainer}>
              {ratingDistribution.map((item) => (
                <View key={item.stars} style={styles.distributionRow}>
                  <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: `${item.percentage}%` }]} />
                  </View>
                  <Text style={styles.starLabel}>{item.stars}</Text>
                </View>
              ))}
            </View>
          </View>
        </Animated.View>

        {/* Reviews Header */}
        <View style={styles.reviewsHeader}>
          <TouchableOpacity style={styles.sortButton}>
            <MaterialIcons name="sort" size={20} color={colors.primary} />
            <Text style={styles.sortText}>החדש ביותר</Text>
          </TouchableOpacity>
          <Text style={styles.sectionTitle}>כל הביקורות</Text>
        </View>

        {/* Reviews List */}
        {reviews.map((review, index) => (
          <Animated.View 
            key={review.id}
            entering={FadeInDown.delay(200 + index * 100).duration(400)}
            style={styles.reviewCard}
          >
            <View style={styles.reviewHeader}>
              <Image source={{ uri: review.avatar }} style={styles.avatar} />
              <View style={styles.reviewerInfo}>
                <View style={styles.reviewerTop}>
                  <Text style={styles.reviewDate}>{review.date}</Text>
                  <View>
                    <Text style={styles.reviewerName}>{review.name}</Text>
                    <View style={styles.starsRowSmall}>
                      {renderStars(review.rating)}
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <Text style={styles.reviewText}>{review.text}</Text>
            <View style={styles.reviewActions}>
              <TouchableOpacity style={styles.actionButton}>
                <MaterialIcons name="chat-bubble-outline" size={18} color={colors.onSurfaceVariant} />
                <Text style={styles.actionText}>הגב</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <MaterialIcons name="thumb-up" size={18} color={colors.onSurfaceVariant} />
                <Text style={styles.actionText}>{review.likes}</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        ))}
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity style={styles.fab} activeOpacity={0.9}>
        <LinearGradient
          colors={colors.gradientPrimary}
          style={styles.fabGradient}
        >
          <MaterialIcons name="add" size={28} color={colors.white} />
        </LinearGradient>
      </TouchableOpacity>
    </View>
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
    paddingVertical: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.onSurface,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surfaceContainerLow,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  summaryCard: {
    backgroundColor: `${colors.surfaceContainer}99`,
    borderRadius: 16,
    padding: 24,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: `${colors.outlineVariant}1A`,
  },
  summaryContent: {
    flexDirection: 'row',
    gap: 32,
  },
  ratingBig: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  ratingNumber: {
    fontSize: 56,
    fontWeight: '800',
    color: colors.primary,
  },
  starsRow: {
    flexDirection: 'row',
    gap: 2,
  },
  starsRowSmall: {
    flexDirection: 'row',
    gap: 1,
    marginTop: 2,
  },
  ratingCount: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
    fontWeight: '500',
    marginTop: 4,
  },
  distributionContainer: {
    flex: 1,
    gap: 12,
  },
  distributionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  starLabel: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
    fontWeight: '500',
    width: 16,
    textAlign: 'center',
  },
  progressBar: {
    flex: 1,
    height: 10,
    backgroundColor: colors.surfaceContainerHighest,
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 5,
  },
  reviewsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.onSurface,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: `${colors.primary}1A`,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 9999,
  },
  sortText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.primary,
  },
  reviewCard: {
    backgroundColor: `${colors.surfaceContainerLow}66`,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: `${colors.outlineVariant}0D`,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
    marginBottom: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: `${colors.primary}33`,
  },
  reviewerInfo: {
    flex: 1,
  },
  reviewerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.onSurface,
  },
  reviewDate: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
    fontWeight: '500',
  },
  reviewText: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
    lineHeight: 22,
    marginBottom: 16,
  },
  reviewActions: {
    flexDirection: 'row',
    gap: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionText: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
  },
  fab: {
    position: 'absolute',
    bottom: 96,
    left: 24,
  },
  fabGradient: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primaryContainer,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 30,
  },
});
