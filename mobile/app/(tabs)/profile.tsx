import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { colors } from '../../theme/colors';

export default function ProfileScreen() {
  const router = useRouter();

  const menuItems = [
    { icon: 'person', label: 'פרטים אישיים', route: '/profile/details' },
    { icon: 'security', label: 'אבטחה', route: '/profile/security' },
    { icon: 'notifications', label: 'התראות', route: '/profile/notifications' },
    { icon: 'language', label: 'שפה', route: '/profile/language' },
    { icon: 'help', label: 'עזרה ותמיכה', route: '/profile/help' },
    { icon: 'info', label: 'אודות', route: '/profile/about' },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <Animated.View 
          entering={FadeInDown.delay(100).duration(600)}
          style={styles.profileHeader}
        >
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMJPui-vD20hRSqBe2qS6BPgmnB9Dmsfc1YklgliIRu6zWqlvh9ROKXbNPMug51aEr8yriL7Mu8om-IjSJv7xM-5EjrOp1OGdZ153k3NmHbGG-qEl1NxxQnQl-awU7KGpOL2kBzBT0LKMpgBqNjqskbnZkKaEhmRSu4gcuGgxfWpn9jgWCXV_L2__gCbeZnqfhGZabaVlb_gRa-Jff7lZMp2jQL_REcmj_atqJmmjpsD-7-zUs5aPnHHjNvH0xfvWaQvQ2UeJjCIo' }}
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.editButton}>
              <MaterialIcons name="edit" size={16} color={colors.onPrimary} />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>ישראל ישראלי</Text>
          <Text style={styles.userEmail}>israel@tesfa.io</Text>
        </Animated.View>

        {/* Stats */}
        <Animated.View 
          entering={FadeInDown.delay(200).duration(600)}
          style={styles.statsContainer}
        >
          <View style={styles.statItem}>
            <Text style={styles.statValue}>2,450</Text>
            <Text style={styles.statLabel}>יתרה TSF</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>45</Text>
            <Text style={styles.statLabel}>עסקאות</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>ימי UBI</Text>
          </View>
        </Animated.View>

        {/* Menu Items */}
        <Animated.View 
          entering={FadeInDown.delay(300).duration(600)}
          style={styles.menuContainer}
        >
          {menuItems.map((item, index) => (
            <TouchableOpacity 
              key={index}
              style={styles.menuItem}
              activeOpacity={0.7}
            >
              <MaterialIcons name="chevron-left" size={24} color={colors.onSurfaceVariant} />
              <View style={styles.menuContent}>
                <Text style={styles.menuLabel}>{item.label}</Text>
              </View>
              <View style={styles.menuIcon}>
                <MaterialIcons name={item.icon as any} size={20} color={colors.primary} />
              </View>
            </TouchableOpacity>
          ))}
        </Animated.View>

        {/* Logout */}
        <Animated.View entering={FadeInDown.delay(400).duration(600)}>
          <TouchableOpacity 
            style={styles.logoutButton}
            onPress={() => router.replace('/(auth)/welcome')}
          >
            <Text style={styles.logoutText}>התנתק</Text>
            <MaterialIcons name="logout" size={20} color={colors.error} />
          </TouchableOpacity>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 120,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 3,
    borderColor: colors.primaryContainer,
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primaryContainer,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 16,
    padding: 24,
    marginBottom: 32,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
  },
  statDivider: {
    width: 1,
    backgroundColor: colors.outlineVariant,
    marginHorizontal: 16,
  },
  menuContainer: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: `${colors.outlineVariant}33`,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: `${colors.primaryContainer}33`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContent: {
    flex: 1,
    marginRight: 16,
  },
  menuLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.onSurface,
    textAlign: 'right',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 16,
    borderRadius: 16,
    backgroundColor: `${colors.errorContainer}33`,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.error,
  },
});
