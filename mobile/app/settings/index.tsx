import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { colors } from '../../theme/colors';

const settingsGroups = [
  {
    label: 'חשבון ואבטחה',
    items: [
      { icon: 'lock', title: 'אבטחה', subtitle: 'אימות דו-שלבי וסיסמאות', route: '/settings/security', color: colors.primaryContainer },
      { icon: 'language', title: 'שפה', subtitle: 'עברית (ישראל)', route: '/settings/language', color: colors.secondaryContainer },
    ],
  },
  {
    label: 'העדפות מערכת',
    items: [
      { icon: 'notifications', title: 'התראות', subtitle: 'דחיפה, אימייל ועדכוני מערכת', route: '/settings/notifications', color: colors.tertiaryContainer },
    ],
  },
  {
    label: 'אודות ומשפטי',
    items: [
      { icon: 'info', title: 'אודות TESFA', subtitle: 'גרסה, צוות ומידע נוסף', externalUrl: 'https://tesfa.app/about', color: colors.primaryContainer },
      { icon: 'gavel', title: 'תנאים ופרטיות', subtitle: 'מדיניות פרטיות ותנאי שימוש', externalUrl: 'https://tesfa.app/terms', color: colors.outlineVariant },
    ],
  },
];

export default function SettingsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.spacer} />
        <Text style={styles.headerTitle}>הגדרות</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <MaterialIcons name="arrow-forward" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Section */}
        <Animated.View entering={FadeInDown.delay(100).duration(400)} style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <View style={styles.profileGlow} />
            <Image
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAq_2lBBJb3mEjfUxGOJALV-VITwYho49RyKj6b4CLv71wRiKXUfIIipEqGet2ixjpNuVs9Olhxrghh2AtoZjJZmaZM5VTw5OGelUX05yA6qtiOih0UWQzSPjCg5Bo7oaIhoRFaR0qg8lX3Q84ZTFdZwHxjF0hqr-VxcILhKJXAHArUFOTIDRH7RUQeGvQeiXR5GqqTAq_gM8bZcQ_KccJOswNnzKop2kD4DqLQZDvtVfVTMls48Pm_zbrhCrmm_nCh0-YApYGsdf4' }}
              style={styles.profileImage}
            />
            <View style={styles.editBadge}>
              <MaterialIcons name="edit" size={12} color={colors.onPrimary} />
            </View>
          </View>
          <Text style={styles.profileName}>אלכס כהן</Text>
          <Text style={styles.profileEmail}>alex.cohen@vault.com</Text>
        </Animated.View>

        {/* Settings Groups */}
        {settingsGroups.map((group, groupIndex) => (
          <Animated.View 
            key={group.label}
            entering={FadeInDown.delay(200 + groupIndex * 100).duration(400)}
            style={styles.settingsGroup}
          >
            <Text style={styles.groupLabel}>{group.label}</Text>
            <View style={styles.groupItems}>
              {group.items.map((item: any) => (
                <TouchableOpacity 
                  key={item.title}
                  style={styles.settingsItem}
                  onPress={() => {
                    if (item.externalUrl) {
                      Linking.openURL(item.externalUrl);
                    } else if (item.route) {
                      router.push(item.route as any);
                    }
                  }}
                  activeOpacity={0.7}
                >
                  <MaterialIcons name="chevron-left" size={24} color={`${colors.onSurfaceVariant}66`} />
                  <View style={styles.itemContent}>
                    <Text style={styles.itemTitle}>{item.title}</Text>
                    <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
                  </View>
                  <View style={[styles.itemIcon, { backgroundColor: `${item.color}1A` }]}>
                    <MaterialIcons name={item.icon as any} size={24} color={colors.primary} />
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </Animated.View>
        ))}

        {/* Logout */}
        <Animated.View entering={FadeInDown.delay(400).duration(400)}>
          <TouchableOpacity style={styles.logoutButton} activeOpacity={0.8}>
            <MaterialIcons name="logout" size={20} color={colors.error} />
            <Text style={styles.logoutText}>התנתקות מהחשבון</Text>
          </TouchableOpacity>
        </Animated.View>

        <Text style={styles.version}>VERSION 4.2.0 (GOLDEN VAULT)</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surfaceContainerLowest,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    height: 64,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.onSurface,
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
    paddingBottom: 120,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profileGlow: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: colors.primary,
    opacity: 0.2,
    borderRadius: 48,
    transform: [{ scale: 1.2 }],
  },
  profileImage: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 2,
    borderColor: `${colors.primary}33`,
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.surface,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
    opacity: 0.7,
  },
  settingsGroup: {
    marginBottom: 32,
  },
  groupLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 16,
    paddingHorizontal: 8,
    opacity: 0.8,
  },
  groupItems: {
    backgroundColor: colors.surfaceContainer,
    borderRadius: 16,
    overflow: 'hidden',
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  itemIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContent: {
    flex: 1,
    marginRight: 16,
    alignItems: 'flex-end',
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.onSurface,
  },
  itemSubtitle: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
    opacity: 0.6,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: `${colors.errorContainer}1A`,
    borderWidth: 1,
    borderColor: `${colors.error}1A`,
    borderRadius: 16,
    paddingVertical: 16,
    marginTop: 16,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.error,
  },
  version: {
    fontSize: 10,
    color: `${colors.onSurfaceVariant}4D`,
    textAlign: 'center',
    marginTop: 32,
    letterSpacing: 2,
  },
});
