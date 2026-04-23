import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { colors } from '../../theme/colors';

export default function BusinessProfileScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState('info');

  return (
    <View style={styles.container}>
      {/* Hero Image */}
      <View style={styles.heroContainer}>
        <Image
          source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA624f0SrCacfWsJgcHn0LK9H8DmSgbpJlqIkNdt82n4VvXynss3G9FtB_K9WY4q3ppqQuaSBXtsjV_OW-4-Rkit2ttsdlKMMwgbkgvL579S38uKF-5kSAOoshgDjK7bxs-Rum6LpDENf76QRFj16pBFV5d1HuD7m6oZQBk1YIj8Nd24V-nn5FwUSG6_I-rCYizvpQeglJcknXskOwLEPYRAJ80jVPeHC4r6Q3mgXWyfl6DbEtP74e3a-jhzPHoOS7ZhyUe0cR3ZMs' }}
          style={styles.heroImage}
        />
        <View style={styles.heroGradient} />
        
        {/* Top Controls */}
        <SafeAreaView style={styles.topControls}>
          <TouchableOpacity style={styles.controlButton}>
            <MaterialIcons name="share" size={24} color={colors.onSurface} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlButton} onPress={() => router.back()}>
            <MaterialIcons name="arrow-forward" size={24} color={colors.onSurface} />
          </TouchableOpacity>
        </SafeAreaView>

        {/* Business Identity */}
        <View style={styles.businessIdentity}>
          <View style={styles.logoContainer}>
            <Image
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArjmUI5y_YaFM69jni_BLPLrci4k4qXGlBJxxxNkjuUp2SePYycbhOn66-GgCDcLB3elojVa03Q3dYvqit4NI8t_0vKRMhNyl8G4z5qPDb3JWjYsRBvXXMA4KIB115ncEqsbfYCIIlP3l9n5FiEhcar1xffRjA16F3HJR3tqlrJ_z6KtkswRNuP48WGKZrPpN9p7I-DtcDVFmPBlRCmjYUmyuECi76FpP9Ff9oxzXA5rJVVYj709fPCJIUJzAB4Y36-70EQndT9G0' }}
              style={styles.logo}
            />
            <View style={styles.statusDot} />
          </View>
          <View style={styles.businessInfo}>
            <Text style={styles.businessName}>סטודיו ארכיטק</Text>
            <Text style={styles.businessCategory}>עיצוב פנים ואדריכלות</Text>
          </View>
        </View>
      </View>

      {/* Navigation Tabs */}
      <View style={styles.tabsContainer}>
        {['info', 'reviews', 'hours'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.tabActive]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
              {tab === 'info' ? 'מידע' : tab === 'reviews' ? 'ביקורות' : 'שעות'}
            </Text>
            {activeTab === tab && <View style={styles.tabIndicator} />}
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* About Section */}
        <Animated.View entering={FadeInDown.delay(100).duration(400)} style={styles.section}>
          <Text style={styles.sectionTitle}>אודות העסק</Text>
          <Text style={styles.aboutText}>
            סטודיו ארכיטק מתמחה ביצירת חללים המשלבים יוקרה, פונקציונליות וחדשנות. עם ניסיון של מעל עשור בתכנון ועיצוב דירות יוקרה ומשרדים, אנחנו מביאים את החזון שלכם למציאות מוחשית.
          </Text>
          <View style={styles.badges}>
            <View style={styles.badge}>
              <MaterialIcons name="verified" size={16} color={colors.onSurfaceVariant} />
              <Text style={styles.badgeText}>עסק מאומת</Text>
            </View>
            <View style={styles.badge}>
              <MaterialIcons name="star" size={16} color={colors.onSurfaceVariant} />
              <Text style={styles.badgeText}>4.9 (124 ביקורות)</Text>
            </View>
          </View>
        </Animated.View>

        {/* Info Grid */}
        <Animated.View entering={FadeInDown.delay(200).duration(400)} style={styles.infoGrid}>
          <View style={styles.infoCardFull}>
            <View style={styles.infoIcon}>
              <MaterialIcons name="location-on" size={24} color={colors.primary} />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>מיקום</Text>
              <Text style={styles.infoValue}>שדרות רוטשילד 42, תל אביב יפו</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <View style={styles.infoCard}>
              <MaterialIcons name="call" size={24} color={colors.primary} />
              <Text style={styles.infoLabel}>טלפון</Text>
              <Text style={styles.infoValue}>03-678-9900</Text>
            </View>
            <View style={styles.infoCard}>
              <MaterialIcons name="schedule" size={24} color={colors.primary} />
              <Text style={styles.infoLabel}>סטטוס</Text>
              <Text style={styles.statusOpen}>פתוח כעת</Text>
            </View>
          </View>
        </Animated.View>

        {/* Map Section */}
        <Animated.View entering={FadeInDown.delay(300).duration(400)} style={styles.section}>
          <View style={styles.sectionHeader}>
            <TouchableOpacity>
              <Text style={styles.linkText}>פתח ב-Google Maps</Text>
            </TouchableOpacity>
            <Text style={styles.sectionTitle}>איפה אנחנו?</Text>
          </View>
          <View style={styles.mapContainer}>
            <Image
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBhP2ZCpXz0FOHT5pqvcZ2_USYvm9lJWtgdUe4WEPEBSP0pQ3wvFUvdb8PV9Er7pGAv_ggBlRlqzpK7yK12EKkyHy1n9hldjzWQNab4etklybVByU2FP50ZYQaG7m356w17B0P1nPHeNy4_Kcz-zog7tf1PA7vab7c49dANMVUPC_sSrkBaUBnbIt_mkIzDRCAFEmozxQch20ZlUXVVUw8PovmpKAIZ0dL2OJZRenBlwBCd5GucZVdp0Wyzv1wvYsmxsv4vgiAKCeI' }}
              style={styles.mapImage}
            />
            <View style={styles.mapOverlay} />
            <View style={styles.mapPin}>
              <MaterialIcons name="location-on" size={48} color={colors.primary} />
            </View>
          </View>
        </Animated.View>
      </ScrollView>

      {/* Bottom Action */}
      <View style={styles.bottomAction}>
        <TouchableOpacity activeOpacity={0.9}>
          <LinearGradient
            colors={colors.gradientPrimary}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 0 }}
            style={styles.payButton}
          >
            <MaterialIcons name="account-balance-wallet" size={24} color={colors.white} />
            <Text style={styles.payButtonText}>שלם ב-TSF</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A1A',
  },
  heroContainer: {
    height: 350,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    opacity: 0.75,
  },
  heroGradient: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
    backgroundImage: 'linear-gradient(to top, #0A0A1A, transparent)',
  },
  topControls: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  controlButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: `${colors.surfaceContainer}99`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  businessIdentity: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    padding: 32,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 24,
  },
  logoContainer: {
    position: 'relative',
  },
  logo: {
    width: 96,
    height: 96,
    borderRadius: 16,
    borderWidth: 4,
    borderColor: colors.surfaceContainerHighest,
  },
  statusDot: {
    position: 'absolute',
    bottom: -8,
    left: -8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4CAF50',
    borderWidth: 4,
    borderColor: '#0A0A1A',
  },
  businessInfo: {
    flex: 1,
    paddingBottom: 8,
  },
  businessName: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 4,
  },
  businessCategory: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '500',
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 16,
    gap: 32,
    borderBottomWidth: 1,
    borderBottomColor: `${colors.outlineVariant}1A`,
    backgroundColor: `#0A0A1ACC`,
  },
  tab: {
    paddingVertical: 8,
    position: 'relative',
  },
  tabActive: {},
  tabText: {
    fontSize: 16,
    color: colors.onSurfaceVariant,
    fontWeight: '500',
  },
  tabTextActive: {
    color: colors.primary,
    fontWeight: '700',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 120,
  },
  section: {
    marginBottom: 40,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: 16,
  },
  linkText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  aboutText: {
    fontSize: 18,
    color: colors.onSurfaceVariant,
    lineHeight: 28,
    marginBottom: 16,
  },
  badges: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    gap: 12,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 9999,
    backgroundColor: colors.surfaceContainerLow,
    borderWidth: 1,
    borderColor: `${colors.outlineVariant}1A`,
  },
  badgeText: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
  },
  infoGrid: {
    gap: 16,
    marginBottom: 40,
  },
  infoCardFull: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: `${colors.outlineVariant}0D`,
  },
  infoIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: `${colors.primary}1A`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContent: {
    flex: 1,
    gap: 4,
  },
  infoRow: {
    flexDirection: 'row',
    gap: 16,
  },
  infoCard: {
    flex: 1,
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 16,
    padding: 24,
    gap: 12,
    borderWidth: 1,
    borderColor: `${colors.outlineVariant}0D`,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.onSurface,
  },
  infoValue: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
  },
  statusOpen: {
    fontSize: 14,
    fontWeight: '700',
    color: '#4CAF50',
  },
  mapContainer: {
    height: 224,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: `${colors.outlineVariant}33`,
  },
  mapImage: {
    width: '100%',
    height: '100%',
    opacity: 0.8,
  },
  mapOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: `${colors.primary}1A`,
  },
  mapPin: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -24 }, { translateY: -24 }],
  },
  bottomAction: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    backgroundColor: 'transparent',
  },
  payButton: {
    height: 64,
    borderRadius: 9999,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    shadowColor: colors.primaryContainer,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 32,
  },
  payButtonText: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.white,
  },
});
