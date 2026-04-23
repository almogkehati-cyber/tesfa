import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { colors } from '../../theme/colors';

const profileSettings = [
  { icon: 'edit-square', title: 'עריכת פרופיל עסק', subtitle: null },
  { icon: 'vpn-key', title: 'מפתח API', subtitle: 'אינטגרציות וחיבורי מערכת' },
  { icon: 'account-balance', title: 'פרטי חשבון בנק', subtitle: null },
];

const securitySettings = [
  { icon: 'group', title: 'ניהול צוות', subtitle: null, toggle: false },
  { icon: 'notifications-active', title: 'התראות עסק', subtitle: null, toggle: true },
];

export default function BusinessSettingsScreen() {
  const router = useRouter();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <BlurView intensity={80} style={styles.header}>
        <TouchableOpacity style={styles.headerButton}>
          <MaterialIcons name="account-balance-wallet" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>הגדרות עסק</Text>
        <TouchableOpacity style={styles.headerButton} onPress={() => router.back()}>
          <MaterialIcons name="arrow-forward" size={24} color={colors.primary} />
        </TouchableOpacity>
      </BlurView>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Business Profile Card */}
        <Animated.View entering={FadeInDown.delay(100).duration(400)} style={styles.profileCard}>
          <View style={styles.profileGlow} />
          <View style={styles.profileAvatar}>
            <Image
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdHjO3UkLPyQZtgUTazq1oR0djbpQ_0VaShZ3vPo1-ELgVYoW-c7CgTdniNvxqXF4hYlMckJ7ir0J-u9Qx3a0U2WGiMMucQvQevUT8u8TER3C0irw0jk2cITsb4ATtGUzKsfp5NKV9-qn8Z1aEA9LJ7qO-DmeL_6gq0VHvNMPUB0A2oUeP7Zxh_SRVK-Uh9qxZjoxK-iQ5xMdS6cBKWbAh3TFRrtOkSJM-OqgH7sbDlqbSq0tXzY7Ca9MKD5oj1b7m0GxqFyWSUbg' }}
              style={styles.avatarImage}
            />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>TESFA Business</Text>
            <Text style={styles.profileDesc}>ניהול פיננסי מתקדם</Text>
          </View>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>פעיל</Text>
          </View>
        </Animated.View>

        {/* Profile & Management */}
        <Animated.View entering={FadeInDown.delay(200).duration(400)} style={styles.section}>
          <Text style={styles.sectionLabel}>פרופיל וניהול</Text>
          <View style={styles.menuGroup}>
            {profileSettings.map((item, index) => (
              <TouchableOpacity key={index} style={styles.menuItem} activeOpacity={0.7}>
                <MaterialIcons name="chevron-left" size={24} color={colors.onSurfaceVariant} />
                <View style={styles.menuContent}>
                  <Text style={styles.menuTitle}>{item.title}</Text>
                  {item.subtitle && <Text style={styles.menuSubtitle}>{item.subtitle}</Text>}
                </View>
                <View style={styles.menuIcon}>
                  <MaterialIcons name={item.icon as any} size={24} color={colors.primary} />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        {/* Security & Permissions */}
        <Animated.View entering={FadeInDown.delay(300).duration(400)} style={styles.section}>
          <Text style={styles.sectionLabel}>אבטחה והרשאות</Text>
          <View style={styles.menuGroup}>
            {securitySettings.map((item, index) => (
              <View key={index} style={styles.menuItem}>
                {item.toggle ? (
                  <Switch
                    value={notificationsEnabled}
                    onValueChange={setNotificationsEnabled}
                    trackColor={{ false: colors.surfaceVariant, true: colors.primaryContainer }}
                    thumbColor={colors.onPrimary}
                  />
                ) : (
                  <MaterialIcons name="chevron-left" size={24} color={colors.onSurfaceVariant} />
                )}
                <View style={styles.menuContent}>
                  <Text style={styles.menuTitle}>{item.title}</Text>
                </View>
                <View style={styles.menuIcon}>
                  <MaterialIcons name={item.icon as any} size={24} color={colors.primary} />
                </View>
              </View>
            ))}
          </View>
        </Animated.View>

        {/* Switch to Personal */}
        <Animated.View entering={FadeInDown.delay(400).duration(400)} style={styles.switchSection}>
          <TouchableOpacity activeOpacity={0.9}>
            <LinearGradient
              colors={['#7b2fbe', '#9b59f5']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.switchButton}
            >
              <MaterialIcons name="person" size={24} color={colors.white} />
              <Text style={styles.switchButtonText}>מעבר לחשבון אישי</Text>
            </LinearGradient>
          </TouchableOpacity>
          <Text style={styles.switchHint}>בלחיצה תעבור לממשק המיועד לשימוש פרטי</Text>
        </Animated.View>

        {/* Logout */}
        <Animated.View entering={FadeInDown.delay(500).duration(400)}>
          <TouchableOpacity style={styles.logoutButton}>
            <MaterialIcons name="logout" size={24} color={colors.error} />
            <Text style={styles.logoutText}>התנתקות מהחשבון</Text>
          </TouchableOpacity>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: `${colors.background}CC`,
  },
  headerButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
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
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${colors.surfaceContainer}99`,
    borderRadius: 16,
    padding: 24,
    marginBottom: 40,
    overflow: 'hidden',
  },
  profileGlow: {
    position: 'absolute',
    top: -64,
    right: -64,
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: colors.primary,
    opacity: 0.1,
  },
  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.surfaceContainerHighest,
    borderWidth: 2,
    borderColor: `${colors.primary}33`,
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  profileInfo: {
    flex: 1,
    marginRight: 16,
  },
  profileName: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: 4,
  },
  profileDesc: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
  },
  statusBadge: {
    backgroundColor: `${colors.primary}1A`,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: `${colors.primary}33`,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
  },
  section: {
    marginBottom: 32,
  },
  sectionLabel: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
    letterSpacing: 2,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  menuGroup: {
    gap: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 16,
    padding: 16,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surfaceContainerHighest,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContent: {
    flex: 1,
    marginRight: 16,
    alignItems: 'flex-end',
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.onSurface,
  },
  menuSubtitle: {
    fontSize: 10,
    color: colors.onSurfaceVariant,
  },
  switchSection: {
    marginBottom: 24,
    gap: 16,
  },
  switchButton: {
    height: 64,
    borderRadius: 9999,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    shadowColor: colors.primaryContainer,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
  },
  switchButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.white,
  },
  switchHint: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    borderRadius: 16,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.error,
  },
});
