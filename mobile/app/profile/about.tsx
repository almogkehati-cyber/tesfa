import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { colors } from '../../theme/colors';

const links = [
  { icon: 'language', title: 'אתר רשמי', url: 'https://tesfa.app' },
  { icon: 'article', title: 'תנאי שימוש', url: 'https://tesfa.app/terms' },
  { icon: 'privacy-tip', title: 'מדיניות פרטיות', url: 'https://tesfa.app/privacy' },
  { icon: 'code', title: 'קוד פתוח', url: 'https://github.com/tesfa' },
];

const team = [
  { name: 'הצוות המייסד', role: 'פיתוח וחזון' },
  { name: 'קהילת TESFA', role: 'תמיכה ומשוב' },
];

export default function AboutScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.spacer} />
        <Text style={styles.headerTitle}>אודות TESFA</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <MaterialIcons name="arrow-forward" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Logo & Version */}
        <Animated.View entering={FadeInDown.delay(100).duration(400)} style={styles.logoSection}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>TESFA</Text>
          </View>
          <Text style={styles.tagline}>הכסף של הקהילה</Text>
          <View style={styles.versionBadge}>
            <Text style={styles.versionText}>גרסה 4.2.0</Text>
          </View>
        </Animated.View>

        {/* Mission */}
        <Animated.View entering={FadeInDown.delay(200).duration(400)} style={styles.missionCard}>
          <View style={styles.missionIcon}>
            <MaterialIcons name="emoji-people" size={32} color={colors.primary} />
          </View>
          <Text style={styles.missionTitle}>המשימה שלנו</Text>
          <Text style={styles.missionText}>
            TESFA מאפשרת לקהילות לבנות כלכלה משותפת, שקופה והוגנת. אנחנו מאמינים שכסף צריך לשרת את האנשים, לא להפך.
          </Text>
        </Animated.View>

        {/* Features */}
        <Animated.View entering={FadeInDown.delay(300).duration(400)} style={styles.featuresGrid}>
          <View style={styles.featureCard}>
            <MaterialIcons name="security" size={28} color={colors.primary} />
            <Text style={styles.featureTitle}>מאובטח</Text>
            <Text style={styles.featureText}>הצפנה מקצה לקצה</Text>
          </View>
          <View style={styles.featureCard}>
            <MaterialIcons name="visibility" size={28} color={colors.secondary} />
            <Text style={styles.featureTitle}>שקוף</Text>
            <Text style={styles.featureText}>כל העסקאות גלויות</Text>
          </View>
          <View style={styles.featureCard}>
            <MaterialIcons name="groups" size={28} color={colors.tertiary} />
            <Text style={styles.featureTitle}>קהילתי</Text>
            <Text style={styles.featureText}>בנוי על ידי הקהילה</Text>
          </View>
          <View style={styles.featureCard}>
            <MaterialIcons name="bolt" size={28} color={colors.primary} />
            <Text style={styles.featureTitle}>מהיר</Text>
            <Text style={styles.featureText}>עסקאות מיידיות</Text>
          </View>
        </Animated.View>

        {/* Links */}
        <Animated.View entering={FadeInDown.delay(400).duration(400)} style={styles.linksSection}>
          <Text style={styles.sectionLabel}>קישורים</Text>
          <View style={styles.linksContainer}>
            {links.map((link, index) => (
              <TouchableOpacity 
                key={index}
                style={styles.linkItem}
                onPress={() => Linking.openURL(link.url)}
              >
                <MaterialIcons name={link.icon as any} size={20} color={colors.primary} />
                <Text style={styles.linkText}>{link.title}</Text>
                <MaterialIcons name="open-in-new" size={16} color={colors.onSurfaceVariant} />
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        {/* Team */}
        <Animated.View entering={FadeInDown.delay(500).duration(400)} style={styles.teamSection}>
          <Text style={styles.sectionLabel}>הצוות</Text>
          <View style={styles.teamContainer}>
            {team.map((member, index) => (
              <View key={index} style={styles.teamMember}>
                <View style={styles.memberAvatar}>
                  <MaterialIcons name="person" size={24} color={colors.primary} />
                </View>
                <View style={styles.memberInfo}>
                  <Text style={styles.memberName}>{member.name}</Text>
                  <Text style={styles.memberRole}>{member.role}</Text>
                </View>
              </View>
            ))}
          </View>
        </Animated.View>

        {/* Footer */}
        <Animated.View entering={FadeInDown.delay(600).duration(400)} style={styles.footer}>
          <Text style={styles.footerText}>נבנה באהבה 💜</Text>
          <Text style={styles.copyright}>© 2024 TESFA. כל הזכויות שמורות.</Text>
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
  logoSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    width: 96,
    height: 96,
    borderRadius: 24,
    backgroundColor: colors.primaryContainer,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoText: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.onPrimaryContainer,
    letterSpacing: -1,
  },
  tagline: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.onSurface,
    marginBottom: 12,
  },
  versionBadge: {
    backgroundColor: colors.surfaceContainerHigh,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 9999,
  },
  versionText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.onSurfaceVariant,
  },
  missionCard: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 32,
  },
  missionIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: `${colors.primaryContainer}33`,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  missionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: 12,
  },
  missionText: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: 22,
  },
  featuresGrid: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 32,
  },
  featureCard: {
    width: '48%',
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.onSurface,
    marginTop: 12,
    marginBottom: 4,
  },
  featureText: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 16,
  },
  linksSection: {
    marginBottom: 32,
  },
  linksContainer: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 16,
    overflow: 'hidden',
  },
  linkItem: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    padding: 16,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: `${colors.outlineVariant}33`,
  },
  linkText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: colors.onSurface,
    textAlign: 'right',
  },
  teamSection: {
    marginBottom: 32,
  },
  teamContainer: {
    gap: 12,
  },
  teamMember: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 16,
    padding: 16,
    gap: 16,
  },
  memberAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: `${colors.primaryContainer}33`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  memberInfo: {
    flex: 1,
    alignItems: 'flex-end',
  },
  memberName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.onSurface,
  },
  memberRole: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  footerText: {
    fontSize: 16,
    color: colors.onSurface,
    marginBottom: 8,
  },
  copyright: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
  },
});
