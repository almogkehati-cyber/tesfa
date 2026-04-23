import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { colors } from '../../theme/colors';

export default function NotificationsScreen() {
  const router = useRouter();
  const [notifications, setNotifications] = useState({
    incomingPayments: true,
    ubiGrants: true,
    communityUpdates: false,
  });

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton}>
          <MaterialIcons name="settings" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>התראות</Text>
        <TouchableOpacity style={styles.headerButton} onPress={() => router.back()}>
          <MaterialIcons name="arrow-forward" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Intro Section */}
        <Animated.View entering={FadeInDown.delay(100).duration(400)} style={styles.introSection}>
          <Text style={styles.introTitle}>ניהול העדפות</Text>
          <Text style={styles.introText}>
            הגדר כיצד תרצה לקבל עדכונים על הפעילות הפיננסית והקהילתית שלך בתוך ה-Vault.
          </Text>
        </Animated.View>

        {/* Financial Section */}
        <Animated.View entering={FadeInDown.delay(200).duration(400)} style={styles.section}>
          <Text style={styles.sectionLabel}>פיננסי</Text>
          <View style={styles.toggleGroup}>
            <View style={styles.toggleItem}>
              <View style={styles.toggleContent}>
                <Text style={styles.toggleTitle}>תשלומים נכנסים</Text>
                <Text style={styles.toggleSubtitle}>קבל התראה מיידית על כל העברה שנכנסת לחשבון</Text>
              </View>
              <Switch
                value={notifications.incomingPayments}
                onValueChange={() => toggleNotification('incomingPayments')}
                trackColor={{ false: colors.surfaceVariant, true: colors.primaryContainer }}
                thumbColor={colors.white}
              />
            </View>
            <View style={styles.toggleItem}>
              <View style={styles.toggleContent}>
                <Text style={styles.toggleTitle}>מענקי UBI</Text>
                <Text style={styles.toggleSubtitle}>עדכונים על חלוקת המענקים הקהילתיים התקופתיים</Text>
              </View>
              <Switch
                value={notifications.ubiGrants}
                onValueChange={() => toggleNotification('ubiGrants')}
                trackColor={{ false: colors.surfaceVariant, true: colors.primaryContainer }}
                thumbColor={colors.white}
              />
            </View>
          </View>
        </Animated.View>

        {/* Community Section */}
        <Animated.View entering={FadeInDown.delay(300).duration(400)} style={styles.section}>
          <Text style={styles.sectionLabel}>קהילה</Text>
          <View style={styles.toggleGroup}>
            <View style={styles.toggleItem}>
              <View style={styles.toggleContent}>
                <Text style={styles.toggleTitle}>עדכוני קהילה</Text>
                <Text style={styles.toggleSubtitle}>חדשות, אירועים והצבעות חשובות בקהילה שלך</Text>
              </View>
              <Switch
                value={notifications.communityUpdates}
                onValueChange={() => toggleNotification('communityUpdates')}
                trackColor={{ false: colors.surfaceVariant, true: colors.primaryContainer }}
                thumbColor={colors.white}
              />
            </View>
          </View>
        </Animated.View>

        {/* Info Card */}
        <Animated.View entering={FadeInDown.delay(400).duration(400)} style={styles.infoCard}>
          <View style={styles.infoIcon}>
            <MaterialIcons name="notifications-active" size={32} color={colors.primary} />
          </View>
          <Text style={styles.infoTitle}>שקט נפשי מובנה</Text>
          <Text style={styles.infoText}>
            מערכת ההתראות שלנו מוצפנת מקצה לקצה. רק אתה יכול לראות את פרטי הפעילות הפיננסית שלך.
          </Text>
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
    height: 64,
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
  introSection: {
    marginBottom: 40,
    gap: 8,
  },
  introTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.onSurface,
  },
  introText: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
    lineHeight: 22,
    maxWidth: 280,
  },
  section: {
    marginBottom: 40,
    gap: 16,
  },
  sectionLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 2,
    paddingHorizontal: 8,
  },
  toggleGroup: {
    gap: 12,
  },
  toggleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 16,
    padding: 20,
  },
  toggleContent: {
    flex: 1,
    marginRight: 16,
    gap: 4,
  },
  toggleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.onSurface,
  },
  toggleSubtitle: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
    opacity: 0.7,
  },
  infoCard: {
    backgroundColor: colors.surfaceContainerHighest,
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: `${colors.outlineVariant}1A`,
  },
  infoIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primaryContainer,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: 22,
  },
});
