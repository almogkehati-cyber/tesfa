import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { colors } from '../../theme/colors';

const weekDays = ['א׳', 'ב׳', 'ג׳', 'ד׳', 'ה׳', 'ו׳', 'ש׳'];
const chartData = [40, 65, 70, 85, 45, 30, 20];

export default function BusinessStatisticsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.switchButton}>
          <Text style={styles.switchText}>אישי</Text>
        </TouchableOpacity>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>Business Admin</Text>
          <MaterialIcons name="storefront" size={24} color={colors.primary} />
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Title */}
        <Animated.View entering={FadeInDown.delay(100).duration(400)} style={styles.titleSection}>
          <Text style={styles.title}>נתונים וסטטיסטיקה</Text>
          <Text style={styles.subtitle}>ניתוח ביצועים שבועי עבור TSF</Text>
        </Animated.View>

        {/* Main Chart Card */}
        <Animated.View entering={FadeInDown.delay(200).duration(400)} style={styles.chartCard}>
          <View style={styles.chartHeader}>
            <View>
              <Text style={styles.chartLabel}>הכנסות TSF (7 ימים אחרונים)</Text>
              <Text style={styles.chartValue}>₪42,850.00</Text>
            </View>
            <View style={styles.trendBadge}>
              <MaterialIcons name="trending-up" size={14} color="#4CAF50" />
              <Text style={styles.trendText}>12.4%+</Text>
            </View>
          </View>
          
          {/* Bar Chart */}
          <View style={styles.chart}>
            {chartData.map((height, index) => (
              <View key={index} style={styles.barContainer}>
                <View style={[
                  styles.bar, 
                  { height: `${height}%` },
                  index === 3 && styles.barActive
                ]} />
                <Text style={[styles.barLabel, index === 3 && styles.barLabelActive]}>
                  {weekDays[index]}
                </Text>
              </View>
            ))}
          </View>
        </Animated.View>

        {/* Volume Card */}
        <Animated.View entering={FadeInDown.delay(300).duration(400)} style={styles.volumeCard}>
          <View style={styles.volumeIcon}>
            <MaterialIcons name="receipt-long" size={28} color={colors.primary} />
          </View>
          <Text style={styles.volumeLabel}>נפח עסקאות</Text>
          <Text style={styles.volumeValue}>1,248</Text>
          <Text style={styles.volumeSubtext}>גידול של 8% לעומת שבוע שעבר</Text>
          <View style={styles.volumeDivider} />
          <View style={styles.volumeRow}>
            <Text style={styles.volumeAvgLabel}>ממוצע לעסקה</Text>
            <Text style={styles.volumeAvgValue}>₪34.30</Text>
          </View>
        </Animated.View>

        {/* Info Cards Row */}
        <Animated.View entering={FadeInDown.delay(400).duration(400)} style={styles.infoRow}>
          <View style={[styles.infoCard, styles.infoCardTertiary]}>
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>זמני עומס מועדפים</Text>
              <Text style={styles.infoText}>מרבית הפעילות מתרחשת בין 16:00 ל-19:00</Text>
            </View>
            <MaterialIcons name="schedule" size={32} color={colors.tertiary} />
          </View>
          <View style={[styles.infoCard, styles.infoCardSecondary]}>
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>קהל לקוחות חוזר</Text>
              <Text style={styles.infoText}>68% מהמשתמשים ביצעו יותר מרכישה אחת השבוע</Text>
            </View>
            <MaterialIcons name="groups" size={32} color={colors.secondary} />
          </View>
        </Animated.View>

        {/* Heatmap Card */}
        <Animated.View entering={FadeInDown.delay(500).duration(400)} style={styles.heatmapCard}>
          <View style={styles.heatmapHeader}>
            <Text style={styles.heatmapTitle}>פיזור עסקאות יומי</Text>
            <View style={styles.heatmapLegend}>
              {[0.2, 0.4, 0.7, 1].map((opacity, i) => (
                <View key={i} style={[styles.legendDot, { opacity }]} />
              ))}
            </View>
          </View>
          <View style={styles.heatmapGrid}>
            {[0.4, 0.2, 0.8, 1, 0.1, 0.6, 0.4, 0.1, 0.7, 0.3, 0.9, 0.5, 0.2, 0.4].map((opacity, i) => (
              <View key={i} style={[styles.heatmapCell, { opacity }]} />
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
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  headerLeft: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 12,
  },
  headerTitle: {
    fontSize: 18,
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
  chartCard: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
  },
  chartHeader: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 32,
  },
  chartLabel: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  chartValue: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.primary,
  },
  trendBadge: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 9999,
    gap: 4,
  },
  trendText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#4CAF50',
  },
  chart: {
    flexDirection: 'row-reverse',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 180,
    gap: 8,
  },
  barContainer: {
    flex: 1,
    alignItems: 'center',
    gap: 12,
  },
  bar: {
    width: '100%',
    backgroundColor: colors.surfaceContainerHighest,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  barActive: {
    backgroundColor: colors.primaryContainer,
  },
  barLabel: {
    fontSize: 10,
    color: colors.onSurfaceVariant,
  },
  barLabelActive: {
    color: colors.primary,
    fontWeight: '700',
  },
  volumeCard: {
    backgroundColor: colors.surfaceContainerHigh,
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
  },
  volumeIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: `${colors.primary}1A`,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  volumeLabel: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
    marginBottom: 4,
  },
  volumeValue: {
    fontSize: 36,
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: 8,
  },
  volumeSubtext: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
  },
  volumeDivider: {
    height: 1,
    backgroundColor: `${colors.outlineVariant}33`,
    marginVertical: 24,
  },
  volumeRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  volumeAvgLabel: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
  },
  volumeAvgValue: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.onSurface,
  },
  infoRow: {
    gap: 16,
    marginBottom: 24,
  },
  infoCard: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 16,
    padding: 24,
    borderRightWidth: 4,
  },
  infoCardTertiary: {
    borderRightColor: colors.tertiary,
  },
  infoCardSecondary: {
    borderRightColor: colors.secondary,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: 4,
  },
  infoText: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
  },
  heatmapCard: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: 16,
    padding: 32,
  },
  heatmapHeader: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  heatmapTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.onSurface,
  },
  heatmapLegend: {
    flexDirection: 'row-reverse',
    gap: 4,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 2,
    backgroundColor: colors.primary,
  },
  heatmapGrid: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    gap: 8,
  },
  heatmapCell: {
    width: 40,
    height: 40,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
});
