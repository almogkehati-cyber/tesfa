import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { colors } from '../../theme/colors';

const helpItems = [
  {
    icon: 'menu-book',
    title: 'מדריך למשתמש',
    subtitle: 'כל מה שצריך לדעת על TESFA',
    action: 'guide',
  },
  {
    icon: 'live-help',
    title: 'שאלות נפוצות',
    subtitle: 'תשובות לשאלות הכי נפוצות',
    action: 'faq',
  },
  {
    icon: 'chat',
    title: 'צור קשר',
    subtitle: 'שלח לנו הודעה',
    action: 'contact',
  },
  {
    icon: 'bug-report',
    title: 'דווח על בעיה',
    subtitle: 'נתקלת בבאג? ספר לנו',
    action: 'bug',
  },
  {
    icon: 'lightbulb',
    title: 'הצע רעיון',
    subtitle: 'יש לך הצעה לשיפור?',
    action: 'idea',
  },
];

const socialLinks = [
  { icon: 'telegram', label: 'Telegram', url: 'https://t.me/tesfaapp' },
  { icon: 'language', label: 'אתר', url: 'https://tesfa.app' },
];

export default function HelpScreen() {
  const router = useRouter();

  const handleAction = (action: string) => {
    switch (action) {
      case 'guide':
        Linking.openURL('https://tesfa.app/guide');
        break;
      case 'faq':
        Linking.openURL('https://tesfa.app/faq');
        break;
      case 'contact':
        Linking.openURL('mailto:support@tesfa.app');
        break;
      case 'bug':
        Linking.openURL('mailto:bugs@tesfa.app?subject=Bug Report');
        break;
      case 'idea':
        Linking.openURL('mailto:ideas@tesfa.app?subject=Feature Suggestion');
        break;
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.spacer} />
        <Text style={styles.headerTitle}>עזרה ותמיכה</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <MaterialIcons name="arrow-forward" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero */}
        <Animated.View entering={FadeInDown.delay(100).duration(400)} style={styles.hero}>
          <View style={styles.heroIcon}>
            <MaterialIcons name="support-agent" size={48} color={colors.primary} />
          </View>
          <Text style={styles.heroTitle}>איך נוכל לעזור?</Text>
          <Text style={styles.heroSubtitle}>
            הצוות שלנו זמין לסייע לך בכל שאלה או בעיה
          </Text>
        </Animated.View>

        {/* Help Items */}
        <Animated.View entering={FadeInDown.delay(200).duration(400)} style={styles.itemsContainer}>
          {helpItems.map((item, index) => (
            <TouchableOpacity 
              key={index}
              style={styles.helpItem}
              onPress={() => handleAction(item.action)}
              activeOpacity={0.7}
            >
              <View style={styles.itemIcon}>
                <MaterialIcons name={item.icon as any} size={24} color={colors.primary} />
              </View>
              <View style={styles.itemContent}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
              </View>
              <MaterialIcons name="chevron-left" size={24} color={colors.onSurfaceVariant} />
            </TouchableOpacity>
          ))}
        </Animated.View>

        {/* Social Links */}
        <Animated.View entering={FadeInDown.delay(300).duration(400)} style={styles.socialSection}>
          <Text style={styles.socialLabel}>עקבו אחרינו</Text>
          <View style={styles.socialLinks}>
            {socialLinks.map((link, index) => (
              <TouchableOpacity 
                key={index}
                style={styles.socialButton}
                onPress={() => Linking.openURL(link.url)}
              >
                <MaterialIcons name={link.icon as any} size={24} color={colors.primary} />
                <Text style={styles.socialText}>{link.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        {/* Emergency Contact */}
        <Animated.View entering={FadeInDown.delay(400).duration(400)} style={styles.emergencyCard}>
          <MaterialIcons name="warning" size={24} color={colors.tertiary} />
          <View style={styles.emergencyContent}>
            <Text style={styles.emergencyTitle}>בעיה דחופה?</Text>
            <Text style={styles.emergencyText}>
              במקרה של בעיה אבטחה או גישה לחשבון, צור קשר מיידי
            </Text>
          </View>
          <TouchableOpacity 
            style={styles.emergencyButton}
            onPress={() => Linking.openURL('mailto:urgent@tesfa.app')}
          >
            <Text style={styles.emergencyButtonText}>צור קשר</Text>
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
  hero: {
    alignItems: 'center',
    marginBottom: 40,
  },
  heroIcon: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: `${colors.primaryContainer}33`,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
  },
  itemsContainer: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 32,
  },
  helpItem: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: `${colors.outlineVariant}33`,
  },
  itemIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: `${colors.primaryContainer}33`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContent: {
    flex: 1,
    marginEnd: 16,
    alignItems: 'flex-end',
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.onSurface,
    marginBottom: 2,
  },
  itemSubtitle: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
  },
  socialSection: {
    marginBottom: 32,
  },
  socialLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 16,
    textAlign: 'center',
  },
  socialLinks: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    gap: 16,
  },
  socialButton: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.surfaceContainerLow,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 9999,
  },
  socialText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.onSurface,
  },
  emergencyCard: {
    backgroundColor: `${colors.tertiaryContainer}33`,
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: `${colors.tertiary}33`,
  },
  emergencyContent: {
    marginTop: 16,
    marginBottom: 16,
  },
  emergencyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: 4,
  },
  emergencyText: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
  },
  emergencyButton: {
    backgroundColor: colors.tertiary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 9999,
    alignSelf: 'flex-start',
  },
  emergencyButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.onTertiary,
  },
});
